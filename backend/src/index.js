const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());

mongoose.connect(
  "mongodb+srv://jagrutikhichi:admin123@cluster0.d1zmtfj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const formDataSchema = new mongoose.Schema({
  username: String,
  email: String,
  number: Number,
});

const FormData = mongoose.model("FormData", formDataSchema);

app.use(bodyParser.json());

app.use((error, req, res, next) => {
  if (error instanceof SyntaxError && error.status === 400 && "body" in error) {
    res.status(400).json({ message: "Invalid JSON payload" });
  } else {
    next();
  }
});

app.post("/api/form-submit", async (req, res) => {
  console.log("request body " + req.body);
  try {
    const { username, email, number } = req.body;

    const formData = new FormData({ username, email, number });
    await formData.save();

    res.status(201).json({ message: "Form data saved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
