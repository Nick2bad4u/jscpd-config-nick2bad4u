# Shared jscpd Config Update Checklist

Use this checklist when refreshing `jscpd-config-nick2bad4u` or migrating repositories to the shared config package.

## Package Refresh

- [ ] Confirm the current `jscpd` release and review upstream config/reporting changes.
- [ ] Review `jscpd.json` ignore patterns against current Nick2bad4u repository layouts.
- [ ] Keep `src/jscpd-config.ts` exports aligned with the bundled `jscpd.json` shape.
- [ ] Update README usage examples when install, script, reporter, or threshold behavior changes.
- [ ] Run `npm run sync:node-version-files:check` after editing Node versions.
- [ ] Run `npm run lint:config`.
- [ ] Run `npm run typecheck`.
- [ ] Run `npm run test`.
- [ ] Run `npm run lint:package` before publishing.
- [ ] Run `npm pack --dry-run` and confirm `dist`, `src`, `jscpd.json`, `README.md`, and `LICENSE` are the only intentional package payload.

## Consumer Migration

- [ ] Install `jscpd` and `jscpd-config-nick2bad4u` as dev dependencies.
- [ ] Replace repository-local duplicated `jscpd.json` files unless the repository has required local overrides.
- [ ] Use `"lint:jscpd": "jscpd --config node_modules/jscpd-config-nick2bad4u/jscpd.json"` in consuming `package.json` scripts.
- [ ] Run `npm run lint:jscpd` after adding real source files.
- [ ] Decide whether the consuming repository should keep the shared `exitCode: 0` behavior or pass stricter local CLI overrides.

## Shared Config Refresh

- [ ] Run `NPM-Convert-SharedPackageConfigMigration.ps1 -Path . -SkipDependencyUpdate` after this package is published.
- [ ] Run `npm run update-deps` in consuming repositories after confirming the new package version is available on npm.
- [ ] Check `.gitleaks.toml` still extends `gitleaks-config-nick2bad4u` and keeps repository-specific allowlists.
- [ ] Check `.npmpackagejsonlintrc.json`, `.remarkrc.mjs`, `.secretlintrc.cjs`, `.yamllint`, `stylelint.config.mjs`, `tsdoc.json`, `typedoc.json`, and jscpd usage still point at shared configs.
- [ ] Re-pin reusable workflow callers after updating `Nick2bad4u/workflow-templates`.

## Before Release

- [ ] Confirm `private` is absent from `package.json`.
- [ ] Confirm `publishConfig.provenance` and registry settings are correct.
- [ ] Confirm package exports and declaration files match built output.
- [ ] Confirm `peerDependencies.jscpd` matches the supported jscpd major.
- [ ] Create the release tag only after `npm run release:verify` passes locally.
