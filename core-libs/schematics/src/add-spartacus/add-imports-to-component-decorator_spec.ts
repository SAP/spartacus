/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Project } from 'ts-morph';
import { addImportsToComponentDecorator } from './add-imports-to-component-decorator';

describe('addImportsToComponentDecorator', () => {
  let project: Project;

  beforeEach(() => {
    project = new Project();
  });

  it('should add imports property to Component decorator when it does not exist', () => {
    const sourceFile = project.createSourceFile(
      'test.ts',
      `
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
}
      `
    );

    addImportsToComponentDecorator(sourceFile, 'StorefrontComponent', {
      removeOldImports: true,
    });

    const result = sourceFile.getText();
    expect(result).toMatch(
      /@Component\({[\s\S]*imports:\s*\[StorefrontComponent\]/
    );
    expect(result).toMatchSnapshot();
  });

  it('should replace existing imports array with new value', () => {
    const sourceFile = project.createSourceFile(
      'test.ts',
      `
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html'
})
export class AppComponent {}
      `
    );

    addImportsToComponentDecorator(sourceFile, 'StorefrontComponent', {
      removeOldImports: true,
    });

    const result = sourceFile.getText();
    expect(result).toContain('imports: [StorefrontComponent]');
    expect(result).not.toContain('CommonModule');
    expect(result).toContain('standalone: true');
    expect(result).toMatchSnapshot();
  });

  it('should handle Component decorator without existing object literal', () => {
    const sourceFile = project.createSourceFile(
      'test.ts',
      `
import { Component } from '@angular/core';

@Component({})
export class AppComponent {}
      `
    );

    addImportsToComponentDecorator(sourceFile, 'StorefrontComponent', {
      removeOldImports: true,
    });

    const result = sourceFile.getText();
    expect(result).toContain('imports: [StorefrontComponent]');
    expect(result).toMatchSnapshot();
  });

  it('should add property to existing Component decorator properties', () => {
    const sourceFile = project.createSourceFile(
      'test.ts',
      `
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true
})
export class AppComponent {}
      `
    );

    addImportsToComponentDecorator(sourceFile, 'StorefrontComponent', {
      removeOldImports: true,
    });

    const result = sourceFile.getText();
    expect(result).toContain('imports: [StorefrontComponent]');
    expect(result).toContain("selector: 'app-root'");
    expect(result).toContain('standalone: true');
    expect(result).toMatchSnapshot();
  });

  it('should handle multiple classes and only modify decorated one', () => {
    const sourceFile = project.createSourceFile(
      'test.ts',
      `
import { Component } from '@angular/core';

export class OtherClass {}

@Component({
  selector: 'app-root'
})
export class AppComponent {}
      `
    );

    addImportsToComponentDecorator(sourceFile, 'StorefrontComponent', {
      removeOldImports: true,
    });

    const result = sourceFile.getText();
    expect(result).toMatch(/export class OtherClass \{\s*\}/);
    expect(result).toMatch(
      /@Component\([\s\S]*imports:\s*\[StorefrontComponent\][\s\S]*export class AppComponent/
    );
    expect(result).toMatchSnapshot();
  });
});
