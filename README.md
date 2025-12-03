# VoteIn

A real-time voting application.

## Deployment

This project is deployed on Vercel, leveraging Pusher for real-time communication.

The application utilizes Pusher as a managed real-time service for WebSocket functionality. This approach allows for a simplified deployment entirely on Vercel, as Pusher handles the complexities of persistent WebSocket connections, scaling, and reliability.

**Key Changes:**
*   The previous self-hosted Socket.IO server has been replaced with Pusher.
*   The client-side `SocketProvider.tsx` now connects to Pusher.
*   A new API route (`src/pages/api/pusher/trigger.ts`) handles server-side event publishing via Pusher.

**Benefits of this approach:**
*   **Simplified Deployment:** The entire application can be deployed on Vercel, streamlining the deployment process.
*   **Scalability & Reliability:** Pusher provides robust, managed real-time infrastructure, ensuring high availability and performance.
*   **Cost-Effective:** Pusher offers free tiers suitable for development and smaller projects.

For detailed deployment instructions, refer to the `DEPLOYMENT_PLAN.md` file.
