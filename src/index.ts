import { DataSource } from "typeorm";

import express from "express";
import cors from "cors";
import multer from "multer";
import * as path from "path";
import { Image } from "./Entity/Image";

const app = express();
const PORT = 5000;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  },
});
const upload = multer({ storage: storage });

const main = async () => {
  const connection = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "1234",
    database: "food_app",
    synchronize: true,
    entities: [Image],
  });

  connection
    .initialize()
    .then(() => {
      console.log(`DATABASE CONNECTED`);
      app.use(express.json());
      app.use(cors());

      app.post("/", upload.array("image", 5), async (req, res) => {
        const files: any = req.files;

        for (let i = 0; i < files!.length; i++) {
          if (files) {
            Image.createQueryBuilder()
              .insert()
              .into(Image)
              .values({ image: files && files[i]?.filename })
              .returning("*")
              .execute()
              .then();
          }
        }

        res.send({ data: "upload" });
      });

      app.listen(PORT, () => {
        console.log(`SERVER STARTED ON ${PORT}`);
      });
    })
    .catch((err) => {
      console.error(`DATABASE DOES NOT CONNECTED `, err);
    });
};

main();
