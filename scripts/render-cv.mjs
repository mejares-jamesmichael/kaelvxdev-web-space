import { readdir, rm, writeFile } from "node:fs/promises";
import { basename, join, resolve } from "node:path";
import { pdfToPng } from "pdf-to-png-converter";
import sharp from "sharp";

const PROJECT_ROOT = resolve(import.meta.dirname, "..");
const PDF_PATH = join(PROJECT_ROOT, "cv", "James-Michael-Mejares.pdf");
const OUTPUT_DIR = join(PROJECT_ROOT, "static", "cv");
const PAGES_JSON = join(PROJECT_ROOT, "src", "lib", "cv-pages.json");

const VIEWPORT_SCALE = 2.5;

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

    await sharp(pngPath).webp({ quality: 80 }).toFile(join(OUTPUT_DIR, webpFilename));
    await rm(pngPath);

    webpPaths.push(webpRelative);
    console.log(`  ${webpRelative}`);
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
