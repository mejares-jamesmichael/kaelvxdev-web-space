import { test, describe } from 'node:test';
import assert from 'node:assert';
import { config, validateConfig } from './config.ts';

describe('Config Validation', () => {
  test('should validate the default config correctly', () => {
    assert.doesNotThrow(() => {
      validateConfig(config);
    });
  });

  test('should throw an error if config is not an object', () => {
    assert.throws(() => {
      validateConfig(null);
    }, { message: 'Config must be an object' });
  });

  test('should throw an error if name is missing or not a string', () => {
    const invalidConfig = { ...config, name: 123 };
    assert.throws(() => {
      validateConfig(invalidConfig);
    }, { message: 'Config.name must be a string' });
  });

  test('should throw an error if socials is missing or not an object', () => {
    const invalidConfig = { ...config, socials: 'not-an-object' };
    assert.throws(() => {
      validateConfig(invalidConfig);
    }, { message: 'Config.socials must be an object' });
  });

  test('should throw an error if socials.github is missing or not a string', () => {
    const invalidConfig = {
      ...config,
      socials: { ...config.socials, github: 123 }
    };
    assert.throws(() => {
      validateConfig(invalidConfig);
    }, { message: 'Config.socials.github must be a string' });
  });

  test('should throw an error if skills is not an array', () => {
    const invalidConfig = { ...config, skills: 'not-an-array' };
    assert.throws(() => {
      validateConfig(invalidConfig);
    }, { message: 'Config.skills must be an array' });
  });

  test('should throw an error if skills contains non-string values', () => {
    const invalidConfig = { ...config, skills: ['Linux', 123] };
    assert.throws(() => {
      validateConfig(invalidConfig);
    }, { message: 'Config.skills must be an array of strings' });
  });
});
