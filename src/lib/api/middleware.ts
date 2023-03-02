import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { ApiError } from "next/dist/server/api-utils";

import { apiError, type ApiErrorRequest, StatusCode } from "./errors";

export const METHODS = { delete: "DELETE", get: "GET", post: "POST" } as const;
const methods = Object.values(METHODS);
type Method = (typeof methods)[number];

export function withErrorHandling(
  handler: NextApiHandler,
  methods: readonly Method[]
) {
  return async function (request: NextApiRequest, response: NextApiResponse) {
    try {
      const allowedMethod = methods.includes(request.method as Method);
      if (allowedMethod) return handler(request, response);

      apiError({
        res: response,
        status: StatusCode.UnsupportedMediaType,
      });
    } catch (error: unknown) {
      console.error(error);
      apiError({ ...toApiErrorRequest(error), res: response });
    }
  };
}

function toApiErrorRequest(error: unknown): Omit<ApiErrorRequest, "res"> {
  if (error instanceof ApiError) {
    return {
      errors: error.message ? [{ detail: error.message }] : undefined,
      status: error.statusCode,
    };
  }

  return { status: StatusCode.InternalServerError };
}
