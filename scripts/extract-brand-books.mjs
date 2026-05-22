import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const ASSETS = path.join(ROOT, "src/assets");
const PUBLIC = path.join(ROOT, "public/brand-books");

const BOOKS = [
  {
    slug: "dmc-morocco",
    html: "c:/Users/Basma/Downloads/dmc-brand-book.html",
    outName: "dmc-brand-book.html",
    assetPrefix: "dmc-brand",
    minBytes: 8000,
  },
  {
    slug: "bopassage",
    html: "c:/Users/Basma/Downloads/bopassage-brand-book.html",
    outName: "bopassage-brand-book.html",
    assetPrefix: "bopassage-brand",
    minBytes: 8000,
  },
  {
    slug: "educazen-kids",
    html: "c:/Users/Basma/Downloads/educazenkids-brand-book.html",
    outName: "educazenkids-brand-book.html",
    assetPrefix: "educazenkids-brand",
    minBytes: 3000,
    copyRelative: ["EDUCAZEN-1.png", "EDUCAZEN-2.png"],
  },
  {
    slug: "lunja-village",
    html: "c:/Users/Basma/Downloads/lunja-brand-book (1).html",
    outName: "lunja-brand-book.html",
    assetPrefix: "lunja-brand",
    minBytes: 8000,
  },
];

fs.mkdirSync(PUBLIC, { recursive: true });
fs.mkdirSync(ASSETS, { recursive: true });

for (const book of BOOKS) {
  const htmlPath = book.html;
  if (!fs.existsSync(htmlPath)) {
    console.warn(`skip missing: ${htmlPath}`);
    continue;
  }

  const htmlDir = path.dirname(htmlPath);
  fs.copyFileSync(htmlPath, path.join(PUBLIC, book.outName));
  console.log(`\n[${book.slug}] -> public/brand-books/${book.outName}`);

  if (book.copyRelative) {
    for (const file of book.copyRelative) {
      const src = path.join(htmlDir, file);
      if (!fs.existsSync(src)) {
        console.warn(`  missing relative asset: ${file}`);
        continue;
      }
      const dest = path.join(
        ASSETS,
        `${book.assetPrefix}-${file.toLowerCase().replace(/\.png$/i, "")}.png`,
      );
      fs.copyFileSync(src, dest);
      console.log(`  copied ${file} -> ${path.basename(dest)}`);
    }
  }

  const html = fs.readFileSync(htmlPath, "utf8");
  const re = /src="(data:image\/[^"]+)"/g;
  let m;
  let i = 0;
  while ((m = re.exec(html)) !== null) {
    const data = m[1];
    const match = data.match(/^data:image\/(\w+);base64,(.+)$/);
    if (!match) continue;
    const ext = match[1] === "jpeg" ? "jpg" : match[1];
    const buf = Buffer.from(match[2], "base64");
    if (buf.length < book.minBytes) continue;
    i += 1;
    const name = `${book.assetPrefix}-logo-${i}.${ext}`;
    fs.writeFileSync(path.join(ASSETS, name), buf);
    console.log(`  ${name} (${buf.length} bytes)`);
  }
}
