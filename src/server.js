import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 5004;

// lay duong dan hien tai cua module
const __filename = fileURLToPath(import.meta.url);
// lay duong dan thu muc cha cua file module
const __dirname = dirname(__filename);

app.use(express.json());
// middlle ware, xu li cac file tinh trong thu muc public de render tuong ung
app.use(express.static(path.join(__dirname, "../public")));

app.get("/", (req, res) => {
  res.sendFile("index.html");
  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log("Server starting on port " + PORT);
});
