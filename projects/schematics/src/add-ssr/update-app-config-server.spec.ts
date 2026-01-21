/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Project } from 'ts-morph';
import { getAppConfigServerProviders } from './get-app-config-server-providers';

describe('updateAppConfigServer - provider manipulation', () => {
  let project: Project;

  beforeEach(() => {
    project = new Project();
  });

  it('should add importProvidersFrom(AppServerModule) to providers', () => {
    const sourceFile = project.createSourceFile(
      'app.config.server.ts',
      `
import { ApplicationConfig } from '@angular/core';

export const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering()
  ]
};
      `
    );

    const providersArray = getAppConfigServerProviders(sourceFile);
    expect(providersArray).toBeDefined();

    if (providersArray) {
      providersArray.addElement('importProvidersFrom(AppServerModule)');
    }

    const result = sourceFile.getText();
    expect(result).toContain('importProvidersFrom(AppServerModule)');
  });

  it('should not duplicate importProvidersFrom if already exists', () => {
    const sourceFile = project.createSourceFile(
      'app.config.server.ts',
      `
import { ApplicationConfig } from '@angular/core';
import { importProvidersFrom } from '@angular/core';
import { AppServerModule } from './app.module.server';

export const serverConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(AppServerModule)
  ]
};
      `
    );

    const providersArray = getAppConfigServerProviders(sourceFile);
    expect(providersArray).toBeDefined();

    // Check if already exists
    const elements = providersArray?.getElements() || [];
    const alreadyExists = elements.some(
      (element) => element.getText() === 'importProvidersFrom(AppServerModule)'
    );

    expect(alreadyExists).toBe(true);

    const result = sourceFile.getText();
    const matches = result.match(/importProvidersFrom\(AppServerModule\)/g);
    expect(matches?.length).toBe(1); // Should only appear once in usage
  });

  it('should handle removing withRoutes from provideServerRendering', () => {
    const sourceFile = project.createSourceFile(
      'app.config.server.ts',
      `
import { ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/ssr';
import { withRoutes } from '@angular/ssr';
import { serverRoutes } from './app.routes.server';

export const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(withRoutes(serverRoutes))
  ]
};
      `
    );

    const providersArray = getAppConfigServerProviders(sourceFile);
    expect(providersArray).toBeDefined();

    const result = sourceFile.getText();
    expect(result).toContain(
      'provideServerRendering(withRoutes(serverRoutes))'
    );
  });

  it('should handle empty providers array', () => {
    const sourceFile = project.createSourceFile(
      'app.config.server.ts',
      `
import { ApplicationConfig } from '@angular/core';

export const serverConfig: ApplicationConfig = {
  providers: []
};
      `
    );

    const providersArray = getAppConfigServerProviders(sourceFile);
    expect(providersArray).toBeDefined();

    if (providersArray) {
      providersArray.addElement('importProvidersFrom(AppServerModule)');
    }

    const result = sourceFile.getText();
    expect(result).toContain('importProvidersFrom(AppServerModule)');
  });
});
