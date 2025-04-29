import { replaceContent, reverseReplaceContent } from './regex-scss-path-replace';
import { describe, it, expect } from 'vitest';

describe('replaceContent', () => {
  const pathsMapping = [
    { key: 'feature-libs', value: '@spartacus' },
    { key: 'storefrontstyles', value: '@spartacus/styles' },
    { key: 'projects/schematics/index', value: '@spartacus/schematics' },
  ];

  const appendSpartacusPath = ['asm', 'cart', 'checkout'];

  it('should partially replace paths based on pathsMapping', () => {
    const content = `@import 'feature-libs/asm/styles';\n@import 'storefrontstyles/asm/styles';`;
    const result = replaceContent(content, pathsMapping, appendSpartacusPath);
    expect(result).toBe(`@import '@spartacus/asm/styles';\n@import '@spartacus/styles/asm/styles';`);
  });

  it('should fully replace paths based on pathsMapping', () => {
    const content = `@import 'projects/schematics/index';`;
    const result = replaceContent(content, pathsMapping, appendSpartacusPath);
    expect(result).toBe(`@import '@spartacus/schematics';`);
  });

  it('should add @spartacus prefix for paths in appendSpartacusPath', () => {
    const content = `@import 'asm/styles';`;
    const result = replaceContent(content, pathsMapping, appendSpartacusPath);
    expect(result).toBe(`@import '@spartacus/asm/styles';`);
  });

  it('should not modify unrelated paths', () => {
    const content = `@import 'unrelated/path';`;
    const result = replaceContent(content, pathsMapping, appendSpartacusPath);
    expect(result).toBe(`@import 'unrelated/path';`);
  });
});

describe('reverseReplaceContent', () => {
  const pathsMapping = [
    { key: 'storefrontstyles', value: '@spartacus/styles' },
    { key: 'projects/schematics/index', value: '@spartacus/schematics' },
    { key: 'feature-libs', value: '@spartacus' },
  ];

  it('should reverse partially replaced paths based on pathsMapping', () => {
    const content = `@import '@spartacus/asm/styles';\n@import '@spartacus/styles/asm/styles';\n@import '@spartacus/styles/vendor/bootstrap/scss/functions';`;
    const result = reverseReplaceContent(content, pathsMapping);
    expect(result).toBe(`@import 'feature-libs/asm/styles';\n@import 'storefrontstyles/asm/styles';\n@import 'storefrontstyles/vendor/bootstrap/scss/functions';`);
  });

  it('should reverse fully replaced paths based on pathsMapping', () => {
    const content = `@import '@spartacus/schematics';`;
    const result = reverseReplaceContent(content, pathsMapping);
    expect(result).toBe(`@import 'projects/schematics/index';`);
  });

  it('should not modify unrelated paths', () => {
    const content = `@import 'unrelated/path';`;
    const result = reverseReplaceContent(content, pathsMapping);
    expect(result).toBe(`@import 'unrelated/path';`);
  });
});
