import { serve } from "https://deno.land/std@0.192.0/http/mod.ts";

serve((request) => {
  const line =
    Number.parseInt(new URL(request.url).searchParams.get("line")!) || 5;
  const body = new ReadableStream<string>({
    start(controller) {
      for (let i = 0; i < line; i++) {
        const poop = i * 2 + 1;
        const space = (line - Math.ceil(poop / 2)) * 2;

        controller.enqueue(" ".repeat(space) + "💩".repeat(poop) + "\n");
      }

      controller.close()
    },
  });

  return new Response(body.pipeThrough(new TextEncoderStream()), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
});
