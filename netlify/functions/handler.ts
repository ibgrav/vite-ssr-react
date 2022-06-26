import { Handler } from "@netlify/functions";
import { entryNetlify } from "../../dist/netlify/entry.netlify";

export const handler: Handler = entryNetlify;
