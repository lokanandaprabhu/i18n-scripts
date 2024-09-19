const fs = require('fs');
const path = require('path');

// Define file paths
const enLocaleFile = path.join(
  __dirname,
  'plugin__pipelines-console-plugin.json',
);
const esLocaleFile = path.join(__dirname, 'console-locale.json');
const esSharedFile = path.join(__dirname, 'console-locale-shared.json');
const esAppFile = path.join(__dirname, 'console-locale-app.json');
const esDevConsoleFile = path.join(__dirname, 'console-locale-devconsole.json');
const esPublicFile = path.join(__dirname, 'console-locale-public.json');
const outputEsFile = path.join(
  __dirname,
  'plugin__pipelines-console-plugin-locale-keys.json',
);
const outputEsNotThereFile = path.join(
  __dirname,
  'plugin__pipelines-console-plugin-keys-not-there.json',
);

// Read the en locale file of the console plugin repo
const enLocale = JSON.parse(fs.readFileSync(enLocaleFile, 'utf8'));

// Read the other locale files
const esLocale = JSON.parse(fs.readFileSync(esLocaleFile, 'utf8'));
const esShared = JSON.parse(fs.readFileSync(esSharedFile, 'utf8'));
const esApp = JSON.parse(fs.readFileSync(esAppFile, 'utf8'));
const esDevConsole = JSON.parse(fs.readFileSync(esDevConsoleFile, 'utf8'));
const esPublic = JSON.parse(fs.readFileSync(esPublicFile, 'utf8'));

let esExisting = {};
let esNotThere = {};

// Compare keys and separate them
Object.keys(enLocale).forEach((key) => {
  // Check if the key exists in any of the locale files
  if (
    esLocale.hasOwnProperty(key) ||
    esShared.hasOwnProperty(key) ||
    esApp.hasOwnProperty(key) ||
    esDevConsole.hasOwnProperty(key) ||
    esPublic.hasOwnProperty(key)
  ) {
    // Key exists in one of the locale files
    esExisting[key] =
      esLocale[key] ||
      esShared[key] ||
      esApp[key] ||
      esDevConsole[key] ||
      esPublic[key];
  } else {
    // Key doesn't exist in any of the locale files
    esNotThere[key] = enLocale[key];
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
