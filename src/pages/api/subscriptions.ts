import type { NextApiRequest, NextApiResponse } from "next";

import { parseBody } from "@/lib/api";
import { METHODS, withErrorHandling } from "@/lib/api/middleware";
import { required } from "@/lib/util";

const FORM_ID = 4897864;
const CONVERT_KIT_API_KEY = required(
  "CONVERT_KIT_API_KEY",
  process.env.CONVERT_KIT_API_KEY
);

export default withErrorHandling(
  function (req: NextApiRequest, res: NextApiResponse) {
    if (req.method === METHODS.post) return post(req, res);

    return res.status(415).send({});
  },
  [METHODS.post]
);

async function post(req: NextApiRequest, res: NextApiResponse) {
  const body = parseBody(req.body);
  const result = await fetch(
    `https://api.convertkit.com/v3/forms/${FORM_ID}/subscribe`,
    {
      body: JSON.stringify({
        api_key: CONVERT_KIT_API_KEY,
        email: body.email,
      }),
      headers: { ["Content-Type"]: "application/json; charset=utf-8" },
      method: "POST",
    }
  );
  console.log(await result.json());

  return res.status(200).send({});
}
