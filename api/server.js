const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");
const uploadTestRoutes = require("./routes/uploadTest.routes");
const conversationRoutes = require("./routes/conversation.routes");
require("dotenv").config({ path: "./config/.env" });
require("./config/db");
const { checkUser, requireAuth } = require("./middleware/auth.middleware");
const cors = require("cors");
// const multer = require("multer");
// const upload = multer({ dest: "./uploads/test/" });

const app = express();

// CORS
const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
  allowedHeaders: ["sessionId", "Content-Type"],
  exposedHeaders: ["sessionId"],
  methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
  preflightContinue: false,
};
app.use(cors(corsOptions));
// app.use(cors());
// traiter les req
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

//jwt
app.get("*", checkUser);
app.get("/api/jwtid", requireAuth, (req, res) => {
  res.status(200).send(res.locals.user._id);
});

// routes
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/conversation", conversationRoutes);
app.use("api/uploadTest", uploadTestRoutes);

// server ( à la toute fin)
app.listen(8800, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
