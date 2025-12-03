# Deployment Plan for Vercel with Managed Real-time Service (Pusher/Ably)

This plan outlines the steps to deploy your Next.js application to Vercel, leveraging a managed real-time service (Pusher or Ably) for WebSocket functionality.

## Phase 1: Application Preparation (Completed)

1.  **Architectural Decision:** The application has been migrated from a self-hosted Socket.IO server to use a managed real-time service (Pusher/Ably).
2.  **Managed Service Chosen:** Pusher has been chosen for implementation.
3.  **SDKs Installed:** `pusher` and `pusher-js` SDKs have been installed.
4.  **Server-Side Refactoring:**
    *   The old `src/pages/api/socket/io.ts` file has been removed.
    *   A new API route `src/pages/api/pusher/trigger.ts` has been created to publish events using the Pusher SDK.
5.  **Client-Side Refactoring:**
    *   `src/components/SocketProvider.tsx` has been modified to use the Pusher client SDK.
6.  **Environment Variables:** Placeholder environment variables (`PUSHER_APP_ID`, `NEXT_PUBLIC_PUSHER_APP_KEY`, `PUSHER_SECRET`, `NEXT_PUBLIC_PUSHER_CLUSTER`) are configured for Pusher. These need to be populated with actual values from your Pusher dashboard.
7.  **`next.config.mjs` Update:** The `output: 'standalone'` configuration has been removed from `next.config.mjs`, as it is not required for Vercel deployments using a managed real-time service.

## Phase 2: Configure Environment Variables (Manual Step)

*   **Action:** Obtain API keys and secrets from your Pusher dashboard.
*   **Details:**
    *   Create a new application on Pusher.
    *   Note down your `App ID`, `Key`, `Secret`, and `Cluster`.
    *   **For Local Development:** Add these variables to a `.env.local` file in the root of your project:
        ```
        PUSHER_APP_ID=YOUR_PUSHER_APP_ID
        NEXT_PUBLIC_PUSHER_APP_KEY=YOUR_PUSHER_APP_KEY
        PUSHER_SECRET=YOUR_PUSHER_SECRET
        NEXT_PUBLIC_PUSHER_CLUSTER=YOUR_PUSHER_CLUSTER
        ```
    *   **For Vercel Deployment:** Add these as environment variables in your Vercel project settings (Dashboard -> Project -> Settings -> Environment Variables). Ensure `PUSHER_SECRET` is marked as sensitive.

## Phase 3: Deploy to Vercel

*   **Platform:** Vercel
*   **Steps:**
    1.  **Connect Git Repository:** Log in to your Vercel account and import your Git repository (GitHub, GitLab, Bitbucket) that contains your Next.js project.
    2.  **Project Settings:**
        *   Vercel will automatically detect that it's a Next.js project.
        *   **Build & Output Settings:** Vercel's default settings for Next.js are usually sufficient.
        *   **Environment Variables:** Ensure you have added the Pusher environment variables (`PUSHER_APP_ID`, `NEXT_PUBLIC_PUSHER_APP_KEY`, `PUSHER_SECRET`, `NEXT_PUBLIC_PUSHER_CLUSTER`) in your Vercel project settings, as outlined in Phase 2.
    3.  **Deploy:** Trigger your first deployment. Vercel will build and deploy your Next.js application, including the API routes for Pusher. Subsequent pushes to your connected Git branch will trigger new deployments.

## Phase 4: Update Documentation

*   **Action:** Ensure `README.md` and `DEPLOYMENT_PLAN.md` accurately reflect this new deployment strategy.
*   **Details:** (This `DEPLOYMENT_PLAN.md` file serves this purpose. The `README.md` should also be updated to remove the Cloudflare/Railway discussion and mention the Vercel/Pusher approach.)

By following this plan, your application will be fully deployed on Vercel, with Pusher handling all real-time communication.