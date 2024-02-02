const secretkey = "poiuytrewq";
const jwt = require("jsonwebtoken");
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  // console.log("Auth Header:", authHeader);

  const token = authHeader && authHeader.split(" ")[1];
  //  console.log("Token:", token);

  if (!token) {
    return res.status(401).send("Token Required");
  }
  jwt.verify(token, secretkey, (err, user) => {
    if (err) return res.status(403).send("Invalid or expired token");
    req.user = user;
    //res.send(user);
    next();
  });
};

module.exports = authenticateToken;
