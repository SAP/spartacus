import { replaceContent } from './regex-scss-path-replace';
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
