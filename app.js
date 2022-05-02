const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT;
const { sequelize } = require("./models");

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("DB Connected Success");
  })
  .catch((err) => {
    console.error(err);
  });

const requestMiddleware = (req, res, next) => {
  console.log(
    "Request URL:",
    req.originalUrl,
    " - ",
    new Date(+new Date() + 3240 * 10000)
      .toISOString()
      .replace("T", " ")
      .replace(/\..*/, "")
  );
  next();
};

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(requestMiddleware);
app.use(express.static('assets'));

const productRouter = require("./routes/product")
const settingRouter = require("./routes/setting")
app.use("/product", [productRouter]);
app.use("/setting", [settingRouter])
app.listen(port, () => {
  console.log("server running on port", port);
});
