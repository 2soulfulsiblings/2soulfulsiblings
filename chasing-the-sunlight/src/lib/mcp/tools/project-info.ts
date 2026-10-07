import { defineTool, type ToolContext } from "@lovable.dev/mcp-js";

export default defineTool({
  name: "project_info",
  title: "About this project",
  description:
    "Returns a short description of the Chasing the Sunlight project: a tribute to Steven Reed and a 50-state road trip capturing sunsets, chronicled by Maine Coon sisters Stevie Bridget & Jewels.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: (_input, ctx: ToolContext) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    }
    const info = {
      name: "Chasing the Sunlight",
      tribute: "Steven Reed (9.19.66 – 5.15.25)",
      philosophy: "Never forget to look up.",
      description:
        "A tribute road-trip project photographing sunsets in all 50 U.S. states, narrated by Maine Coon sisters Stevie Bridget and Jewels.",
    };
    return {
      content: [{ type: "text", text: JSON.stringify(info) }],
      structuredContent: info,
    };
  },
});
