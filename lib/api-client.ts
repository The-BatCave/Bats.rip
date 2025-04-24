/**
 * Client-side API functions that work with static exports
 * These functions use the browser's fetch API to make requests to external services
 */

// Base URL for API calls - automatically detects environment
const getBaseUrl = () => {
  // Use the custom domain in production
  if (typeof window !== "undefined") {
    return window.location.origin
  }
  return "https://bats.rip"
}

/**
 * Save text to Supabase storage via a serverless function
 */
export async function saveTextToStorage(userId: string, text: string, fileName: string, bucket: string) {
  try {
    // For GitHub Pages static export, we'll use a serverless function
    // You can deploy this to Vercel, Netlify, or other serverless platforms
    const SERVERLESS_API_URL = process.env.NEXT_PUBLIC_SERVERLESS_API_URL || "https://batman-api.vercel.app/api"

    const response = await fetch(`${SERVERLESS_API_URL}/save-text`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        text,
        fileName,
        bucket,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || "Failed to save text")
    }

    return await response.json()
  } catch (error: any) {
    console.error("Error saving text:", error)
    throw error
  }
}

/**
 * Upload file to Supabase storage via a serverless function
 */
export async function uploadFileToStorage(file: File, bucket: string, userId: string, fileName: string) {
  try {
    // For GitHub Pages static export, we'll use a serverless function
    const SERVERLESS_API_URL = process.env.NEXT_PUBLIC_SERVERLESS_API_URL || "https://batman-api.vercel.app/api"

    const formData = new FormData()
    formData.append("file", file)
    formData.append("bucket", bucket)
    formData.append("userId", userId)
    formData.append("fileName", fileName)

    const response = await fetch(`${SERVERLESS_API_URL}/upload`, {
      method: "POST",
      body: formData,
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.details || "Upload failed")
    }

    return await response.json()
  } catch (error: any) {
    console.error("Error uploading file:", error)
    throw error
  }
}

/**
 * Fetch user files from Supabase storage via a serverless function
 */
export async function fetchUserFiles(userId: string) {
  try {
    // For GitHub Pages static export, we'll use a serverless function
    const SERVERLESS_API_URL = process.env.NEXT_PUBLIC_SERVERLESS_API_URL || "https://batman-api.vercel.app/api"

    const response = await fetch(`${SERVERLESS_API_URL}/user-files`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }),
    })

    if (!response.ok) {
      throw new Error(`Error fetching files: ${response.statusText}`)
    }

    return await response.json()
  } catch (error: any) {
    console.error("Error fetching user files:", error)
    throw error
  }
}
