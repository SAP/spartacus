/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Project } from 'ts-morph';
import { getAppConfigProviders } from './get-app-config-providers';

describe('getAppConfigProviders', () => {
  let project: Project;

  beforeEach(() => {
    project = new Project();
  });

  it('should return providers array from appConfig', () => {
    const sourceFile = project.createSourceFile(
      'app.config.ts',
      `
import { ApplicationConfig } from '@angular/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideZoneChangeDetection({ eventCoalescing: true })
  ]
};
      `
    );

    const providersArray = getAppConfigProviders(sourceFile);

    expect(providersArray).toBeDefined();
    expect(providersArray?.getText()).toMatchSnapshot();
  });

  it('should return undefined if appConfig does not exist', () => {
    const sourceFile = project.createSourceFile(
      'app.config.ts',
      `
export const someOtherConfig = {
  providers: []
};
      `
    );

    const providersArray = getAppConfigProviders(sourceFile);

    expect(providersArray).toBeUndefined();
  });

  it('should return undefined if providers property does not exist', () => {
    const sourceFile = project.createSourceFile(
      'app.config.ts',
      `
export const appConfig: ApplicationConfig = {
  otherProperty: 'value'
};
      `
    );

    const providersArray = getAppConfigProviders(sourceFile);

    expect(providersArray).toBeUndefined();
  });

  it('should return undefined if providers is not an array', () => {
    const sourceFile = project.createSourceFile(
      'app.config.ts',
      `
export const appConfig: ApplicationConfig = {
  providers: 'invalid'
};
      `
    );

    const providersArray = getAppConfigProviders(sourceFile);

    expect(providersArray).toBeUndefined();
  });

  it('should handle empty providers array', () => {
    const sourceFile = project.createSourceFile(
      'app.config.ts',
      `
export const appConfig: ApplicationConfig = {
  providers: []
};
      `
    );

    const providersArray = getAppConfigProviders(sourceFile);

    expect(providersArray).toBeDefined();
    expect(providersArray?.getText()).toMatchSnapshot();
  });
});
