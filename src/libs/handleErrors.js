import { ServerError } from "./ServerResponse.js";

export function handleError(err, req, res, next) {
  const message = err.message || "Error de servidor interno";
  const status = err.status || 500;

  ServerError(req, res, message, status);
}
