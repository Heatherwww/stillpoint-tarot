import { redirect } from "next/navigation";
import { headers } from "next/headers";

export default async function RootRedirect() {
  const h = await headers();
  const accept = h.get("accept-language") ?? "";
  const prefersZh = /\b(zh|zh-CN|zh-TW|zh-HK)\b/i.test(accept);
  redirect(prefersZh ? "/zh" : "/en");
}
