export default  {

    extends: ["@commitlint/cli","@commitlint/config-conventional"],
    rules: {
        "type-enum": [
            2,
            "always",
            ["ci", "chore", "docs", "ticket","feat", "fix", "perf", "refactor", "revert", "style"],
        ],
        "subject-case": [2,"always","sentence-case"]
    }
}