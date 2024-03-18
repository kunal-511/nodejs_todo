import express from "express";
import { User } from "../models/user.js";
const router = express.Router();
import {
  getAllUsers,
  register,
  getMyProfile,
  login,
  logout
} from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";


// route to check the health of the api
router.get("/health", (req, res) => {
  res.send("Working Fine");
});
router.get("/all", getAllUsers);

router.post("/new", register); // Register
router.post("/login", login); //Login
router.post("/logout", logout); //Logout

//router.get("/userid/special", special);

// always keep dynamic route at the end
router.get("/me", isAuthenticated, getMyProfile);

export default router;
