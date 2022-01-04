/* eslint-disable */

const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const port = process.env.PORT || 8080;

const usersDatabase = [
  { email: "admin@email.it", password: "admin" },
  { email: "user1@email.it", password: "user1" },
  { email: "user2@email.it", password: "user2" },
  { email: "user3@email.it", password: "user3" },
  { email: "user4@email.it", password: "user4" }
];
// app.use(express.static(path.join(__dirname, 'build')));

// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// for parsing multipart/form-data
//app.use(multer());

app.use(bodyParser.json());

// this function returns a promise because it's a simulation of a 'mongoose' query
const queryLogin = user => {
  return new Promise((resolve, reject) => {
    if (
      usersDatabase.find(
        u => u.email === user.email && u.password === user.password
      )
    ) {
      let response = {
        success: true,
        email: user.email,
        token: "thisisatoken",
        errorMessage: null
      };
      resolve(response);
    } else {
      //let err = new Error("Wrong username/password");
      let response = {
        success: false,
        email: user.email,
        token: null,
        errorMessage: "Wrong username/password"
      };
      reject(response);
    }
  });
};

app.post("/api/login", (req, res) => {
  //random number in range 1000 - 3000
  let timer = Math.random() * 2000 + 1000;
  queryLogin(req.body)
    .then(outcome => {
      setTimeout(() => res.json(outcome), timer);
    })
    .catch(error => {
      setTimeout(() => res.json(error), timer); // res.status(401).json(error)
    });
});

// this function returns a promise because it's a simulation of a 'mongoose' query
const queryLogout = user => {
  return new Promise((resolve, reject) => {
    if (
      usersDatabase.find(u => u.email === user.email) &&
      user.token === "thisisatoken"
    ) {
      let response = {
        success: true,
        errorMessage: null
      };
      resolve(response);
    } else {
      //let err = new Error("Wrong username/password");
      let response = {
        success: false,
        errorMessage: "Wrong username/token"
      };
      reject(response);
    }
  });
};

app.post("/api/logout", (req, res) => {
  //random number in range 1000 - 3000
  let timer = Math.random() * 2000 + 1000;

  queryLogout(req.body)
    .then(outcome => {
      setTimeout(() => res.json(outcome), timer);
    })
    .catch(error => {
      setTimeout(() => res.json(error), timer); // res.status(401).json(error)
    });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
