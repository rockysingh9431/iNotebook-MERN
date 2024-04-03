require("dotenv").config();

const ConnectToMongoDB = require("./db");
const express = require("express");
const cors = require("cors");
ConnectToMongoDB(); // Call the connectToMongo function

const app = express();
const port = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

//Available routes
app.use(express.json());
app.use(cors());
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.listen(port, () => {
  console.log(`iNotebook App listening on port ${port}`);
});
