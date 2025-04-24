import { NextResponse } from "next/server"

export async function GET() {
  // Check if essential environment variables are set
  const envStatus = {
    supabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    supabaseAnonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    supabaseServiceKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
    postgresUrl: !!process.env.POSTGRES_URL,
  }

  // Don't expose actual values, just whether they're set or not
  return NextResponse.json({
    status: "ok",
    environment: process.env.NODE_ENV,
    variables: envStatus,
    timestamp: new Date().toISOString(),
  })
}
