import { readdir, rm, writeFile } from "node:fs/promises";
import { basename, join, resolve } from "node:path";
import { pdfToPng } from "pdf-to-png-converter";
import sharp from "sharp";

const PROJECT_ROOT = resolve(import.meta.dirname, "..");
const PDF_PATH = join(PROJECT_ROOT, "cv", "James-Michael-Mejares.pdf");
const OUTPUT_DIR = join(PROJECT_ROOT, "static", "cv");
const PAGES_JSON = join(PROJECT_ROOT, "src", "lib", "cv-pages.json");

const VIEWPORT_SCALE = 2.5;
const WATERMARK_TEXT = "kaelvxdev.space";

function createWatermarkSvg(width, height) {
  const fontSize = 18;
  const positions = [
    { x: 0.15, y: 0.12, rotate: -15 },
    { x: 0.55, y: 0.08, rotate: -12 },
    { x: 0.30, y: 0.30, rotate: -18 },
    { x: 0.70, y: 0.26, rotate: -10 },
    { x: 0.10, y: 0.48, rotate: -14 },
    { x: 0.50, y: 0.44, rotate: -16 },
    { x: 0.25, y: 0.66, rotate: -11 },
    { x: 0.65, y: 0.62, rotate: -17 },
    { x: 0.15, y: 0.84, rotate: -13 },
    { x: 0.55, y: 0.80, rotate: -15 },
  ];

  const texts = positions
    .map(
      (p) =>
        `<text x="${p.x * width}" y="${p.y * height}" font-family="monospace" font-size="${fontSize}" fill="rgba(128,128,128,0.18)" transform="rotate(${p.rotate} ${p.x * width} ${p.y * height})">${WATERMARK_TEXT}</text>`
    )
    .join("\n    ");

  return Buffer.from(
    `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    ${texts}
  </svg>`
  );
}

async function clearOutputDir() {
  const files = await readdir(OUTPUT_DIR).catch(() => []);
  for (const file of files) {
    if (file.startsWith("page-")) {
      await rm(join(OUTPUT_DIR, file));
    }
  }
}

async function renderPdfToImages() {
  await clearOutputDir();

  const pngPages = await pdfToPng(PDF_PATH, {
    outputFolder: OUTPUT_DIR,
    viewportScale: VIEWPORT_SCALE,
    outputFileMaskFunc: (pageNumber) => `page-${pageNumber}.png`,
    processPagesInParallel: true,
    concurrencyLimit: 4,
    verbosityLevel: 0,
  });

  console.log(`Rendered ${pngPages.length} PNG pages`);

  const webpPaths = [];

  for (const page of pngPages) {
    const pngPath = page.path;
    const webpFilename = basename(pngPath).replace(/\.png$/, ".webp");
    const webpRelative = `/cv/${webpFilename}`;

    const metadata = await sharp(pngPath).metadata();
    const watermarkSvg = createWatermarkSvg(metadata.width, metadata.height);

    await sharp(pngPath)
      .composite([{ input: watermarkSvg, blend: "over" }])
      .webp({ quality: 80 })
      .toFile(join(OUTPUT_DIR, webpFilename));
    await rm(pngPath);

    webpPaths.push(webpRelative);
    console.log(`  ${webpRelative} (watermarked)`);
  }

  return webpPaths;
}

async function writePagesJson(pages) {
  const data = { pages };
  await writeFile(PAGES_JSON, JSON.stringify(data, null, 2) + "\n");
  console.log(`Wrote ${PAGES_JSON}`);
}

async function main() {
  console.log("Rendering CV pages...");
  const pages = await renderPdfToImages();
  await writePagesJson(pages);
  console.log("CV render complete.");
}

main().catch((err) => {
  console.error("CV render failed:", err);
  process.exit(1);
});
