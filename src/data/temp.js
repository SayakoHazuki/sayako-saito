const mtrlines = require("./mtr-lines.json");
// {
//     "tsuen_wan": {
//       "name": "荃灣綫",
//       "color": "ED1D24"
//     },
//     ...
// }

// the above is the schema of mtrlines
// extract: {"zh-name": string, "en-name": string, "color": string but add leading #}[]

const mtrlines2 = Object.keys(mtrlines).map((key) => {
  const line = mtrlines[key];
  return {
    "zh-name": line.name,
    "en-name": (key + "_line").replace(/_/g, " ").replace(/(\w)(\w*)/g, function(g0,g1,g2){return g1.toUpperCase() + g2.toLowerCase();}) ,
    color: `#${line.color}`,
  };
  
});


console.log(JSON.stringify(mtrlines2, null, 2));