const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require("./model/user.schema");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(
  "mongodb+srv://Kamalnath2003:Kamalnath2003@cluster0.d3btq94.mongodb.net/?retryWrites=true&w=majority"
);

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  UserModel.findOne({ email: email }).then((user) => {
    if (user) {
      if (user.password === password) {
        res.json(user);
      } else {
        res.json("password worong ");
      }
    } else {
      res.json("no record found");
    }
  });
});
app.get("/getuser/:id", (req, res) => {
  const id = req.params.id;
  UserModel.findById({ _id: id })
    .then((user) => res.json(user))
    .catch((e) => console.log(e));
});
app.get("/getusers", (req, res) => {
  UserModel.find()
    .then((users) => res.json(users))
    .catch((e) => console.log(e));
});

app.post("/register", (req, res) => {
  UserModel.create(req.body)
    .then((users) => res.json(users))
    .catch((err) => console.log(err));
});
app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  UserModel.findByIdAndDelete({ _id: id })
    .then((users) => res.json(users))
    .catch((err) => console.log(err));
});

app.put("/update/:id", (req, res) => {
  const id = req.params.id;
  UserModel.findByIdAndUpdate(
    { _id: id },
    {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      gender: req.body.gender,
      age: req.body.age,
      dob: req.body.dob,
      mobile: req.body.mobile,
    }
  )
    .then((users) => res.json(users))
    .catch((err) => console.log(err));
});

app.listen(3000, (req, res) => {
  console.log("mongo works");
});
