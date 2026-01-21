/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Project } from 'ts-morph';
import { addToComponentDecorator } from './add-to-component-decorator';

describe('addToComponentDecorator', () => {
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

    addToComponentDecorator(sourceFile, 'imports', 'StorefrontComponent');

    const result = sourceFile.getText();
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

    addToComponentDecorator(sourceFile, 'imports', 'StorefrontComponent');

    const result = sourceFile.getText();
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

    addToComponentDecorator(sourceFile, 'imports', 'StorefrontComponent');

    const result = sourceFile.getText();
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

    addToComponentDecorator(sourceFile, 'imports', 'StorefrontComponent');

    const result = sourceFile.getText();
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

    addToComponentDecorator(sourceFile, 'imports', 'StorefrontComponent');

    const result = sourceFile.getText();
    expect(result).toMatchSnapshot();
  });
});
