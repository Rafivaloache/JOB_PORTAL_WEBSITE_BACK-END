import { Router } from "express";
import authController from "../Controller/AuthController.js";
import { protectRouter, verifyAdmin } from "../middleware/protect.js";


const router = Router();


router.post("/register", authController.createUser); 

router.post("/login",  verifyAdmin, authController.loginUser);


router.get('/getUsers', protectRouter, authController.getUsers)

router.get('/getUserbyId/:id', authController.getUserId);
router.get("/profile", protectRouter, authController.profile);

router.post("/logout", protectRouter, authController.logout);

router.get("/search-profile", protectRouter, authController.searchProfile);
router.post("/set-role", protectRouter, authController.setRole);
router.put('/update-profile',protectRouter, authController.updateProfile);
router.delete('/delete-user',protectRouter, authController.deleteUser);
router.get('/all-users',protectRouter, authController.getUsersbyQuery);







export default router

