import { localDev, none, vercelOidc } from "eve/channels/auth"
import { eveChannel } from "eve/channels/eve"

/*
 * Route auth for the agent's HTTP channel. The site's agent is public:
 * anyone on ronnybadilla.com can talk to it, so `none()` admits anonymous
 * browser traffic explicitly. localDev() opens `eve dev`; vercelOidc()
 * lets the eve TUI and Vercel-to-Vercel callers reach the deployment.
 * Rate limiting belongs at the edge (Vercel Firewall), not here.
 */
export default eveChannel({
  auth: [localDev(), vercelOidc(), none()],
})
