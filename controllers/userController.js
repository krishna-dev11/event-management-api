const User = require('../models/User');

// Create a new user
exports.createUser = async (req, res) => {
  try {
    const { name, email } = req.body;

    // name aur email dono hone chahiye
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    // email already exist toh error
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    const user = new User({ name, email });
    await user.save();

    return res.status(201).json(user);
  } catch (err) {
    return res.status(500).json({ error: 'Server error: ' + err.message });
  }
};
