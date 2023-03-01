import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { ApiError } from "next/dist/server/api-utils";

import { apiError, ApiErrorReq, StatusCode } from "./errors";

export const METHODS = { delete: "DELETE", get: "GET", post: "POST" } as const;
const methods = Object.values(METHODS);
type Method = (typeof methods)[number];

export function withErrorHandling(
  handler: NextApiHandler,
  methods: readonly Method[]
) {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    try {
      const allowedMethod = methods.includes(req.method as Method);
      if (allowedMethod) return await handler(req, res);

      return apiError({ res, status: StatusCode.UnsupportedMediaType });
    } catch (error) {
      console.error(error);
      return apiError({ ...toApiErrorReq(error), res });
    }
  };
}

function toApiErrorReq(error: unknown): Omit<ApiErrorReq, "res"> {
  if (error instanceof ApiError) {
    return {
      errors: error.message ? [{ detail: error.message }] : undefined,
      status: error.statusCode,
    };
  }

  return { status: StatusCode.InternalServerError };
}
