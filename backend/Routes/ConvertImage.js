import fs from 'fs';
import sharp from 'sharp';

const convertImage = async (filePath) => {
  try {
    // Read the image from the file system
    const imageBuffer = fs.readFileSync(filePath);

    // Specify a default format (e.g., JPEG) if the library cannot determine it
    const format = 'jpeg';

    // Convert the image buffer to the specified format
    const convertedImageBuffer = await sharp(imageBuffer).toFormat(format).toBuffer();
    return convertedImageBuffer;
  } catch (error) {
    console.error('Error converting image:', error);
    throw error; // Re-throw the error for handling in the calling function
  }
};

export default convertImage;