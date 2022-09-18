import  express  from "express";
import { deleteUser, getAllUsers } from "../../controllers/admin/manageUsers.js";
const router = express.Router()

router.route('/users/:userID').delete(deleteUser)
router.route("/users").get(getAllUsers)

export const adminUserManagement = router