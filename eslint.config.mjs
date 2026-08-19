import nickTwoBadFourU from "eslint-config-nick2bad4u";

/** @type {import("eslint").Linter.Config[]} */
const config = [
    ...nickTwoBadFourU.configs.all,

    {
        files: [".gitleaks.toml"],
        name: "Gitleaks TOML cross-platform formatter alignment",
        rules: {
            // Tombi currently produces conflicting indentation on Windows and Linux.
            // The TOML parser/style rules and Gitleaks itself still validate this file.
            "tombi/tombi": "off",
        },
    },
];

export default config;
