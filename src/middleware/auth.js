const adminAuth = (req, res, next) => {
  console.log("Admin auth is getting checked!");
  const token = "abc";
  const isAuthorized = token === "abc";
  if (!isAuthorized) {
    res.status(401).send("Unauthorized access!");
  } else {
    next();
  }
};

const userAuth = (req, res, next) => {
  console.log("User auth is getting checked!");
  const token = "abcaw";
  const isAuthorized = token === "abc";
  if (!isAuthorized) {
    res.status(401).send("Unauthorized access!");
  } else {
    next();
  }
};

module.exports = { adminAuth, userAuth };
