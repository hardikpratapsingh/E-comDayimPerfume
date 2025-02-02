import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

// Get __dirname equivalent in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define storage for uploaded files
const storage = multer.diskStorage({
  // Destination folder
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "../uploads/");
    cb(null, uploadPath); // Save files in "uploads" folder
  },

  // Rename the file
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName); // Add timestamp to file name
  },
});

// File filter for validation
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); // Accept the file
  } else {
    cb(new Error("Only JPEG, PNG, and GIF files are allowed!"), false); // Reject the file
  }
};

// Configure Multer
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 1024 * 1024 * 20 }, // Max file size: 5MB
});

export default upload;
