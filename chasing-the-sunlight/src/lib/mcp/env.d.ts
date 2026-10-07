// Declarations for Deno edge-function runtime globals used by MCP tool files
// that are bundled into supabase/functions/mcp/index.ts. These files never
// execute in the browser bundle, but they live under src/ so Vite typechecks
// them.
declare const process: { env: Record<string, string | undefined> };
