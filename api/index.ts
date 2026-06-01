import server from "../dist/server/server.js";

export default async function handler(
  req: import("http").IncomingMessage,
  res: import("http").ServerResponse,
) {
  try {
    const url = new URL(req.url || "/", `https://${req.headers.host || "localhost"}`);
    const headers = new Headers();
    for (const [key, value] of Object.entries(req.headers)) {
      if (value) headers.set(key, Array.isArray(value) ? value.join(", ") : value);
    }

    const body =
      req.method !== "GET" && req.method !== "HEAD"
        ? await new Promise<string>((resolve, reject) => {
            const chunks: Buffer[] = [];
            req.on("data", (chunk: Buffer) => chunks.push(chunk));
            req.on("end", () => resolve(Buffer.concat(chunks).toString()));
            req.on("error", reject);
          })
        : undefined;

    const request = new Request(url, { method: req.method as string, headers, body });
    const response = await server.fetch(request);

    res.statusCode = response.status;
    response.headers.forEach((value, key) => res.setHeader(key, value));
    res.end(await response.text());
  } catch (err) {
    res.statusCode = 500;
    res.end(String(err));
  }
}
