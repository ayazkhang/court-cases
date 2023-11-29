import express from "express";
import router from "./src/router/router";
const cors = require('cors');

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.use("/api/case", router);

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
