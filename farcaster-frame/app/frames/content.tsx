/* eslint-disable react/jsx-key */
import { Button } from "frames.js/next"

export const images = [
  "https://i.imgur.com/6Q8A9Tc.png",
  "https://i.imgur.com/sY4OTeE.png",
  "https://i.imgur.com/xwNd28z.png",
  "https://i.imgur.com/l5TffK4.png",
]

export default function getFramesContent(page: number, summary?: object): any {
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
                pageIndex: String(page + 1),
              },
            }}
          >
            Encrypt Secret
          </Button>,
          <Button
            action="post"
            target={{
              query: {
                pageIndex: String(page + 1),
              },
            }}
          >
            I gave my secret already
          </Button>,
          ,
          <Button
            action="post"
            target={{
              query: {
                pageIndex: String(page + 1),
              },
            }}
          >
            Earn bounty check on Deadcasters
          </Button>,
          <Button action="tx" target="/txdata" post_url="/frames">
            Buy a unit
          </Button>,
        ],
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
                op: "cast",
              },
            }}
          >
            Cast your encrypted secret!
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
