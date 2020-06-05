const validateUserCredentials = (req, res, next) => {
  const user = req.body;
  const results = areDefined(user);

  if (!results) {
    if (haveCorrectType(user)) {
      next();
    } else {
      res
        .status(400)
        .json({ message: "double check you request body prop types" });
    }
  } else {
    res.status(400).json({
      message: `👉🏼 [ ${results.join(" | ")} ] 👈🏼 missing in the request body.`,
    });
  }
};

const areDefined = user => {
  let undefinedProps = [];

  Object.keys(user).forEach(prop => {
    if (user[prop] === undefined) undefinedProps.push(prop);
  });

  return undefinedProps.length ? undefinedProps : false;
};

const haveCorrectType = ({ username, password, department }) => {
  return Boolean(
    typeof username === "string" &&
      typeof password === "string" &&
      typeof department === "string"
  );
};

module.exports = validateUserCredentials;
