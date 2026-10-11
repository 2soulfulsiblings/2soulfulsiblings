import { auth, defineMcp } from "@lovable.dev/mcp-js";
import listCatPosts from "./tools/list-cat-posts";
import getCatPost from "./tools/get-cat-post";
import projectInfo from "./tools/project-info";

// Direct Supabase issuer — never the .lovable.cloud proxy. VITE_SUPABASE_PROJECT_ID
// is inlined by Vite at build time so this stays import-safe.
const projectRef = import.meta.env.VITE_SUPABASE_PROJECT_ID ?? "project-ref-unset";

export default defineMcp({
  name: "chasing-the-sunlight-mcp",
  title: "Chasing the Sunlight",
  version: "0.1.0",
  instructions:
    "Tools for the Chasing the Sunlight project — a tribute road trip photographing sunsets in all 50 states, chronicled by Maine Coon sisters Stevie Bridget & Jewels. Use `list_cat_posts` to browse posts, `get_cat_post` to read one, and `project_info` for background on the project.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [listCatPosts, getCatPost, projectInfo],
});
