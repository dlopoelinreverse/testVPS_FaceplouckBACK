const mongoose = require("mongoose");

mongoose
  .connect(
    // `mongodb+srv://${process.env.MONGODB_USER_PASS}@cluster0.dwycwp2.mongodb.net/${process.env.MONGODB_DB}`
    `mongodb+srv://${process.env.MONGODB_USER_PASS}@cluster0.xrzmien.mongodb.net/${process.env.MONGODB_DB}`
    // {
    //   useNewUrlParser: true,
    //   useFindAndModify: false,
    //   useUnifiedTopology: true,
    // }
  )
  .then(() =>
    console.log("Connected to MongoDB, DB : " + process.env.MONGODB_DB)
  )
  .catch((err) => console.log("Failed to connect to MongoDB", err));
