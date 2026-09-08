import { Router } from "express";
import { protectRouter } from "../middleware/protect.js";
import profileController from "../Controller/ProfileController.js";
import { upload,uploadCover } from "../middleware/multer.js";

const router = Router();


router.post('/create-profile', protectRouter, profileController.createProfile);



router.post('/update-profile/:id', protectRouter, profileController.updateProfile);

router.get('/get-profiles', protectRouter, profileController.getProfiles);
router.get('/get-profile/:id', protectRouter, profileController.getProfilebyId);
router.post("/create-uploaded-pic", upload.single("profile_picture"), profileController.createProfilePic);
router.get("/unique-profile", protectRouter, profileController.uninqueProfile);
router.post("/create-updated-cover-pic", uploadCover.single("cover_picture"), profileController.createCoverPic);
router.put("/update-profile", protectRouter, profileController.updateProfileInfo);






export default router