import { start } from "smoldot";

const worker = new Worker(new URL("./worker.ts", import.meta.url), {
  type: "module",
});

const { port1, port2 } = new MessageChannel();
worker.postMessage(port1, [port1]);

start({
  portToWorker: port2,
});
