import path from "node:path";
import express from "express";

const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';
const app = express();

app.set("views", path.join(import.meta.dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(import.meta.dirname, "public")));

app.get("/", (req, res) => {
    res.send("Index page");
});

app.get("/new", (req, res) => {
    res.send("New message page");
});

app.listen(PORT, HOST, (error) => {
  if( error )
    throw error;
  
  console.log(`My first Express app - listening on port ${PORT}!`);
});
