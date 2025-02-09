import express from "express";

const app = express();
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("OK!");
  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log("Server starting on port " + PORT);
});
