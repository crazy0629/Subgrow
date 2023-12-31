// @ts-nocheck
import { resolver } from "@blitzjs/rpc"
import db from "../../../db"
import { z } from "zod"

if (process.env.parentModel) {
  const Create__ModelName__ = z.object({
    name: z.string(),
    __parentModelId__: z.number(),
  })
} else {
  const Create__ModelName__ = z.object({
    name: z.string(),
  })
}

export default resolver.pipe(
  resolver.zod(Create__ModelName__),
  resolver.authorize(),
  async (input, ctx) => {


    input["userId"] = ctx.session.userId

    const __modelName__ = await db.__modelName__.create({ data: input })

    return __modelName__
  }
)
