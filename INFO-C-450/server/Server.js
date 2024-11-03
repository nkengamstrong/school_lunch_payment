const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const salt = bcrypt.genSaltSync(10);

const app = express();
// app.use(cors());
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(cookieParser());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "lunch_payment",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL");
});

// Endpoint to create parent account
app.post("/parents", (req, res) => {
  const sql =
    "INSERT INTO parents (first_name, last_name, phone, email, password) VALUES (?, ?, ?, ?, ?)";
  bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
    if (err) return res.json({ error: "Error hassing password" });
    const values = [
      req.body.firstName,
      req.body.lastName,
      req.body.phone,
      req.body.email,
      hash,
    ];
    db.query(sql, values, (err, result) => {
      if (err) {
        return res.json({ error: "Error creating account" });
      } else {
        return res.json({ message: "Parent created" });
      }
    });
  });
});

// endpoint to login  parent
app.post("/login", (req, res) => {
  const sql = "SELECT * FROM parents WHERE email = ?";
  db.query(sql, [req.body.email], (err, result) => {
    if (err) {
      return res.json({ error: "Error logging in" });
    }
    console.log(result);
    if (result.length > 0) {
      bcrypt.compare(
        req.body.password.toString(),
        result[0].password,
        (err, match) => {
          if (err)
            return res.json({
              error: "Password compare error, please try again",
            });
          if (match) {
            //generate token that expires in 5 hours
            const token = jwt.sign(
              {
                last_name: result[0].last_name,
                first_name: result[0].first_name,
                parentId: result[0].parent_id,
              },
              "secretkey",
              {
                expiresIn: "5h",
              }
            );
            //set token as Http only cookie to be used for authentication
            res.cookie("token", token, {
              httpOnly: true,
            });
            return res.json({ message: "Parent logged in" });
          } else {
            return res.json({
              error: "Password doesn't match, please try again",
            });
          }
        }
      );
    } else {
      return res.json({
        error: "Email doesnot exist please create an account",
      });
    }
  });
});

// Endpoint to check student balance
app.get("/getStudents", (req, res) => {
  const { parentId } = req.query;
  const sql = `
    SELECT 
      students.id,
      students.name,
      students.student_id,
      accounts.balance
    FROM 
      students
    JOIN 
      accounts ON students.id = accounts.student_id
    WHERE 
      students.parent_id = ?;
  `;

  db.query(sql, [parentId], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
    console.log("Result from get All student ", result);
    return res.json(result);
  });
});

// Endpoint to get all transactions related to a parent
app.get("/getTransactions", (req, res) => {
  const { parentId } = req.query;
  const sql = `SELECT 
    t.transaction_id,
    t.account_id,
    t.amount,
    t.transaction_type,
    t.transaction_date,
    t.description,
    s.first_name AS student_first_name,
    s.last_name AS student_last_name
FROM 
    Parents p
JOIN 
    Students s ON p.parent_id = s.parent_id
JOIN 
    Accounts a ON s.student_id = a.student_id
JOIN 
    Transactions t ON a.account_id = t.account_id
WHERE 
    p.parent_id = ?;`;
  db.query(sql, [parentId], (err, result) => {
    if (err) {
      return res.json({ error: "Error fetching transactions" });
    }
    console.log("Result from Transaction ", result);
    return res.json(result);
  });
});

// Endpoint to create student and account
app.post("/addStudent", (req, res) => {
  const { firstName, lastName, dob, grade, parentId } = req.body;

  const query = `
    INSERT INTO students (first_name, last_name, date_of_birth, grade_level, parent_id)
    VALUES (?, ?, ?, ?,?);
  `;
  db.query(
    query,
    [firstName, lastName, dob, grade, parentId],
    (err, results) => {
      if (err) {
        console.error("Error executing query:", err);
        res.status(500).json({ error: "Internal server error" });
        return;
      }
      res.json({ status: "success", studentId: results.student_id });
    }
  );
});

const verifyJWT = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ message: "Unauthenticated" });
  }
  jwt.verify(token, "secretkey", (err, decoded) => {
    if (err) {
      return res.json({ message: "Unauthenticated" });
    }
    console.log("server ", decoded);
    req.parentId = decoded.parentId;
    req.name = decoded.first_name + " " + decoded.last_name;
    next();
  });
};

// Logout route on nav bar
app.get("/auth", verifyJWT, (req, res) => {
  return res.json({
    message: "Authenticated",
    name: req.name,
    parentId: req.parentId,
  });
});

app.get("/logout", (req, res) => {
  res.clearCookie("token", { httpOnly: true });
  return res.json({ message: "Logged out" });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
