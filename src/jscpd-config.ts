import type { JsonObject } from "type-fest";

import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

/** Shared jscpd configuration shape exported by this package. */
export interface JscpdConfig {
    /** Whether report paths should be absolute. */
    readonly absolute: boolean;

    /** Whether clone output should include Git blame data. */
    readonly blame: boolean;

    /** Exit code used when clones are found. */
    readonly exitCode: number;

    /** Whether jscpd should respect `.gitignore`. */
    readonly gitignore: boolean;

    /** Glob patterns excluded from duplicate detection. */
    readonly ignore: readonly string[];

    /** Whether token comparisons should ignore case. */
    readonly ignoreCase: boolean;

    /** Maximum source file line count scanned by jscpd. */
    readonly maxLines: number;

    /** Maximum source file size scanned by jscpd. */
    readonly maxSize: string;

    /** Minimum lines required for a clone. */
    readonly minLines: number;

    /** Minimum tokens required for a clone. */
    readonly minTokens: number;

    /** Duplicate detection mode. */
    readonly mode: JscpdDetectionMode;

    /** Whether jscpd should avoid following symbolic links. */
    readonly noSymlinks: boolean;

    /** Whether jscpd should suppress tips and promotional messages. */
    readonly noTips: boolean;

    /** Output directory for file-based reporters. */
    readonly output: string;

    /** File glob scanned by jscpd. */
    readonly pattern: string;

    /** Enabled jscpd reporters. */
    readonly reporters: readonly string[];

    /** Whether console output should be suppressed. */
    readonly silent: boolean;

    /** Whether clones in the same directory should be skipped. */
    readonly skipLocal: boolean;

    /** Allowed duplication threshold. */
    readonly threshold: number;

    /** Whether jscpd should emit verbose output. */
    readonly verbose: boolean;
}

/** Duplicate detection modes supported by jscpd. */
export type JscpdDetectionMode =
    | "mild"
    | "strict"
    | "weak";

/** Absolute filesystem path to this package's bundled `jscpd.json`. */
export const jscpdConfigPath: string = fileURLToPath(
    new URL("../jscpd.json", import.meta.url)
);

type JsonConfigObject = Readonly<JsonObject>;

const createConfigTypeError = (
    propertyName: string,
    typeName: string
): TypeError =>
    new TypeError(
        `Expected jscpd config property "${propertyName}" to be ${typeName}.`
    );

const isJscpdDetectionMode = (value: unknown): value is JscpdDetectionMode => {
    switch (value) {
        case "mild": {
            return true;
        }
        case "strict": {
            return true;
        }
        case "weak": {
            return true;
        }
        default: {
            return false;
        }
    }
};

const isRecord = (value: unknown): value is JsonConfigObject =>
    typeof value === "object" && value !== null && !Array.isArray(value);

const getRequiredValue = (
    config: JsonConfigObject,
    propertyName: string
): unknown => config[propertyName];

const isConfigBoolean = (
    config: JsonConfigObject,
    propertyName: string
): boolean => {
    const value = getRequiredValue(config, propertyName);

    if (typeof value !== "boolean") {
        throw createConfigTypeError(propertyName, "a boolean");
    }

    return value;
};

const readMode = (
    config: JsonConfigObject,
    propertyName: string
): JscpdDetectionMode => {
    const value = getRequiredValue(config, propertyName);

    if (!isJscpdDetectionMode(value)) {
        throw createConfigTypeError(propertyName, "a supported jscpd mode");
    }

    return value;
};

const readNumber = (config: JsonConfigObject, propertyName: string): number => {
    const value = getRequiredValue(config, propertyName);

    if (typeof value !== "number") {
        throw createConfigTypeError(propertyName, "a number");
    }

    return value;
};

const readString = (config: JsonConfigObject, propertyName: string): string => {
    const value = getRequiredValue(config, propertyName);

    if (typeof value !== "string") {
        throw createConfigTypeError(propertyName, "a string");
    }

    return value;
};

const readStringArray = (
    config: JsonConfigObject,
    propertyName: string
): readonly string[] => {
    const value = getRequiredValue(config, propertyName);

    if (!Array.isArray(value)) {
        throw createConfigTypeError(propertyName, "a string array");
    }

    return value.map((item: unknown): string => {
        if (typeof item !== "string") {
            throw createConfigTypeError(propertyName, "a string array");
        }

        return item;
    });
};

/**
 * Load and validate the bundled jscpd configuration from disk.
 *
 * @throws TypeError When the bundled config has an invalid shape.
 */
export async function loadJscpdConfig(): Promise<JscpdConfig> {
    const parsedConfig: unknown = JSON.parse(
        await readFile(jscpdConfigPath, "utf8")
    );

    return parseJscpdConfig(parsedConfig);
}

/**
 * Validate unknown input as a jscpd config object.
 *
 * @throws TypeError When the input does not match the expected config shape.
 */
export function parseJscpdConfig(config: unknown): JscpdConfig {
    if (!isRecord(config)) {
        throw new TypeError("Expected jscpd config to be an object.");
    }

    return {
        absolute: isConfigBoolean(config, "absolute"),
        blame: isConfigBoolean(config, "blame"),
        exitCode: readNumber(config, "exitCode"),
        gitignore: isConfigBoolean(config, "gitignore"),
        ignore: readStringArray(config, "ignore"),
        ignoreCase: isConfigBoolean(config, "ignoreCase"),
        maxLines: readNumber(config, "maxLines"),
        maxSize: readString(config, "maxSize"),
        minLines: readNumber(config, "minLines"),
        minTokens: readNumber(config, "minTokens"),
        mode: readMode(config, "mode"),
        noSymlinks: isConfigBoolean(config, "noSymlinks"),
        noTips: isConfigBoolean(config, "noTips"),
        output: readString(config, "output"),
        pattern: readString(config, "pattern"),
        reporters: readStringArray(config, "reporters"),
        silent: isConfigBoolean(config, "silent"),
        skipLocal: isConfigBoolean(config, "skipLocal"),
        threshold: readNumber(config, "threshold"),
        verbose: isConfigBoolean(config, "verbose"),
    };
}
