const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
console.log("CLOUDINARY_CLOUD_NAME", CLOUDINARY_CLOUD_NAME);

export const uploadToCloudinary = async (file) => {
  const CLOUD_API = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;

  const formData = new FormData();

  // ✅ Correct for browser
  formData.append("file", file);

  formData.append("upload_preset", "test_rn_upload_123");

  const res = await fetch(CLOUD_API, {
    method: "POST",
    body: formData,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.error?.message || "Upload failed");
  }

  return {
    public_id: data.public_id,
    url: data.secure_url,
  }
};