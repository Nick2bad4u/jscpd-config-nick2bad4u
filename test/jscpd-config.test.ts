import { readFile } from "node:fs/promises";
import * as path from "node:path";
import { describe, expect, it } from "vitest";

import {
    jscpdConfigPath,
    loadJscpdConfig,
    parseJscpdConfig,
} from "../src/jscpd-config.js";

describe("jscpd shared config", () => {
    it("loads the bundled JSON config", async () => {
        expect.assertions(3);

        const rawConfig: unknown = JSON.parse(
            await readFile(jscpdConfigPath, "utf8")
        );
        const jscpdConfig = await loadJscpdConfig();

        expect(path.isAbsolute(jscpdConfigPath)).toBe(true);
        expect(jscpdConfig).toStrictEqual(rawConfig);
        expect(jscpdConfig.ignore).not.toHaveLength(0);
    });

    it("enables the expected shared reporters", async () => {
        expect.assertions(3);

        const jscpdConfig = await loadJscpdConfig();

        expect(jscpdConfig.reporters).toContain("console");
        expect(jscpdConfig.reporters).toContain("json");
        expect(jscpdConfig.reporters).toContain("badge");
    });

    it("keeps shared scan defaults aligned with jscpd v5", async () => {
        expect.assertions(6);

        const jscpdConfig = await loadJscpdConfig();
        const overlyBroadToolGlobs = [
            "**/babel*",
            "**/commitlint*",
            "**/eslint*",
            "**/grunt*",
            "**/gulp*",
            "**/husky*",
            "**/lint-staged*",
            "**/prettier*",
            "**/rollup*",
            "**/stylelint*",
            "**/webpack*",
        ];

        expect(jscpdConfig.ignore).not.toStrictEqual(
            expect.arrayContaining(overlyBroadToolGlobs)
        );
        expect(jscpdConfig.ignore).toStrictEqual(
            expect.arrayContaining([
                "**/eslint.config.*",
                "**/prettier.config.*",
                "**/stylelint.config.*",
            ])
        );
        expect(jscpdConfig.maxSize).toBe("1mb");
        expect(jscpdConfig.noSymlinks).toBe(true);
        expect(jscpdConfig.noTips).toBe(true);
        expect(jscpdConfig.threshold).toBe(100);
    });

    it("rejects invalid config input", () => {
        expect.assertions(1);

        expect(() => parseJscpdConfig({})).toThrow(TypeError);
    });
});
