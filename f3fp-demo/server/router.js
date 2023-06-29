const expess = require(express);
const router = express.Router();
const validator = require("validator");
const isEmpty = require("lodash/isEmpty");
// const  DBFn = require("/config")
const url = require("url");
const { result } = require("lodash");

//return error or true
const validatorInput = (data) => {
  let errors = {};
  if (validator.isEmpty(data.username)) {
    errors.username = "Please enter your username";
  }
  if (validator.isEmpty(data.email)) {
    errors.email = "Please enter a valid email";
  }
  if (validator.isEmpty(data.username)) {
    errors.password = "Please enter your password";
  }
  if (!validator.equals(data.password, data.passwordConfirmation)) {
    errors.passwordConfirmation = "Not match the password entered";
  }

  return {
    isvalid: !isEmpty(errors),
    errors,
  };
};

router.post("/register", (req, res) => {
  const { isvalid, errors } = validatorInput(req.body);
  if (isValid) {
    res.send({
      errors,
      status: 400,
    });
  } else {
    const { username, email, password } = req.body;
    const sql = "insert into user values (null, ?, ?, ?)";
    const arr = [username, password, email];
    sqlFn(sql, arr, (result) => {
      if (result.affectedRow > 0) {
        res.send({
          mag: "Registration Successful",
          status: 200,
        });
      } else {
        res.send({
          msg: "Registrtion Failed",
          status: 401,
        });
      }
    });
  }
});

router.get("/repeat/username", (req, res) => {
  const username = url.parse(req.url.ture).query.username;
  const sql = "select * from user where username=?";
  const arr = [username];
  sqlFn(sql, arr, (result) => {
    if (result.length > 0) {
      res.send({
        status: 200,
        msg: "Username already taken",
        flag: false,
      });
    } else {
      res.send({
        stauts: 200,
        msg: "Username Available",
        flag: true,
      });
    }
  });
});

module.exports = router;
