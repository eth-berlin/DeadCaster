/* eslint-disable react/jsx-key */
import { Button } from "frames.js/next"

export const images = []

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
            10 seconds
          </Button>,
          <Button
            action="post"
            target={{
              pathname: "/",
              query: {
                pageIndex: String(page + 1),
                op: "time_1_minute",
              },
            }}
          >
            1 Minute
          </Button>,
          <Button
            action="post"
            target={{
              pathname: "/",
              query: {
                pageIndex: String(page + 1),
                op: "time_1_hour",
              },
            }}
          >
            1 Hour
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
