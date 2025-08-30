import express from "express";
import multer from "multer";
import { runTryOn } from "../services/replicateClient.js";
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
  { name: "person", maxCount: 1 }, 
  { name: "clothing", maxCount: 1 }
]), async (req, res) => {
  try {
    const { person, clothing } = req.files;

    // Validate that both files are provided
    if (!person || !clothing) {
      return res.status(400).json({ 
        error: "Both person and clothing images are required" 
      });
    }

    // Upload images to Cloudinary
    console.log("Uploading images to Cloudinary...");
    const [personUrl, clothingUrl] = await Promise.all([
      uploadImageToCloudinary(person[0].buffer, "tryonyx/persons"),
      uploadImageToCloudinary(clothing[0].buffer, "tryonyx/clothing")
    ]);

    console.log("Images uploaded successfully:", { personUrl, clothingUrl });

    // Call Replicate API for try-on
    console.log("Processing try-on with Replicate...");
    const resultUrl = await runTryOn(personUrl, clothingUrl);

    console.log("Try-on completed:", resultUrl);

    // Send back result
    res.json({
      success: true,
      resultUrl: resultUrl,
      message: "Try-on completed successfully!"
    });

  } catch (error) {
    console.error("Error in try-on route:", error);
    res.status(500).json({ 
      error: "Failed to process try-on request",
      details: error.message 
    });
  }
});

export default router;
