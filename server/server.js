import express from "express";
import routes from "./routes/index.js";
import { dbConn } from "./db/db.js";
import path, { dirname } from "path";
import cors from "cors";
import { fileURLToPath } from "url";
import cookieParser from 'cookie-parser';


const PORT = process.env.PORT || 3000;
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/api", routes);
app.use(express.static(path.join(__dirname, '../dist')));


app.use((req, res) => res.sendStatus(404));

app.use((error, req, res) => {
  const defaultErr = {
    log: "Encountered an unknown middleware error",
    status: 400,
    err: "An error occurred, please try again.",
  };
  const errorObj = Object.assign({}, defaultErr, error);
  return res
    .status(errorObj.status)
    .json({ status: errorObj.status, message: error.err });
});

app.listen(PORT, async () => {
  await dbConn();
  console.log("listening on port " + PORT);
});
