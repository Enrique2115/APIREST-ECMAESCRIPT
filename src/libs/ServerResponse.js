export function ServerSuccess(req, res, message = "", status = 200) {
  res.status(status).json({
    status: status,
    message,
  });
}

export function ServerError(req, res, message = "Error interno", status = 500) {
  res.status(status).json({
    status: status,
    message,
  });
}
