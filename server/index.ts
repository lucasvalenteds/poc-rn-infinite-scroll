import { Server } from "./src/server";

const port = 8080;

Server.listen(port).on("listening", () =>
  console.debug("Server running on port " + port)
);
