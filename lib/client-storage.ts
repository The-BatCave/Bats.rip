import { getSupabaseBrowser } from "./supabase"

// Type for user files
export type UserFiles = {
  [bucket: string]: {
    name: string
    publicUrl: string
    path: string
    bucket: string
  }[]
}

// Function to fetch user files directly from the client
export async function fetchUserFiles(userId: string): Promise<{
  success: boolean
  files?: UserFiles
  error?: string
}> {
  try {
    if (!userId) {
      return { success: false, error: "User ID is required" }
    }

    // Get client Supabase instance
    const supabase = getSupabaseBrowser()

    // Update the list of buckets to check to include songs
    const buckets = ["profile-picture", "backgrounds", "songs"]
    const userFiles: Record<string, any> = {}
    const timestamp = Date.now() // For cache busting

    // Get files from each bucket
    for (const bucket of buckets) {
      try {
        // List files in the user's folder
        const { data, error } = await supabase.storage.from(bucket).list(userId)

        if (error) {
          console.error(`Error listing files in ${bucket}:`, error)
          continue
        }

        // Get public URLs for each file
        const files = data.map((file) => {
          const filePath = `${userId}/${file.name}`
          const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(filePath)

          return {
            ...file,
            publicUrl: `${urlData.publicUrl}?t=${timestamp}`,
            path: filePath,
            bucket,
          }
        })

        userFiles[bucket] = files
      } catch (error: any) {
        console.error(`Error getting files from ${bucket}:`, error.message)
      }
    }

    return {
      success: true,
      files: userFiles,
    }
  } catch (error: any) {
    console.error("Error fetching user files:", error)
    return { success: false, error: error.message }
  }
}

// Function to upload files directly from the client
export async function uploadFile(
  file: File,
  bucket: string,
  userId: string,
  fileName: string,
): Promise<{
  success: boolean
  url?: string
  path?: string
  error?: string
}> {
  try {
    if (!file) {
      return { success: false, error: "No file provided" }
    }

    if (!bucket) {
      return { success: false, error: "No bucket specified" }
    }

    if (!userId) {
      return { success: false, error: "No user ID specified" }
    }

    // Get client Supabase instance
    const supabase = getSupabaseBrowser()

    // Delete existing files in the user's folder before uploading new one
    try {
      console.log(`Checking for existing files in ${bucket}/${userId}`)
      const { data: existingFiles, error: listError } = await supabase.storage.from(bucket).list(userId)

      if (listError) {
        console.error(`Error listing files in ${bucket}/${userId}:`, listError)
      } else if (existingFiles && existingFiles.length > 0) {
        console.log(`Found ${existingFiles.length} existing files to delete`)

        // For backgrounds and songs, delete all files
        // For profile pictures, only delete files that start with the same prefix (e.g., "pic.")
        const filesToDelete = existingFiles
          .filter((file) => {
            if (bucket === "backgrounds" || bucket === "songs") {
              return true // Delete all background and song files
            } else if (bucket === "profile-picture" && fileName.startsWith("pic.")) {
              return file.name.startsWith("pic.") // Only delete profile pictures
            }
            return false
          })
          .map((file) => `${userId}/${file.name}`)

        if (filesToDelete.length > 0) {
          console.log(`Deleting ${filesToDelete.length} files:`, filesToDelete)
          const { error: deleteError } = await supabase.storage.from(bucket).remove(filesToDelete)

          if (deleteError) {
            console.error(`Error deleting files from ${bucket}:`, deleteError)
          } else {
            console.log(`Successfully deleted ${filesToDelete.length} files from ${bucket}`)
          }
        }
      }
    } catch (error) {
      console.error(`Error handling existing files in ${bucket}:`, error)
      // Continue with upload even if deletion fails
    }

    // Create path for the file
    const filePath = `${userId}/${fileName}`
    console.log(`Uploading to path: ${filePath} in bucket: ${bucket}`)

    // Upload the file
    const { data, error } = await supabase.storage.from(bucket).upload(filePath, file, {
      upsert: true,
      cacheControl: "0",
    })

    if (error) {
      console.error("Upload error:", error)
      return { success: false, error: error.message }
    }

    // Get public URL
    const {
      data: { publicUrl },
    } = supabase.storage.from(bucket).getPublicUrl(filePath)

    console.log("Upload successful, public URL:", publicUrl)

    // Add timestamp for cache busting
    const cacheBustedUrl = `${publicUrl}?t=${Date.now()}`

    return {
      success: true,
      url: cacheBustedUrl,
      path: data?.path || filePath,
    }
  } catch (error: any) {
    console.error("Upload error:", error)
    return { success: false, error: error.message }
  }
}
