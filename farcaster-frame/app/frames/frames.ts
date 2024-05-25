import { farcasterHubContext } from "frames.js/middleware"
import { createFrames } from "frames.js/next"
import { DEFAULT_DEBUGGER_HUB_URL } from "../debug"

export type State = {
  secret: string
  longevity: number
  bounty: number
  url?: string
}

export const frames = createFrames<State>({
  basePath: "/frames",
  initialState: { secret: "", longevity: 0, bounty: 0 },
  middleware: [
    farcasterHubContext({
      hubHttpUrl: DEFAULT_DEBUGGER_HUB_URL,
    }),
  ],
})
