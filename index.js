const express = require("express");
const postsRouter = require("./posts/posts-router.js")
const server = express();

const PORT = process.env.PORT ||4343;

server.use(express.json());
server.use("/api/posts", postsRouter)

server.get("/", (req, res) => {
  res.send(`<h1>webapi-ii-challenge</h1>`);
});

server.listen(PORT, () => {
    console.log(`**Server listening on port ${PORT}***`);
})