import type { NextApiResponse } from "next";
import { ApiError } from "next/dist/server/api-utils";

export enum StatusCode {
  BadRequest = 400,
  NotFound = 404,
  UnsupportedMediaType = 415,
  InternalServerError = 500,
}

export const ERRORS = {
  badRequest: (message: string) => new ApiError(StatusCode.BadRequest, message),
  notFound: new ApiError(StatusCode.NotFound, ""),
};

export type ApiErrorRequest = Readonly<{
  errors?: ReadonlyArray<Readonly<{ detail: string }>>;
  res: NextApiResponse;
  status: StatusCode;
}>;

export function apiError({ errors, res, status }: ApiErrorRequest) {
  res.status(status).json({ code: StatusCode[status], errors, status });
}
