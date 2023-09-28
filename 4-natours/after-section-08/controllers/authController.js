const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');

exports.singup = catchAsync(async (req, res, next) => {
  console.log(req);
  const newUser = await User.create(req.body);

  res.status(201).json({
    status: 'Succes',
    data: {
      user: newUser
    }
  });
});
