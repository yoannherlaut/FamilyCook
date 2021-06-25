const UserModel = require('../Models/User');

module.exports = async (req, res) => {
  try {
    const { name, firstName, email, password } = req.body;

    var newUser = new UserModel({
      name: name,
      firstName: firstName,
      email: email,
      password: password,
    });

    const findUser = await UserModel.findOne({ email: email });

    if (findUser) {
      res.json({ result: true, data: newUser, allReadyExist: true });
    } else {
      const data = await newUser.save();
      res.json({ result: true, data, allReadyExist: false });
    }
  } catch (err) {
    res.json({ result: false, err });
  }
};
