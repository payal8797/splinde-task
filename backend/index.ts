import express from "express";
import cors from "cors";
import dataRoutes from "./routes/dataRoutes";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Splinde task backend is running...");
});

app.use("/api", dataRoutes);

const PORT = 3001;
app.listen(PORT, () =>
  console.log(`Backend running on http://localhost:${PORT}`)
);
