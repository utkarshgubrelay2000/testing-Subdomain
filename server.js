var express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config/config.env" });
const bodyParser = require("body-parser");
var {eventRouter,
  authAdmin,
  brandRouter,
  categoryRouter,
  contactRouter,
  couponRouter,
  courseRouter,
  groupRouter,
  orderRouter,
  sectionRouter,sectionAdminRouter,
  studentCategoryRouter,
  studentCourseRouter,
  studentRouter,
  userAuthRouter,
  userRouter,
} = require("./index");

let mongoServer = require("./model/clientConnection");
var busboy = require("connect-busboy");
app.use(busboy());
mongoServer
  .mongoConnect()
  .then((client) => {
    console.log("conneected to server");
  })
  .catch((err) => {
    console.log("error while connecting to server", err);
  });
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

// All Admin routes
app.use("/auth", authAdmin);
app.use("/admin", userRouter);
app.use("/admin/course", courseRouter);
app.use("/admin/coupon", couponRouter);
app.use("/admin/student", studentRouter);
app.use("/admin/group", groupRouter);
app.use("/admin/event", eventRouter);
app.use("/admin/category", categoryRouter);

// All student routes
app.use("/user/auth/", userAuthRouter);
app.use("/user/section/", sectionRouter);
app.use("/user/category/", studentCategoryRouter);
app.use("/user/course/", studentCourseRouter);
app.use("/section", sectionAdminRouter);
app.use("/brand", brandRouter);
app.use("/contact", contactRouter);
app.use("/user", orderRouter);

app.listen(process.env.PORT, () => {
  console.log("running on PORT ", process.env.PORT);
});

module.exports = app;
