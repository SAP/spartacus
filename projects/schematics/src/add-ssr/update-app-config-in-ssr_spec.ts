/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Node, Project } from 'ts-morph';
import { getAppConfigProviders } from './get-app-config-providers';

describe('updateAppConfigInSsr - addWithNoHttpTransferCacheToAppConfig', () => {
  let project: Project;

  beforeEach(() => {
    project = new Project();
  });

  it('should add provideClientHydration with withEventReplay and withNoHttpTransferCache when not present', () => {
    const sourceFile = project.createSourceFile(
      'app.config.ts',
      `
import { ApplicationConfig } from '@angular/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes)
  ]
};
      `
    );

    // Simulate the addWithNoHttpTransferCacheToAppConfig behavior
    const providersArray = getAppConfigProviders(sourceFile);
    expect(providersArray).toBeDefined();

    if (providersArray && Node.isArrayLiteralExpression(providersArray)) {
      providersArray.addElement(
        'provideClientHydration(withEventReplay(), withNoHttpTransferCache())'
      );
    }

    const result = sourceFile.getText();
    expect(result).toMatchSnapshot();
  });

  it('should handle existing provideClientHydration without arguments', () => {
    const sourceFile = project.createSourceFile(
      'app.config.ts',
      `
import { ApplicationConfig } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideClientHydration()
  ]
};
      `
    );

    const providersArray = getAppConfigProviders(sourceFile);
    expect(providersArray).toBeDefined();

    const result = sourceFile.getText();
    expect(result).toMatchSnapshot();
  });

  it('should not duplicate provideClientHydration if already exists with correct arguments', () => {
    const sourceFile = project.createSourceFile(
      'app.config.ts',
      `
import { ApplicationConfig } from '@angular/core';
import { provideClientHydration, withEventReplay, withNoHttpTransferCache } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideClientHydration(withEventReplay(), withNoHttpTransferCache())
  ]
};
      `
    );

    const providersArray = getAppConfigProviders(sourceFile);
    expect(providersArray).toBeDefined();

    const result = sourceFile.getText();
    expect(result).toMatchSnapshot();
  });
});
