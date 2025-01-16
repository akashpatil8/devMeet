const validateProfileEditFields = (req) => {
  console.log(Object.keys(req.body));
  const allowedProfileEditFields = [
    "firstName",
    "lastName",
    "age",
    "gender",
    "about",
    "imageUrl",
    "skills",
  ];

  const isEditAllowed = Object.keys(req.body).every((k) =>
    allowedProfileEditFields.includes(k)
  );

  return isEditAllowed;
};
module.exports = { validateProfileEditFields };
