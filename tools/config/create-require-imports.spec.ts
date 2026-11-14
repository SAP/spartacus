/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { readFileSync } from 'fs';
import * as path from 'path';
import ts from 'typescript';
import { getCreateRequireImports } from './create-require-imports';

function parse(source: string): ts.SourceFile {
  return ts.createSourceFile(
    'test.ts',
    source,
    ts.ScriptTarget.ES2022,
    /* setParentNodes */ true
  );
}

function parseFile(filePath: string): ts.SourceFile {
  const absPath = path.resolve(__dirname, '../..', filePath);
  return ts.createSourceFile(
    absPath,
    readFileSync(absPath, 'utf-8'),
    ts.ScriptTarget.ES2022,
    true
  );
}

describe('getCreateRequireImports', () => {
  // ── Real-world: the exact file this function was written to handle ──────────

  it('detects fastify and @fastify/http-proxy in config-proxy-server.ts', () => {
    const src = parseFile(
      'core-libs/setup/dev-proxy/config-proxy-server.ts'
    );
    expect(getCreateRequireImports(src)).toEqual(
      new Set(['fastify', '@fastify/http-proxy'])
    );
  });

  // ── Synthetic unit tests ────────────────────────────────────────────────────

  it('detects a package loaded via createRequire under its canonical name', () => {
    const src = parse(`
      import { createRequire } from 'node:module';
      const req = createRequire(process.cwd());
      const Fastify = req('fastify');
    `);
    expect(getCreateRequireImports(src)).toEqual(new Set(['fastify']));
  });

  it('detects a package when createRequire is imported as an alias', () => {
    const src = parse(`
      import { createRequire as cr } from 'node:module';
      const cwdReq = cr(process.cwd());
      const httpProxy = cwdReq('@fastify/http-proxy');
    `);
    expect(getCreateRequireImports(src)).toEqual(
      new Set(['@fastify/http-proxy'])
    );
  });

  it('detects multiple packages loaded from the same require function', () => {
    const src = parse(`
      import { createRequire } from 'node:module';
      const r = createRequire(import.meta.url);
      const a = r('pkg-a');
      const b = r('pkg-b');
    `);
    expect(getCreateRequireImports(src)).toEqual(new Set(['pkg-a', 'pkg-b']));
  });

  it('handles the bare module specifier without the node: prefix', () => {
    const src = parse(`
      import { createRequire } from 'module';
      const req = createRequire(process.cwd());
      req('some-package');
    `);
    expect(getCreateRequireImports(src)).toEqual(new Set(['some-package']));
  });

  it('handles createRequire imported alongside other named imports', () => {
    const src = parse(`
      import { createRequire, something } from 'node:module';
      const load = createRequire(process.cwd());
      load('my-package');
    `);
    expect(getCreateRequireImports(src)).toEqual(new Set(['my-package']));
  });

  it('returns empty set when there are no createRequire calls', () => {
    const src = parse(`
      import { something } from 'somewhere';
      const x = something();
    `);
    expect(getCreateRequireImports(src)).toEqual(new Set());
  });

  it('ignores dynamic (non-string-literal) arguments', () => {
    const src = parse(`
      import { createRequire } from 'node:module';
      const req = createRequire(process.cwd());
      const pkgName = 'fastify';
      req(pkgName);
    `);
    expect(getCreateRequireImports(src)).toEqual(new Set());
  });

  it('ignores calls on an identifier with the same name that is not a createRequire result', () => {
    const src = parse(`
      import { createRequire } from 'node:module';
      function req(x: string) { return x; }
      req('not-a-dynamic-dep');
    `);
    expect(getCreateRequireImports(src)).toEqual(new Set());
  });
});
