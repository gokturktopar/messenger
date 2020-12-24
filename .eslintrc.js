module.exports=
{
  "env": {
      "browser":  true,
      "commonjs": true,
      "es2020":   true,
      "jest":     true
  },
    "extends": ["node"],
    'rules': {
        'strict': 0,
        'quotes': ['error', 'single'],
        'no-commonjs': [2, { 'allowRequire': true }],
        'no-unused-vars': ['warn', { 'vars': 'all', 'args': 'after-used', 'ignoreRestSiblings': false }]
    }
  }