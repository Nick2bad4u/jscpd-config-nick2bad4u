# Repository Instructions

This repository publishes `jscpd-config-nick2bad4u`, the shared jscpd copy/paste detector configuration for Nick2bad4u npm/TypeScript repositories.

## Priorities

- Keep `jscpd.json` as the canonical config consumed by the package wrapper and by direct `jscpd --config` usage.
- Preserve broad generated-output, dependency, report, and asset ignores unless a target repository class needs coverage.
- Keep the `jscpd-nick2bad4u` binary small: it should resolve the bundled config, call `jscpd`, and forward user arguments.
- Do not weaken security scanners or release gates to make CI pass.
- Keep workflow permissions least-privilege and keep third-party actions pinned by SHA where already pinned.

## Common Commands

```bash
npm run lint:jscpd
npm run lint:all
npm run typecheck
npm run test
npm run release:verify
```

## Tooling Baseline

- Node is controlled by `.node-version`, `.nvmrc`, and `package.json#engines`.
- npm is controlled by `packageManager`.
- ESLint extends `eslint-config-nick2bad4u`.
- Prettier extends `prettier-config-nick2bad4u`.
- Package JSON, Secretlint, Remark, Yamllint, TSDoc, Gitleaks, TypeScript, Vitest, and TypeDoc configs are included.
- GitHub Actions use local scripts for validation and caller workflows for shared security/dependency automation.
