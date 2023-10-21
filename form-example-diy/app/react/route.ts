import { NextRequest } from "next/server";
import { fromId } from "../../action-utils.js";

export const GET = handle;
export const POST = handle;

async function handle(request: NextRequest) {
  const matchedHandler = await matchHandlers(request);

  if (!matchedHandler) return;

  if ("redirect" in matchedHandler) {
    const url = request.nextUrl.clone();
    url.search = "";
    url.pathname = matchedHandler.redirect;
    return Response.redirect(url);
  } else {
    return Response.json(matchedHandler);
  }
}

async function matchHandlers(request: NextRequest) {
  const info = fromId(request.nextUrl.searchParams.get("id")!);

  try {
    // @TODO fix security
    const data = await import(`@/app/${info.file}`);

    if (!data) {
      return false;
    }

    const method = data[info.method];
    if (!method) {
      return false;
    }
    if (request.method === "POST" && method.length === 1) {
      return method(await request.formData());
    }

    return method();
  } catch (e) {
    console.warn("Error rying to load", info, e);
  }
}
