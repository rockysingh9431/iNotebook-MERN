require("dotenv").config();

const ConnectToMongoDB = require("./db");
const express = require("express");
const cors = require("cors");
ConnectToMongoDB(); // Call the connectToMongo function
const path = require("path");
const app = express();
const cookieParser = require("cookie-parser");
const port = process.env.PORT;

//Available routes
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

const _dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(_dirname, "/frontend/build")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(_dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("Hello World! API is Running");
  });
}
app.listen(port, () => {
  console.log(`iNotebook App listening on port ${port}`);
});
