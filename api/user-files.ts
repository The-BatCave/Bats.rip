import { createClient } from "@supabase/supabase-js"

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  try {
    const { userId } = req.body

    // Validate inputs
    if (!userId) {
      return res.status(400).json({ error: "User ID is required" })
    }

    // Get admin Supabase client
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)

    // Update the list of buckets to check to include songs
    const buckets = ["profile-picture", "backgrounds", "songs", "descriptions"]
    const userFiles = {}
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
      } catch (error) {
        console.error(`Error getting files from ${bucket}:`, error.message)
      }
    }

    // Extract bio file
    if (userFiles["descriptions"] && userFiles["descriptions"].length > 0) {
      // Find the bio file
      const bioFile = userFiles["descriptions"].find((file) => file.name === "bio.txt")

      if (bioFile) {
        // Add the bio file to the response
        userFiles["bio"] = [bioFile]
      }
    }

    return res.status(200).json({
      success: true,
      files: userFiles,
    })
  } catch (error) {
    console.error("Server error:", error)
    return res.status(500).json({ error: error.message })
  }
}
