import { NextRequest } from "next/server";
import { fromId } from "../../action-utils.js";

export const GET = handle;
export const POST = handle;

async function handle(request: NextRequest) {
  const matchedHandler = await matchHandlers(request);
}

async function matchHandlers(request: NextRequest) {}
