import { v2 as cld } from "cloudinary";

cld.config({
  cloud_name: import.meta.env.CLD_NAME,
  api_key: import.meta.env.CLD_KEY,
  api_secret: import.meta.env.CLD_SECRET,
});

const { upload_stream } = cld.uploader;
export async function upload(bufferMap: Buffer[]) {
  const uploadBuffer = (buffer: Buffer) => {
    return new Promise((res, rej) => {
      upload_stream({ folder: "livio-web/posts" }, (error, result) => {
        if (error) return rej(error);
        res({
          publicId: result?.public_id,
          secureUrl: result?.secure_url,
          width: result?.width,
          height: result?.height,
        });
      }).end(buffer);
    });
  };

  try {
    return await Promise.all(bufferMap.map(uploadBuffer));
  } catch (err) {
    return [];
  }
}
