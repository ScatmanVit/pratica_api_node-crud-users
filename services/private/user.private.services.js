import User from "../../models/user.model.js"

const profileUserService = async (userId) => {
   const user = await User.findById(userId)
   return user
}

export default profileUserService 