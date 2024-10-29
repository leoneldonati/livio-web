type StatusResponse = 400 | 401 | 404 | 500 | null;
export const res = (payload: object | string, status: StatusResponse = null) =>
  new Response(JSON.stringify(payload), {
    status: status ?? 200,
    headers: { "Content-Type": "application/json" },
  });
