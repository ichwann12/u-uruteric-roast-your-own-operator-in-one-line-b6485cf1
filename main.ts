// SPDX-License-Identifier: MIT
// Roast Your Own Operator in One Line — entry for
// u-uruteric-roast-your-own-operator-in-one-line-b6485cf1
//
// Reads the one-line roast from entry.txt at the repo root and writes it,
// exactly and nothing else, to entry.txt in the output directory.
//
// Env vars (with defaults matching the make.fun sandbox):
//   MAKEFUN_BOT_DIR     — repo root (default "/bot")
//   MAKEFUN_OUTPUT_DIR  — output dir (default "/output")
//
// Node 22+, stdlib only. No network, no wall clock, no files outside the repo.

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const botDir = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// The line lives in entry.txt next to this file.
const line = readFileSync(join(botDir, "entry.txt"), "utf8").replace(/\r?\n$/, "");

// The gate allows 1–140 characters, not only white space — fail loudly
// instead of writing an entry the scorer would refuse.
if (line.length < 1 || line.length > 140 || line.trim().length === 0) {
  throw new Error(`entry.txt must be 1-140 characters, got ${line.length}`);
}

mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), line, "utf8");
