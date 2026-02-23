/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Project } from 'ts-morph';
import { getAppConfigServerProviders } from './get-app-config-server-providers';

describe('getAppConfigServerProviders', () => {
  let project: Project;

  beforeEach(() => {
    project = new Project();
  });

  it('should return providers array from serverConfig', () => {
    const sourceFile = project.createSourceFile(
      'app.config.server.ts',
      `
import { ApplicationConfig } from '@angular/core';

export const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    provideServerRoutesConfig()
  ]
};
      `
    );

    const providersArray = getAppConfigServerProviders(sourceFile);

    expect(providersArray).toBeDefined();
    expect(providersArray?.getText()).toMatchSnapshot();
  });

  it('should return undefined if serverConfig does not exist', () => {
    const sourceFile = project.createSourceFile(
      'app.config.server.ts',
      `
export const appConfig = {
  providers: []
};
      `
    );

    const providersArray = getAppConfigServerProviders(sourceFile);

    expect(providersArray).toBeUndefined();
  });

  it('should return undefined if providers property does not exist', () => {
    const sourceFile = project.createSourceFile(
      'app.config.server.ts',
      `
export const serverConfig: ApplicationConfig = {
  otherProperty: 'value'
};
      `
    );

    const providersArray = getAppConfigServerProviders(sourceFile);

    expect(providersArray).toBeUndefined();
  });

  it('should return undefined if providers is not an array', () => {
    const sourceFile = project.createSourceFile(
      'app.config.server.ts',
      `
export const serverConfig: ApplicationConfig = {
  providers: null
};
      `
    );

    const providersArray = getAppConfigServerProviders(sourceFile);

    expect(providersArray).toBeUndefined();
  });

  it('should handle empty providers array', () => {
    const sourceFile = project.createSourceFile(
      'app.config.server.ts',
      `
export const serverConfig: ApplicationConfig = {
  providers: []
};
      `
    );

    const providersArray = getAppConfigServerProviders(sourceFile);

    expect(providersArray).toBeDefined();
    expect(providersArray?.getText()).toMatchSnapshot();
  });
});
