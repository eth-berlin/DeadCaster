/* eslint-disable react/jsx-key */
import { frames } from "./frames"
import { appURL } from "../utils"
import getFramesContent from "./content"
import BuyMeACoffeeABI from "../../public/BuyMeACoffeeABI"
import { encodeFunctionData, parseEther } from "viem"

const frameHandler = frames(async (ctx: any) => {
  const page = Number(ctx.searchParams?.pageIndex ?? 0)
  // const op = ctx.searchParams?.op
  // const inputText = ctx.message?.inputText
  // const requesterFid = ctx.message?.requesterFid


  if (page === 0) {
    return getFramesContent(page)
  }

  if (page === 1) {
    return getFramesContent(page)
  }

  if (page === 2) {
    return getFramesContent(page)
  }

  if (page === 3) {
    return getFramesContent(page)
  }

  return getFramesContent(page)
})

export const GET = frameHandler
export const POST = frameHandler
