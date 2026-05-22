import fs from "fs";
import path from "path";

const htmlPath = process.argv[2] ?? "c:/Users/Basma/Downloads/medicalbay.html";
const html = fs.readFileSync(htmlPath, "utf8");
const outDir = path.join(process.cwd(), "src/assets");
const publicDir = path.join(process.cwd(), "public/brand-books");

fs.mkdirSync(publicDir, { recursive: true });
fs.copyFileSync(htmlPath, path.join(publicDir, "medical-bay-brand-guidelines.html"));

const re = /src="(data:image\/[^"]+)"/g;
let m;
let i = 0;
while ((m = re.exec(html)) !== null) {
  const data = m[1];
  const match = data.match(/^data:image\/(\w+);base64,(.+)$/);
  if (!match) continue;
  const ext = match[1] === "jpeg" ? "jpg" : match[1];
  const buf = Buffer.from(match[2], "base64");
  if (buf.length < 5000) continue;
  i += 1;
  const name = `medical-bay-brand-logo-${i}.${ext}`;
  fs.writeFileSync(path.join(outDir, name), buf);
  console.log(name, buf.length);
}

console.log("brand book -> public/brand-books/medical-bay-brand-guidelines.html");
