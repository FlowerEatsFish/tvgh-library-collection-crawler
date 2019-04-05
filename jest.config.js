module.exports = {
  roots: [
    '<rootDir>'
  ],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  testPathIgnorePatterns: [
    'node_modules',
    'build',
    'dist'
  ],
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/demo.ts'
  ],
  testEnvironment: 'node',
  testRegex: 'test/.+\\.tsx?$',
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
    'jsx',
    'json',
    'node'
  ]
};
