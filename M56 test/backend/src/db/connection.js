const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/m56studios", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("successfull connection");
  })
  .catch((e) => {
    console.log(`error is ${e}`);
  });
