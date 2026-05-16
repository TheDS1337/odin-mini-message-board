import path from "node:path";
import express from "express";

const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';
const app = express();

const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date()
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date()
  }
];

app.set("views", path.join(import.meta.dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(import.meta.dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index", { page: "body-main", data: { messages } });
});

app.get("/new", (req, res) => {
  res.render("index", { page: "body-form", data: {} } );
});

app.post("/new", (req, res) => {
  messages.push({ text: req.body.text, user: req.body.user, added: new Date() });

  // Redirect the client back to the main page
  res.redirect("/");
});

app.get("/message", (req, res) => {
  const msgIdx = req.query.index;

  if( msgIdx < 0 || msgIdx >= messages.length ) {
    res.status(404);
    res.send("This message does not exist");
    return;
  }

  res.render("index", { page: "body-message", data: { ...messages[msgIdx] } });
});

app.listen(PORT, HOST, (error) => {
  if( error )
    throw error;
  
  console.log(`My first Express app - listening on port ${PORT}!`);
});
