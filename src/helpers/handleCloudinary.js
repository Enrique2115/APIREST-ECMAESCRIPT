import cloudinary from "cloudinary";
import { CLOUDINARY as data } from "../config";

cloudinary.config(data);

export const uploads = (file, folder) => {
  return new Promise((resolve) => {
    cloudinary.uploader.upload(
      file,
      (result) => {
        resolve({
          url: result.secure_url,
          id: result.public_id,
        });
      },
      {
        resource_type: "auto",
        folder: folder,
        // public_id: file.split("Z-")[1],
        transformation: [
          {
            quality: "auto",
            fetch_format: "webp",
          },
        ],
      }
    );
  });
};

export const destroy = (id) => {
  return new Promise((resolve) => {
    cloudinary.uploader.destroy(id, (result) => {
      resolve(result);
    });
  });
};
