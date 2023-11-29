module.exports = {
    "root": true,
    "env": { node: true, es2020: true },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
    ],
    "ignorePatterns": [
        "dist",
        ".eslintrc.cjs"
    ],
    "rules": {
        "semi": "warn",
        "sort-imports": "warn",
        "array-bracket-newline": "warn",
        "no-console": "warn",
        "no-duplicate-imports": "error",
        "no-unused-vars": "error",
        "jsx-quotes": [
            "error",
            "prefer-double"
        ],
        "quotes": [
            "error",
            "double",
            {
                "allowTemplateLiterals": true
            }
        ]
    }
}