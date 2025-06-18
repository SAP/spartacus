/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Rule, Tree, chain } from '@angular-devkit/schematics';

import { updateAngularJsonForApplicationBuilder } from './csr-and-ssr/update-angular-json-for-application-builder';
import { updateTsConfig } from './csr-and-ssr/update-ts-config';
import { updateAngularJsonForSsr } from './ssr/update-angular-json-for-ssr';
import { updateTsConfigApp } from './ssr/update-ts-config-app';
import { renameAppServerModule } from './ssr/rename-app-server-module';
import { updateMainServerTs } from './ssr/update-main-server-ts';
import { updateServerTs } from './ssr/update-server-ts';
import { updateAppModule } from './csr-and-ssr/update-app-module';
import { updatePackageJsonServerScripts } from './ssr/update-package-json-server-scripts';
import { removeTsConfigServer } from './ssr/remove-ts-config-server';
import { withFallbackDocsForMigrated_6_8_To_2211_19 as withFallbackDocs } from './fallback-advice-to-follow-docs';
import { updateAppModuleForSsr } from './ssr/update-app-module-for-ssr';
import { isUsingLegacyServerBuilder } from '../shared/utils/package-utils';

/**
 * Modernizes an application to use new Angular v17 standards.
 */
export function migrate(): Rule {
  return (tree: Tree) => {
    return chain([
      withFallbackDocs(updateAngularJsonForApplicationBuilder()),
      withFallbackDocs(updateTsConfig()),
      withFallbackDocs(updateAppModule()),

      // Only for SSR with legacy configuration (not using Application Builder):
      ...(isUsingLegacyServerBuilder(tree)
        ? [
            withFallbackDocs(updateAngularJsonForSsr()),
            withFallbackDocs(updatePackageJsonServerScripts()),
            withFallbackDocs(updateTsConfigApp()),
            withFallbackDocs(removeTsConfigServer()),
            withFallbackDocs(renameAppServerModule()),
            withFallbackDocs(updateMainServerTs()),
            withFallbackDocs(updateServerTs()),
            withFallbackDocs(updateAppModuleForSsr()),
          ]
        : []),
    ]);
  };
}
