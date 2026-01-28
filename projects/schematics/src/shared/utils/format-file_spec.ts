/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Project } from 'ts-morph';
import { formatFile } from './program';

describe('formatFile', () => {
  let project: Project;

  beforeEach(() => {
    project = new Project();
  });

  it('should organize imports alphabetically', () => {
    const sourceFile = project.createSourceFile(
      'test.ts',
      `
import { inject, Component } from '@angular/core';
import { z, a, m } from './test-module';
import { Router } from '@angular/router';

export class TestClass {
 z = z;
 a = a;
 m = m;

 router = inject(Router);
}
      `
    );

    formatFile(sourceFile);

    const result = sourceFile.getText();
    expect(result).toMatchSnapshot();
  });

  it('should remove unused imports', () => {
    const sourceFile = project.createSourceFile(
      'test.ts',
      `
import { Component, OnInit, OnDestroy } from '@angular/core';
import { z, a, m } from './test-module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-test'
})
export class TestClass {
  router = inject(Router);
}
      `
    );

    formatFile(sourceFile);

    const result = sourceFile.getText();
    expect(result).toContain('Component');
    expect(result).not.toContain('OnInit');
    expect(result).not.toContain('OnDestroy');
    expect(result).toMatchSnapshot();
  });

  it('should ensure new line at end of file', () => {
    const sourceFile = project.createSourceFile(
      'test.ts',
      `import { Component } from '@angular/core';

export class TestClass {}`
    );

    formatFile(sourceFile);

    const result = sourceFile.getText();
    expect(result.endsWith('\n')).toBe(true);
  });

  it('should use 2 space indentation', () => {
    const sourceFile = project.createSourceFile(
      'test.ts',
      `
import { Component } from '@angular/core';

@Component({
selector: 'app-test',
template: ''
})
export class TestClass {
constructor() {
console.log('test');
}
}
      `
    );

    formatFile(sourceFile);

    const result = sourceFile.getText();
    // Check for 2-space indentation
    expect(result).toContain('  selector:');
    expect(result).toContain('  template:');
    expect(result).toMatchSnapshot();
  });

  it('should handle empty file', () => {
    const sourceFile = project.createSourceFile('test.ts', '');

    formatFile(sourceFile);

    const result = sourceFile.getText();
    // Empty file may or may not have a newline depending on formatFile implementation
    expect(result.length).toBeLessThanOrEqual(1);
  });

  it('should format complex nested structures', () => {
    const sourceFile = project.createSourceFile(
      'test.ts',
      `
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
imports: [
RouterModule.forRoot([
{ path: '', component: HomeComponent },
{ path: 'about', component: AboutComponent }
])
],
exports: [RouterModule]
})
export class AppRoutingModule {}
      `
    );

    formatFile(sourceFile);

    const result = sourceFile.getText();
    expect(result).toMatchSnapshot();
  });
});
