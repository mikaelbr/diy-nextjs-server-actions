import { toId } from "@/action-utils";

type Id = { file: string; method: string };
export function autoWrapper(id: Id, fn: any) {
  fn.valueOf = `/react?id=${toId(id)}`;
  return fn;
}
