import type { NextApiRequest, NextApiResponse } from "next";
import process from "process";

import { parseBody } from "@/lib/api/index";
import { METHODS, withErrorHandling } from "@/lib/api/middleware";
import { required } from "@/lib/util";

const FORM_ID = 4_897_864;
const CONVERT_KIT_API_KEY = required(
  "CONVERT_KIT_API_KEY",
  process.env.CONVERT_KIT_API_KEY
);

export default withErrorHandling(
  async function (request: NextApiRequest, response: NextApiResponse) {
    if (request.method === METHODS.post) return post(request, response);

    // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
    return response.status(415).send({});
  },
  [METHODS.post]
);

async function post(request: NextApiRequest, response: NextApiResponse) {
  const body = parseBody<{ email: string }>(request.body as string);
  const result = await fetch(
    `https://api.convertkit.com/v3/forms/${FORM_ID}/subscribe`,
    {
      body: JSON.stringify({
        api_key: CONVERT_KIT_API_KEY,
        email: body?.email,
      }),
      headers: { "Content-Type": "application/json; charset=utf-8" },
      method: "POST",
    }
  );
  console.log(await result.json());

  response.status(200).send({});
}
