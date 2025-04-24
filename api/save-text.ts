import { createClient } from "@supabase/supabase-js"

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  try {
    const { userId, text, fileName, bucket } = req.body

    // Validate inputs
    if (!userId || !text || !fileName || !bucket) {
      return res.status(400).json({
        success: false,
        error: "Missing required parameters: userId, text, fileName, bucket",
      })
    }

    // Get admin Supabase client
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)

    // Create the full path
    const filePath = `${userId}/${fileName}`

    // Delete existing file if it exists
    try {
      const { data: existingFiles } = await supabase.storage.from(bucket).list(userId)

      if (existingFiles) {
        const fileToDelete = existingFiles.find((file) => file.name === fileName)
        if (fileToDelete) {
          await supabase.storage.from(bucket).remove([filePath])
        }
      }
    } catch (error) {
      console.log("No existing file found, continuing...")
    }

    // Convert text to blob
    const textBlob = new Blob([text], { type: "text/plain" })
    const buffer = await textBlob.arrayBuffer()
    const fileBuffer = Buffer.from(buffer)

    // Upload file to bucket
    const { data, error } = await supabase.storage.from(bucket).upload(filePath, fileBuffer, {
      contentType: "text/plain",
      upsert: true,
    })

    if (error) {
      console.error(`Error saving text file to ${bucket}:`, error)
      return res.status(500).json({ success: false, error: error.message })
    }

    // Get public URL
    const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(filePath)

    return res.status(200).json({
      success: true,
      url: urlData.publicUrl,
      message: `Text file saved successfully to ${bucket}`,
    })
  } catch (error) {
    console.error("Server error:", error)
    return res.status(500).json({ success: false, error: error.message })
  }
}
