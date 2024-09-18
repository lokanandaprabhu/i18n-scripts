const fs = require('fs');
const path = require('path');

// Define file paths
const enLocaleFile = path.join(
  __dirname,
  'plugin__pipelines-console-plugin.json',
);
const esLocaleFile = path.join(__dirname, 'console-locale.json');
const outputEsFile = path.join(
  __dirname,
  'plugin__pipelines-console-plugin-locale-keys.json',
);
const outputEsNotThereFile = path.join(
  __dirname,
  'plugin__pipelines-console-plugin-keys-not-there.json',
);

// Read the en locale file of console plugin repo
const enLocale = JSON.parse(fs.readFileSync(enLocaleFile, 'utf8'));

// Read the other locale file from console repo
const esLocale = JSON.parse(fs.readFileSync(esLocaleFile, 'utf8'));

let esExisting = {};
let esNotThere = {};

// Compare keys and separate them
Object.keys(enLocale).forEach((key) => {
  if (esLocale.hasOwnProperty(key)) {
    esExisting[key] = esLocale[key]; // Key exists in the console locale file
  } else {
    esNotThere[key] = enLocale[key]; // Key doesn't exist in the console locale file
  }
});

// Write to the output files
fs.writeFileSync(outputEsFile, JSON.stringify(esExisting, null, 2), 'utf8');
fs.writeFileSync(
  outputEsNotThereFile,
  JSON.stringify(esNotThere, null, 2),
  'utf8',
);

console.log('Comparison done, files written successfully.');
