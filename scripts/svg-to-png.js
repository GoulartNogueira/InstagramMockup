// This script converts our SVG app icon to a PNG file
// Run with: node scripts/svg-to-png.js

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createCanvas, loadImage } from 'canvas';

// Get the directory name using ESM pattern
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create directories if they don't exist
const srcAssetsDir = path.join(__dirname, '../src/assets');
if (!fs.existsSync(srcAssetsDir)) {
  fs.mkdirSync(srcAssetsDir, { recursive: true });
}

async function convertSvgToPng() {
  try {
    // Load the SVG file content
    const svgPath = path.join(__dirname, '../src/assets/app-icon.svg');
    const svgContent = fs.readFileSync(svgPath, 'utf8');
    
    // Create a data URL from the SVG content
    const svgDataUrl = `data:image/svg+xml;base64,${Buffer.from(svgContent).toString('base64')}`;
    
    // Create a canvas with the same dimensions as your SVG
    const canvas = createCanvas(512, 512);
    const ctx = canvas.getContext('2d');
    
    // Load the SVG onto the canvas
    const img = await loadImage(svgDataUrl);
    ctx.drawImage(img, 0, 0, 512, 512);
    
    // Write the PNG to a file
    const pngPath = path.join(__dirname, '../src/assets/app-icon.png');
    const pngBuffer = canvas.toBuffer('image/png');
    fs.writeFileSync(pngPath, pngBuffer);
    
    console.log(`SVG converted to PNG: ${pngPath}`);
  } catch (error) {
    console.error('Error converting SVG to PNG:', error);
  }
}

// Run the conversion
convertSvgToPng();