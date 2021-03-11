const svgtofont = require("svgtofont");
const path = require("path");
svgtofont({
  src: path.resolve(process.cwd(), "src/common/font/svg"), // svg path
  dist: path.resolve(process.cwd(), "src/common/font/lib"), // output path
  fontName: "saasfont", // font name
  classNamePrefix: "icon",
  css: true, // Create CSS files.
  svgicons2svgfont: {
    fontHeight: 1000,
    normalize: true
  },
  website: {
    title: "saasfont",
    logo: path.resolve(process.cwd(), "svg", "git.svg"),
    version: "",
    meta: {
      description: "Converts SVG fonts to TTF/EOT/WOFF/WOFF2/SVG format.",
      keywords: "saasfont,TTF,EOT,WOFF,WOFF2,SVG"
    },
    description: ``
  }
}).then(() => {
  console.log("done!");
});
