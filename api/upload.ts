import { createClient } from "@supabase/supabase-js"
import formidable from "formidable"
import fs from "fs"

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  try {
    // Parse form data
    const form = new formidable.IncomingForm()
    const { fields, files } = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err)
        resolve({ fields, files })
      })
    })

    const file = files.file
    const bucket = fields.bucket[0]
    const userId = fields.userId[0]
    const fileName = fields.fileName[0] || file.name

    if (!file) {
      return res.status(400).json({ error: "No file provided" })
    }

    if (!bucket) {
      return res.status(400).json({ error: "No bucket specified" })
    }

    if (!userId) {
      return res.status(400).json({ error: "No user ID specified" })
    }

    // Get admin Supabase client
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)

    // Create path for the file
    const filePath = `${userId}/${fileName}`

    // Read file
    const fileBuffer = fs.readFileSync(file.path)

    // Upload the file
    const { data, error } = await supabase.storage.from(bucket).upload(filePath, fileBuffer, {
      upsert: true,
      contentType: file.type,
    })

    if (error) {
      console.error("Upload error:", error)
      return res.status(500).json({ error: "Upload failed", details: error.message })
    }

    // Get public URL
    const {
      data: { publicUrl },
    } = supabase.storage.from(bucket).getPublicUrl(filePath)

    // Add timestamp for cache busting
    const cacheBustedUrl = `${publicUrl}?t=${Date.now()}`

    return res.status(200).json({
      success: true,
      url: cacheBustedUrl,
      path: data?.path || filePath,
    })
  } catch (error) {
    console.error("Upload handler error:", error)
    return res.status(500).json({
      error: "Upload failed",
      details: error.message || "Unknown error",
    })
  }
}
