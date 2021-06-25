const UserModel = require('../Models/User');

module.exports = async (req, res) => {
  try {
    const { email, password } = req.body;
    const findUser = await UserModel.findOne({ email: email, password: password });

    if (findUser) {
      res.json({ result: true, data: findUser });
    } else {
      res.json({ result: false });
    }
  } catch (err) {
    res.json({ result: false, err });
  }
};
