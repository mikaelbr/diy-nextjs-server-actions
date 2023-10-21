import { createServer } from "node:http";
import { createReadStream } from "node:fs";
import formidable from "formidable";

const server = createServer(async function (req, res) {
  console.log(new Date(), req.method, req.url);

  if (req.method == "POST") {
    const form = formidable();
    const [fields] = await form.parse(req);
    console.log(new Date(), fields);
  }

  // just serve index no matter what...
  res.writeHead(200, { "Content-Type": "text/html" });
  createReadStream("./index.html").pipe(res);
});

server.listen(3003, () => console.log("Listening on http://localhost:3003"));
