import { farcasterHubContext } from "frames.js/middleware"
import { createFrames } from "frames.js/next"
import { DEFAULT_DEBUGGER_HUB_URL } from "../debug"

type State = {
  counter: number
}

export const frames = createFrames<State>({
  basePath: "/frames",
  initialState: { counter: 0 },
  middleware: [
    farcasterHubContext({
      hubHttpUrl: DEFAULT_DEBUGGER_HUB_URL,
    }),
  ],
})
