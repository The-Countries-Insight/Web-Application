/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  // Usar preset oficial para Angular
  preset: "jest-preset-angular",

  // Ambiente DOM para Angular Material
  testEnvironment: "jsdom",

  // Archivos que Jest debe cargar ANTES de ejecutar pruebas
  setupFilesAfterEnv: ["<rootDir>/setup-jest.ts"],

  // Ignorar estos paths (carpetas de Angular y node)
  testPathIgnorePatterns: [
    "/node_modules/",
    "/dist/",
  ],

  // Archivos de prueba válidos
  testMatch: [
    "**/*.spec.ts"
  ],

  // Procesar TS usando ts-jest
  transform: {
    "^.+\\.(ts|js|html)$": [
      "ts-jest",
      {
        tsconfig: "tsconfig.spec.json",
        diagnostics: true,
      },
    ],
  },

  // Resolver módulos igual que Angular
  moduleNameMapper: {
    "^@app/(.*)$": "<rootDir>/src/app/$1",
    "^@env/(.*)$": "<rootDir>/src/environments/$1",
  },

  // Extensiones que Jest soporta
  moduleFileExtensions: ["ts", "html", "js", "json"],

  // Requerido para soportar Standalone Components
  transformIgnorePatterns: [
    "node_modules/(?!.*\\.mjs$)"
  ],
};
