/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Rule,
  SchematicContext,
  Tree,
  chain,
} from '@angular-devkit/schematics';
import { updateAngularJson } from './csr-and-ssr/update-angular-json';
import { updateTsConfig } from './csr-and-ssr/update-ts-config';
import { moveAssetsToPublic } from './csr-and-ssr/move-assets-to-public';
import { moveFaviconToPublic } from './csr-and-ssr/move-favicon-to-public';
import { updateMainTs } from './csr-and-ssr/update-main-ts';
import { updateServerTs } from './ssr/update-server-ts';
import { updateAngularJsonForSsr } from './ssr/update-angular-json-for-ssr';
import { updateTsConfigApp } from './ssr/update-ts-config-app';
import { withFallbackDocsForMigrated_2211_32_To_2211_35 as withFallbackDocs } from './fallback-advice-to-follow-docs';
import { updateI18nLazyLoadingConfig } from './csr-and-ssr/update-i18n-lazy-loading-config';
import { isSsrUsed } from '../shared/utils/package-utils';

/**
 * Modernizes an application migrated from Angular v2211.32 to v2211.35
 * to align with new Angular 19 standards.
 */
export function migrate(): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    return chain([
      withFallbackDocs(updateAngularJson()),
      withFallbackDocs(updateTsConfig()),
      withFallbackDocs(moveAssetsToPublic()),
      withFallbackDocs(moveFaviconToPublic()),
      withFallbackDocs(updateMainTs()),
      withFallbackDocs(updateI18nLazyLoadingConfig()),

      ...(isSsrUsed(tree)
        ? [
            withFallbackDocs(updateServerTs()),
            withFallbackDocs(updateAngularJsonForSsr()),
            withFallbackDocs(updateTsConfigApp()),
          ]
        : []),
    ]);
  };
}
