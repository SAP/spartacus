import { exec } from 'child_process';
import express from 'express';
import fs from 'fs';
import path from 'path';
import { processImageUrl } from './image-optimization-utils';

const app = express();
const port = 9002;

const CACHE_DIR = path.join(__dirname, 'cache');
const UPSTREAM_BASE_URL = 'https://40.76.109.9:9002'; // Replace with actual upstream server URL

// Ensure cache directory exists
if (!fs.existsSync(CACHE_DIR)) {
  fs.mkdirSync(CACHE_DIR, { recursive: true });
}

app.get('*', async (req, res) => {
  const imageUrl = req.url;
  const newImageFullUrl = `${UPSTREAM_BASE_URL}${imageUrl}`;

  try {
    const { localPath: optimizedImagePath, isFromCache } =
      await processImageUrl(newImageFullUrl, CACHE_DIR);

    // SPIKE ADD artificial delay

    const artificialDelay = 50;
    // const artificialDelay = 0;

    await new Promise((resolve) => setTimeout(resolve, artificialDelay));

    console.log({ 'req.url': req.url, isFromCache, artificialDelay });
    res.sendFile(optimizedImagePath);
  } catch (error: any) {
    console.error({
      'req.url': req.url,
      error: {
        message: error.message,
        code: error.code,
        response: error.response,
      },
    });
    res.status(500).send('Error processing image');
  }
});

app.listen(port, () => {
  console.log(`Image optimization proxy server running on port ${port}`);
  exec('say "Image proxy started"');
});
