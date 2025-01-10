// Enable bun in tsconfig.json for this
// import { readdir } from "node:fs/promises";

// const dir = "../../public/covers/png";
// let files = await readdir(dir);

// console.log(files);

// for (const file of files) {
//     const proc = Bun.spawn([
//         "powershell",
//         `cwebp ${dir}/${file} -o ${dir}/../${file
//             .replace(".jpg", ".webp")
//             .replace("2024-", "")} -q 80 -resize 1000 1000`,
//     ]);

//     await proc.exited; // resolves when process exit
// }
