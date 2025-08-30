import express from "express";
import multer from "multer";
import { runClothingSwap } from "../services/replicateClient.js";
import { uploadImageToCloudinary } from "../utils/cloudinary.js";

const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

const router = express.Router();

router.post("/", upload.fields([
  { name: "person1", maxCount: 1 }, 
  { name: "person2", maxCount: 1 }
]), async (req, res) => {
  try {
    const { person1, person2 } = req.files;

    // Validate that both files are provided
    if (!person1 || !person2) {
      return res.status(400).json({ 
        error: "Both person images are required for clothing swap" 
      });
    }

    // Upload images to Cloudinary
    console.log("Uploading images to Cloudinary...");
    const [person1Url, person2Url] = await Promise.all([
      uploadImageToCloudinary(person1[0].buffer, "tryonyx/swap/person1"),
      uploadImageToCloudinary(person2[0].buffer, "tryonyx/swap/person2")
    ]);

    console.log("Images uploaded successfully:", { person1Url, person2Url });

    // Call Replicate API for clothing swap
    console.log("Processing clothing swap with Replicate...");
    const resultUrl = await runClothingSwap(person1Url, person2Url);

    console.log("Clothing swap completed:", resultUrl);

    // Send back result
    res.json({
      success: true,
      resultUrl: resultUrl,
      originalImages: {
        person1: person1Url,
        person2: person2Url
      },
      message: "Clothing swap completed successfully!"
    });

  } catch (error) {
    console.error("Error in clothing swap route:", error);
    res.status(500).json({ 
      error: "Failed to process clothing swap request",
      details: error.message 
    });
  }
});

export default router;