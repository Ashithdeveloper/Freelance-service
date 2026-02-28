import { cloudinary } from "../config/cloudinary";

export const deleteFromCloudinary = async (public_id: string) => {
  return await cloudinary.uploader.destroy(public_id);
};
