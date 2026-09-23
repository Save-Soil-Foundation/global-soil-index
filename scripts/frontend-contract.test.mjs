import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import vm from "node:vm";
import ts from "typescript";

const root = process.cwd();
const source = fs.readFileSync(path.join(root, "src/data/countries.ts"), "utf8");
const transpiled = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.CommonJS,
    target: ts.ScriptTarget.ES2020,
  },
});

const moduleContext = { exports: {} };
vm.runInNewContext(transpiled.outputText, {
  exports: moduleContext.exports,
  module: moduleContext,
  require: () => ({}),
});

const {
  countries,
  featuredCountries,
  tickerItems,
  datasetMetadata,
  getRankingBySlug,
} = moduleContext.exports;

const expectedFeatured = [
  ["Switzerland", 1, 84.7],
  ["Netherlands", 2, 82.1],
  ["Denmark", 3, 81.0],
  ["Norway", 4, 79.3],
  ["Finland", 5, 78.6],
  ["France", 6, 76.4],
  ["Austria", 7, 75.6],
  ["Sweden", 8, 74.8],
  ["Ireland", 9, 73.9],
  ["Germany", 10, 72.5],
  ["Australia", 11, 71.8],
  ["New Zealand", 12, 70.9],
  ["United States", 13, 67.3],
  ["United Kingdom", 14, 66.1],
  ["Japan", 15, 64.7],
  ["Spain", 16, 63.4],
  ["Portugal", 17, 62.3],
  ["Italy", 18, 61.9],
  ["South Korea", 19, 61.2],
  ["Singapore", 20, 60.8],
  ["India", 38, 61.2],
  ["China", 49, 52.8],
  ["Brazil", 55, 59.8],
  ["Indonesia", 65, 51.3],
  ["Mexico", 66, 50.7],
  ["South Africa", 67, 48.9],
  ["Turkey", 71, 47.2],
  ["Thailand", 74, 46.0],
  ["Vietnam", 96, 41.0],
  ["Philippines", 98, 39.8],
  ["Pakistan", 110, 37.9],
  ["Bangladesh", 113, 36.6],
  ["Nigeria", 123, 34.1],
  ["Egypt", 125, 33.5],
  ["Kenya", 129, 32.1],
  ["Ethiopia", 135, 30.4],
  ["DR Congo", 137, 29.8],
  ["Afghanistan", 174, 19.2],
  ["Chad", 190, 15.1],
  ["Niger", 196, 13.6],
];

test("mock provider data contains 196 unique countries", () => {
  assert.equal(countries.length, 196);
  assert.equal(datasetMetadata.countryCount, 196);
  assert.equal(new Set(countries.map((country) => country.slug)).size, 196);
});

test("default homepage fixture keeps the approved 40-card arrangement", () => {
  assert.equal(featuredCountries.length, 40);

  expectedFeatured.forEach(([name, rank, score], index) => {
    const country = featuredCountries[index];
    assert.equal(country.name, name);
    assert.equal(country.rank, rank);
    assert.equal(country.score, score);
    assert.equal(country.featuredOrder, index + 1);
  });
});

test("all-country search has access to countries outside the default fixture", () => {
  const nepal = getRankingBySlug("nepal");
  assert.ok(nepal);
  assert.equal(nepal.name, "Nepal");
  assert.equal(nepal.featuredOrder, undefined);
});

test("country flags use real image references instead of emoji flags", () => {
  countries.forEach((country) => {
    assert.match(country.flagUrl, /^https:\/\/flagcdn\.com\/w160\/[a-z]{2}\.png$/);
    assert.equal(country.flagAlt, `${country.name} flag`);
  });
});

test("ticker starts with the approved stable country sequence", () => {
  const expectedTicker = [
    ["India", 1.1, 38],
    ["Brazil", -0.3, 55],
    ["Switzerland", 0.4, 1],
    ["China", -0.6, 49],
    ["United States", -0.1, 13],
    ["Kenya", 0.2, 129],
    ["Australia", 0.3, 11],
    ["Nigeria", -0.2, 123],
  ];

  expectedTicker.forEach(([name, change, rank], index) => {
    const item = tickerItems[index];
    assert.equal(item.name, name);
    assert.equal(item.tickerChange, change);
    assert.equal(item.rank, rank);
  });
});

test("ticker includes every country in the dataset", () => {
  assert.equal(tickerItems.length, countries.length);
  assert.equal(new Set(tickerItems.map((country) => country.slug)).size, countries.length);
});
