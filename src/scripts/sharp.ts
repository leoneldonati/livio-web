import sharp from "sharp";

export async function optimize(assets: File[]) {
  const promises = assets.map(async (asset) => {
    const buffer = Buffer.from(await asset.arrayBuffer());
    return sharp(buffer).toFormat("avif").toBuffer();
  });

  const resolvedPromises = await Promise.all(promises)

  return resolvedPromises
}
