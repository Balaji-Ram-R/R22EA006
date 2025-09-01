const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const urlRoutes = require("./routes/urlRoutes");
const { Logger } = require("../loggingMiddleware/logger");

const app = express();
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  Logger.info('http', 'url-shortener', `${req.method} ${req.path}`);
  next();
});

app.use((err, req, res, next) => {
  Logger.error('http', 'url-shortener', err.message);
  next(err);
});
app.get('/', (req, res) => {
  res.send('URL Shortener Service is running');
});

mongoose.connect("mongodb+srv://Bharath:bharathkkl@cluster0.cnb6u.mongodb.net/", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));

app.use("/", urlRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
