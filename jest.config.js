module.exports = {
  transform: {
    '^.+\.(js|jsx|mjs)$': 'babel-jest'
  },
  transformIgnorePatterns: [
    'node_modules/(?!react-force-graph|d3|three|react-kapsule)'
  ]
};
