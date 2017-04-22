'use strict';

var has = require('has');

var allRules = {
  'jsx-no-bind': require('./lib/rules/jsx-no-bind'),
};

function filterRules(rules, predicate) {
  var result = {};
  for (var key in rules) {
    if (has(rules, key) && predicate(rules[key])) {
      result[key] = rules[key];
    }
  }
  return result;
}

function configureAsError(rules) {
  var result = {};
  for (var key in rules) {
    if (!has(rules, key)) {
      continue;
    }
    result['loop/' + key] = 2;
  }
  return result;
}

var activeRules = filterRules(allRules, function(rule) {
  return !rule.meta.deprecated;
});

var activeRulesConfig = configureAsError(activeRules);

module.exports = {
  rules: allRules,
  configs: {
    all: {
      plugins: [
        'loop'
      ],
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      },
      rules: activeRulesConfig
    }
  }
};
