import { scrollSepolia } from "viem/chains"
import { frames } from "../frames"
import { transaction } from "frames.js/core"
import {
  Abi,
  createPublicClient,
  encodeFunctionData,
  getContract,
  http,
  parseEther,
} from "viem"
import BuyMeACoffeeABI from "../../../public/BuyMeACoffeeABI"

export const POST = frames(async (ctx) => {
  if (!ctx?.message) {
    throw new Error("Invalid frame message")
  }

  const calldata = encodeFunctionData({
    abi: BuyMeACoffeeABI,
    functionName: "buyCoffee",
    args: [parseEther("1"), "Coffee all day!"],
  })

  const publicClient = createPublicClient({
    chain: scrollSepolia,
    transport: http(),
  })

  const oasisAddress = "0x5f588FF374D788470af75A55253FD6488Ea9c90e"
  const scrollAddress = "0x2A123CAb6eb46A22ad1FeBF5a73F7832601775ad"
  const contractAddress = scrollAddress

  const deadCasterContract = getContract({
    address: contractAddress,
    abi: BuyMeACoffeeABI,
    client: publicClient,
  })

  return transaction({
    chainId: "eip155:10", // OP Mainnet 10
    method: "eth_sendTransaction",
    params: {
      abi: BuyMeACoffeeABI as Abi,
      to: contractAddress,
      data: calldata,
      value: 0n.toString(),
    },
  })
})
