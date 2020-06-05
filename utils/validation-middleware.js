const validateCredentials = action => {
  return (req, res, next) => {
    const credentials = req.body;
    const { username, password, department } = credentials;
    const undefinedProps = areDefined(
      action === "register"
        ? { username, password, department }
        : { username, password }
    );
    const incorrectTypes = haveCorrectType(credentials);

    if (undefinedProps) {
      res.status(400).json({
        message: `👉🏼 [ ${undefinedProps.join(
          " | "
        )} ] 👈🏼 missing in the request body.`,
      });
    } else if (incorrectTypes) {
      res.status(400).json({
        message: `👉🏼 [ ${incorrectTypes.join(" | ")} ] 👈🏼 must be type string.`,
      });
    } else {
      next();
    }
  };
};

const areDefined = credentials => {
  const undefinedProps = [];

  Object.keys(credentials).forEach(prop => {
    if (credentials[prop] === undefined) undefinedProps.push(prop);
  });

  return undefinedProps.length ? undefinedProps : false;
};

const haveCorrectType = credentials => {
  const incorrectTypes = [];

  Object.keys(credentials).forEach(prop => {
    if (typeof credentials[prop] !== "string") incorrectTypes.push(prop);
  });

  return incorrectTypes.length ? incorrectTypes : false;
};

module.exports = validateCredentials;
