const validateUserCredentials = (req, res, next) => {
  const user = req.body;
  const { username, password, department } = user;
  const undefinedProps = areDefined({ username, password, department });
  const incorrectTypes = haveCorrectType(user);

  if (undefinedProps.length) {
    res.status(400).json({
      message: `👉🏼 [ ${undefinedProps.join(
        " | "
      )} ] 👈🏼 missing in the request body.`,
    });
  } else if (incorrectTypes.length) {
    res.status(400).json({
      message: `👉🏼 [ ${incorrectTypes.join(" | ")} ] 👈🏼 must be type string.`,
    });
  } else {
    next();
  }
};

const areDefined = user => {
  const undefinedProps = [];

  Object.keys(user).forEach(prop => {
    if (user[prop] === undefined) undefinedProps.push(prop);
  });

  return undefinedProps;
};

const haveCorrectType = user => {
  const incorrectTypes = [];

  Object.keys(user).forEach(prop => {
    if (typeof user[prop] !== "string") incorrectTypes.push(prop);
  });

  return incorrectTypes;
};

module.exports = validateUserCredentials;
