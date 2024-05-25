/* eslint-disable react/jsx-key */
import { Button } from "frames.js/next"
import { State } from "./frames"

export const images = [
  "https://i.imgur.com/6Q8A9Tc.png",
  "https://i.imgur.com/sY4OTeE.png",
  "https://i.imgur.com/xwNd28z.png",
  "https://i.imgur.com/l5TffK4.png",
  "https://i.imgur.com/SJINX7A.png",
  "https://i.imgur.com/jox2Gj2.png",
]

export default function getFramesContent(page: number, state?: State): any {
  switch (page) {
    case 0:
      return {
        image: images[page]!,
        imageOptions: {
          aspectRatio: "1:1",
        },
        textInput: "Type in your secret here...",
        buttons: [
          <Button
            action="post"
            target={{
              query: {
                pathname: "/",
                pageIndex: String(page + 1),
                op: "encrypt",
              },
            }}
          >
            Encrypt Secret
          </Button>,
          <Button
            action="post"
            target={{
              query: {
                pathname: "/",
                pageIndex: String(page + 1),
                op: "already",
              },
            }}
          >
            I gave my secret already
          </Button>,
          <Button
            action="post"
            target={{
              query: {
                pathname: "/",
                pageIndex: String(page + 1),
                op: "check_ bounty",
              },
            }}
          >
            Earn bounty check on Deadcasters
          </Button>,
        ],
        state,
      }

    case 1: {
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
                op: "time_10_seconds",
              },
            }}
          >
            10 seconds (Demo)
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

    case 3: {
      return {
        image: images[page]!,
        imageOptions: {
          aspectRatio: "1:1",
        },
        buttons: [
          <Button action="link" target={state?.url!}>
            Activate Deadcaster
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
          <Button
            action="post"
            target={{
              pathname: "/",
              query: {
                pageIndex: String(page + 1),
                op: "cast",
              },
            }}
          >
            Cast encrypted secret
          </Button>,
          <Button
            action="post"
            target={{
              pathname: "/",
              query: {
                pageIndex: String(page + 1),
                op: "cast",
              },
            }}
          >
            Proof `I am alive`
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
