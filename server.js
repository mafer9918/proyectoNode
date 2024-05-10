const express = require("express");
const connectDB = require("./db/db");

const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const sessionRoutes = require("./routes/sessionRoutes");
const Arena = require("bull-arena");
const Bull = require("bull");
const {queues} = require("./workers/queues.js");

const app = express();
const PORT = 3000;

//Invocar al middleware para que parsee los datos del body en formato JSON
app.use(express.json());

const arenaConfig = Arena(
  {
    Bull,
    queues,
  },
  {
    basePath: "/arena",
    disableListen: true,
  }
);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/session", sessionRoutes);
app.use("/api", arenaConfig);

connectDB();

app.listen(PORT, () => {
  console.log("Servidor corriendo en el puerto: " + PORT);
});
