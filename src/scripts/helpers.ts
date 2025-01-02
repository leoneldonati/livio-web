type StatusResponse = 400 | 401 | 404 | 500 | null;
export const res = (payload: object | string, status: StatusResponse = null) =>
  new Response(JSON.stringify(payload), {
    status: status ?? 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": import.meta.env.DOMAIN,
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, PATCH, DELETE",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
