export interface Config {
  name: string;
  title: string;
  email: string;
  socials: {
    github: string;
    linktree: string;
  };
  skills: string[];
  cvPath: string;
}

export const config: Config = {
  name: 'James Michael',
  title: 'Backend & DevOps Engineer',
  email: 'jamesmichaelmejares@gmail.com',
  socials: {
    github: 'https://github.com/mejares-jamesmichael',
    linktree: 'https://linktr.ee/kaelvxd'
  },
  skills: [
    'Linux',
    'AWS',
    'CI/CD',
    'Docker',
    'GitHub Actions'
  ],
  cvPath: '/James-Michael-Mejares.pdf'
};

/**
 * Validates the configuration object at runtime.
 * @param config The configuration object to validate.
 * @throws {Error} if the configuration is invalid.
 */
export function validateConfig(config: any): asserts config is Config {
  if (!config || typeof config !== 'object') {
    throw new Error('Config must be an object');
  }

  const requiredStrings: (keyof Config)[] = ['name', 'title', 'email', 'cvPath'];
  for (const key of requiredStrings) {
    if (typeof config[key] !== 'string') {
      throw new Error(`Config.${key} must be a string`);
    }
  }

  if (!config.socials || typeof config.socials !== 'object') {
    throw new Error('Config.socials must be an object');
  }

  if (typeof config.socials.github !== 'string') {
    throw new Error('Config.socials.github must be a string');
  }

  if (typeof config.socials.linktree !== 'string') {
    throw new Error('Config.socials.linktree must be a string');
  }

  if (!Array.isArray(config.skills)) {
    throw new Error('Config.skills must be an array');
  }

  for (const skill of config.skills) {
    if (typeof skill !== 'string') {
      throw new Error('Config.skills must be an array of strings');
    }
  }
}

// Ensure the default config is valid
validateConfig(config);
