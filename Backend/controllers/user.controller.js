import User from "../models/user.models.js";
export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    // adds all the users leaving the logged in users because we dont want to see ourselves.
    // Every user of our database but not the current authenticated user.
    // we dont wanna see the passwords when we select so we will write -password.
    const filterUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");
    res.status(200).json(filterUsers);
  } catch (error) {
    console.log("Error in user sidebar handler ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
