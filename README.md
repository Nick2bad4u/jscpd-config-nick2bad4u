# jscpd-config-nick2bad4u

[![NPM license.](https://flat.badgen.net/npm/license/jscpd-config-nick2bad4u?color=purple)](https://github.com/Nick2bad4u/jscpd-config-nick2bad4u/blob/main/LICENSE) [![NPM total downloads.](https://flat.badgen.net/npm/dt/jscpd-config-nick2bad4u?color=pink)](https://www.npmjs.com/package/jscpd-config-nick2bad4u) [![Latest GitHub release.](https://flat.badgen.net/github/release/Nick2bad4u/jscpd-config-nick2bad4u?color=cyan)](https://github.com/Nick2bad4u/jscpd-config-nick2bad4u/releases) [![GitHub open issues.](https://flat.badgen.net/github/open-issues/Nick2bad4u/jscpd-config-nick2bad4u?color=red)](https://github.com/Nick2bad4u/jscpd-config-nick2bad4u/issues)

Shared [jscpd](https://github.com/kucherenko/jscpd) copy/paste detector configuration for Nick2bad4u TypeScript and npm repositories.

## Install

```bash
npm install --save-dev jscpd jscpd-config-nick2bad4u
```

## Usage

Point `jscpd` at the shared config file from consuming repositories:

```json
{
 "scripts": {
  "lint:jscpd": "jscpd --config node_modules/jscpd-config-nick2bad4u/jscpd.json"
 }
}
```

Additional CLI arguments still work through the native `jscpd` command:

```bash
npm run lint:jscpd -- ./src --reporters console,json
```

## Programmatic Access

```ts
import { jscpdConfigPath, loadJscpdConfig } from "jscpd-config-nick2bad4u";

const jscpdConfig = await loadJscpdConfig();

console.log(jscpdConfigPath);
console.log(jscpdConfig.threshold);
```

The raw JSON file is also exported:

```ts
import config from "jscpd-config-nick2bad4u/jscpd.json" with { type: "json" };
```

## Defaults

- Respects `.gitignore`.
- Scans `**/*` with broad ignores for generated output, dependency folders, reports, docs, tests, binary/media assets, and common tool config files.
- Uses `mild` matching with `minLines: 10`, `minTokens: 50`, `maxLines: 10000`, and `maxSize: "100kb"`.
- Writes reports to `./reports/jscpd/`.
- Enables `html`, `markdown`, `json`, `console`, `badge`, `xml`, and `csv` reporters.
- Keeps `exitCode: 0` so duplicate reports are informational unless a consuming repo chooses stricter CLI overrides.

## Maintenance

Use [docs/UPDATE_CHECKLIST.md](docs/UPDATE_CHECKLIST.md) when refreshing the shared config or migrating consuming repositories.
