# Batman Secure System

A secure profile management system with GitHub Pages frontend and serverless API.

## Deployment Architecture

This project uses a split architecture:
- **Frontend**: Static site hosted on GitHub Pages with custom domain (bats.rip)
- **API**: Serverless functions hosted on Vercel

## Setup Instructions

### 1. GitHub Pages Setup

1. Add all environment variables to GitHub repository secrets
2. Push to main branch to trigger the GitHub Actions workflow
3. In repository settings, enable GitHub Pages and set the custom domain to "bats.rip"

### 2. Serverless API Setup

1. Create a Vercel account if you don't have one
2. Import the `api` directory as a new project
3. Add the following environment variables to your Vercel project:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `SUPABASE_JWT_SECRET`
4. Deploy the API
5. Update the `NEXT_PUBLIC_SERVERLESS_API_URL` in your GitHub repository secrets to point to your Vercel deployment URL

### 3. Supabase Setup

1. Make sure your Supabase project has the following storage buckets:
   - `profile-picture`
   - `backgrounds`
   - `songs`
   - `descriptions`
2. Ensure all buckets have appropriate RLS policies

## Development

For local development:

\`\`\`bash
# Install dependencies
npm install

# Run development server
npm run dev
\`\`\`

## Environment Variables

Create a `.env.local` file with the following variables:

\`\`\`
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXT_PUBLIC_SERVERLESS_API_URL=http://localhost:3000/api
