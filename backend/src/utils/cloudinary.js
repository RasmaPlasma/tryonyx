import { v2 as cloudinary } from "cloudinary";

let isConfigured = false;

function ensureCloudinaryConfigured() {
  if (!isConfigured) {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      secure: true
    });
    
    console.log('Cloudinary Config (lazy loaded):', {
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY ? '***SET***' : 'MISSING',
      api_secret: process.env.CLOUDINARY_API_SECRET ? '***SET***' : 'MISSING'
    });
    
    isConfigured = true;
  }
}

export async function uploadImageToCloudinary(imageBuffer, folder = "tryonyx") {
  ensureCloudinaryConfigured();
  
  try {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          resource_type: "image",
          folder: folder,
          quality: "auto",
          format: "jpg"
        },
        (error, result) => {
          if (error) {
            console.error("Cloudinary upload error:", error);
            reject(error);
          } else {
            resolve(result.secure_url);
          }
        }
      ).end(imageBuffer);
    });
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    throw new Error("Failed to upload image");
  }
}

export async function uploadMultipleImages(images, folder = "tryonyx") {
  ensureCloudinaryConfigured();
  
  try {
    const uploadPromises = images.map(image => 
      uploadImageToCloudinary(image.buffer, folder)
    );
    return await Promise.all(uploadPromises);
  } catch (error) {
    console.error("Error uploading multiple images:", error);
    throw new Error("Failed to upload images");
  }
}