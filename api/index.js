import express from "express";
import postRoutes from "./routes/posts.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import cookieParser from "cookie-parser";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const app = express()

app.use(express.json()) 
app.use(cookieParser())

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'../client/public/upload'));
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + file.originalname); 
    },
});

const upload = multer({ storage: storage });
app.use(express.static(path.join(__dirname,'../client/public')));
app.post("/api/upload", upload.single("file"), function(req,res){
  const file = req.file;
  res.status(200).json(file.filename);
});

app.use("/api/posts", postRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)

app.listen(8800,()=>{
  console.log("Connected")
})

