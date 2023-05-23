import multer, { diskStorage } from "multer";
import { join } from "path";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const storage = diskStorage({
  destination: function (req, res, cb) {
    cb(null, join(__dirname, "./src/uploads"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const filename = file.originalname.split(".")[0];
    cb(null, filename + "-" + uniqueSuffix + ".png");
  },
});

export const upload = multer({ storage: storage });
