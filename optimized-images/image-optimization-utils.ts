import axios from 'axios';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const config = {
  compressionQuality: 60, // 0-100, higher is better quality but larger file size
};

export async function processImageUrl(
  imageUrl: string,
  cacheDir: string
): Promise<{ localPath: string; isFromCache: boolean }> {
  const fileName = generateFileName(imageUrl);
  const localPath = path.join(cacheDir, fileName);

  // Check if the image is already cached
  if (fs.existsSync(localPath)) {
    return { localPath, isFromCache: true };
  }

  try {
    const imageBuffer = await downloadImage(imageUrl);
    const optimizedBuffer = await optimizeImage(imageBuffer);
    await fs.promises.writeFile(localPath, optimizedBuffer);
    return { localPath, isFromCache: false };
  } catch (error: any) {
    console.error(`Error processing image ${imageUrl}:`, {
      message: error.message,
    });
    throw error;
  }
}

async function downloadImage(imageUrl: string): Promise<Buffer> {
  const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
  return Buffer.from(response.data, 'binary');
}

async function optimizeImage(buffer: Buffer): Promise<Buffer> {
  return sharp(buffer).webp({ quality: config.compressionQuality }).toBuffer();
}

function generateFileName(imageUrl: string): string {
  const hash = crypto.createHash('md5').update(imageUrl).digest('hex');
  return `${hash}.webp`;
}
