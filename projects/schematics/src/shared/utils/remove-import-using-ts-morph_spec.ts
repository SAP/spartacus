/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Project } from 'ts-morph';
import { removeImportUsingTsMorph } from './file-utils';

describe('removeImportUsingTsMorph', () => {
  let project: Project;

  beforeEach(() => {
    project = new Project();
  });

  it('should remove a named import from import declaration', () => {
    const sourceFile = project.createSourceFile(
      'test.ts',
      `
import { Component, OnInit, OnDestroy } from '@angular/core';

export class TestClass implements OnInit, OnDestroy {
  ngOnInit() {}
  ngOnDestroy() {}
}
      `
    );

    removeImportUsingTsMorph(sourceFile, {
      importPath: '@angular/core',
      importName: 'OnDestroy',
    });

    const result = sourceFile.getText();
    expect(result).toMatchSnapshot();
  });

  it('should remove entire import declaration if last named import is removed', () => {
    const sourceFile = project.createSourceFile(
      'test.ts',
      `
import { OnlyImport } from './some-module';
import { Component } from '@angular/core';

export class TestClass {}
      `
    );

    removeImportUsingTsMorph(sourceFile, {
      importPath: './some-module',
      importName: 'OnlyImport',
    });

    const result = sourceFile.getText();
    expect(result).toMatchSnapshot();
  });

  it('should do nothing if import path does not exist', () => {
    const sourceFile = project.createSourceFile(
      'test.ts',
      `
import { Component } from '@angular/core';

export class TestClass {}
      `
    );

    const originalText = sourceFile.getText();

    removeImportUsingTsMorph(sourceFile, {
      importPath: './non-existent-module',
      importName: 'SomeThing',
    });

    const result = sourceFile.getText();
    expect(result).toBe(originalText);
  });

  it('should do nothing if import name does not exist in the declaration', () => {
    const sourceFile = project.createSourceFile(
      'test.ts',
      `
import { Component, OnInit } from '@angular/core';

export class TestClass implements OnInit {}
      `
    );

    const originalText = sourceFile.getText();

    removeImportUsingTsMorph(sourceFile, {
      importPath: '@angular/core',
      importName: 'NonExistent',
    });

    const result = sourceFile.getText();
    expect(result).toBe(originalText);
  });

  it('should allow for being called multiple times on the same file', () => {
    const sourceFile = project.createSourceFile(
      'test.ts',
      `
import { A, B, C, D } from './module';

export class TestClass {}
      `
    );

    removeImportUsingTsMorph(sourceFile, {
      importPath: './module',
      importName: 'B',
    });

    removeImportUsingTsMorph(sourceFile, {
      importPath: './module',
      importName: 'D',
    });

    const result = sourceFile.getText();
    expect(result).toMatchSnapshot();
  });
});
