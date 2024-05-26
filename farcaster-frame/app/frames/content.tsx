/* eslint-disable react/jsx-key */
import { Button } from "frames.js/next"
import { State } from "./frames"
import { isMobile } from "react-device-detect"

export const images = [
  "https://i.imgur.com/6Q8A9Tc.png",
  "https://i.imgur.com/vFm38ez.png",
  "https://i.imgur.com/hhLuiUh.png",
  "https://i.imgur.com/xwNd28z.png",
  "https://i.imgur.com/l5TffK4.png",
  "https://i.imgur.com/SJINX7A.png",
  "https://i.imgur.com/jox2Gj2.png",
]

export default function getFramesContent(page: number, state?: State): any {
  const protocolPrefix = isMobile
    ? "https://metamask.app.link/dapp/"
    : "https://"

  switch (page) {
    case 0:
      return {
        image: images[page]!,
        imageOptions: {
          aspectRatio: "1:1",
        },
        buttons: [
          <Button
            action="post"
            target={{
              query: {
                pathname: "/",
                pageIndex: String(page + 1),
                op: "setup",
              },
            }}
          >
            Setup Deadcaster 👻
          </Button>,
          <Button
            action="link"
            target={`${protocolPrefix}deadcaster-encrypt.vercel.app`}
          >
            Cast encrypted 😎
          </Button>,
          <Button action="link" target={`${protocolPrefix}${state?.url!}`}>
            Keep me alive 🪦
          </Button>,
          <Button
            action="link"
            target={`${protocolPrefix}deadcaster-reveal.vercel.app`}
          >
            Reveal Deads 💰
          </Button>,
          // <Button
          //   action="post"
          //   target={{
          //     query: {
          //       pathname: "/",
          //       pageIndex: String(5),
          //       op: "more",
          //     },
          //   }}
          // >
          //   More
          // </Button>,
        ],
        state,
      }

    case 1: {
      return {
        image: images[page]!,
        imageOptions: {
          aspectRatio: "1:1",
        },
        textInput: "Type in your password here...",
        buttons: [
          <Button
            action="post"
            target={{
              pathname: "/",
              query: {
                pageIndex: String(page + 1),
                op: "secret",
              },
            }}
          >
            Next
          </Button>,
        ],
        state,
      }
    }

    case 2: {
      return {
        image: images[page]!,
        imageOptions: {
          aspectRatio: "1:1",
        },
        buttons: [
          <Button
            action="post"
            target={{
              pathname: "/",
              query: {
                pageIndex: String(page + 1),
                op: "time_1_min",
              },
            }}
          >
            1m (Demo)
          </Button>,
          <Button
            action="post"
            target={{
              pathname: "/",
              query: {
                pageIndex: String(page + 1),
                op: "time_weekly",
              },
            }}
          >
            Weekly
          </Button>,
        ],
        state,
      }
    }

    case 3: {
      return {
        image: images[page]!,
        imageOptions: {
          aspectRatio: "1:1",
        },
        buttons: [
          <Button
            action="post"
            target={{
              pathname: "/",
              query: {
                pageIndex: String(page + 1),
                op: "bounty_0_001_eth",
              },
            }}
          >
            0.001 ETH
          </Button>,
          <Button
            action="post"
            target={{
              pathname: "/",
              query: {
                pageIndex: String(page + 1),
                op: "bounty_0_01_eth",
              },
            }}
          >
            0.01 ETH
          </Button>,
        ],
        state,
      }
    }

    case 4: {
      return {
        image: images[page]!,
        imageOptions: {
          aspectRatio: "1:1",
        },
        buttons: [
          <Button action="link" target={`${protocolPrefix}${state?.url!}`}>
            Activate Deadcaster
          </Button>,
          <Button
            action="post"
            target={{
              query: {
                pathname: "/",
                pageIndex: String(-1),
                op: "follow",
              },
            }}
          >
            Follow the Crew
          </Button>,
        ],
        state,
      }
    }

    case 5: {
      return {
        image: images[page]!,
        imageOptions: {
          aspectRatio: "1:1",
        },
        buttons: [
          // <Button
          //   action="link"
          //   target={`${protocolPrefix}deadcaster-reveal.vercel.app`}
          // >
          //   Reveal secrets 💰
          // </Button>,
          // <Button
          //   action="link"
          //   target={`${protocolPrefix}deadcaster-encrypt.vercel.app`}
          // >
          //   Cast encrypted 😎
          // </Button>,
          // <Button
          //   action="post"
          //   target={{
          //     query: {
          //       pathname: "/",
          //       pageIndex: String(-1),
          //       op: "follow",
          //     },
          //   }}
          // >
          //   Follow the Crew
          // </Button>,
        ],
        state,
      }
    }

    case -1: {
      return {
        image: images.slice(-1)[0]!,
        imageOptions: {
          aspectRatio: "1:1",
        },
        buttons: [
          <Button action="link" target={"https://warpcast.com/dudeamir.eth"}>
            dudeamir.eth
          </Button>,
          <Button action="link" target={"https://warpcast.com/caruso33"}>
            caruso33
          </Button>,
          <Button action="link" target={"https://warpcast.com/flobrown.eth"}>
            flobrown.eth
          </Button>,
          <Button action="link" target={"https://warpcast.com/nyyls"}>
            nyyls.eth
          </Button>,
        ],
      }
    }

    default: {
      return {
        image: <div tw="flex">Oops, how did we end up here?</div>,
        imageOptions: {
          aspectRatio: "1:1",
        },
        buttons: [],
      }
    }
  }
}
