/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  PDF_INVOICES_FEATURE_NAME,
  SPARTACUS_PDF_INVOICES,
  SPARTACUS_PDF_INVOICES_ASSETS,
  SPARTACUS_PDF_INVOICES_ROOT,
  SPARTACUS_REQUESTED_DELIVERY_DATE,
  USER_PROFILE_FEATURE_NAME,
} from '../libs-constants';
import { SchematicConfig } from '../utils/lib-utils';

export const PDF_INVOICES_FEATURE_NAME_CONSTANT = 'PDF_INVOICES_FEATURE';
export const PDF_INVOICES_FOLDER_NAME = 'pdf-invoices';
export const PDF_INVOICES_TRANSLATIONS = 'pdfInvoicesTranslations';
export const PDF_INVOICES_TRANSLATION_CHUNKS_CONFIG =
  'pdfInvoicesTranslationChunksConfig';
export const PDF_INVOICES_ROOT_MODULE = 'PDFInvoicesRootModule';
export const PDF_INVOICES_MODULE = 'PDFInvoicesModule';

export const PDF_INVOICES_SCSS_FILE_NAME = 'pdf-invoices.scss';

export const PDF_INVOICES_SCHEMATICS_CONFIG: SchematicConfig = {
  library: {
    featureName: PDF_INVOICES_FEATURE_NAME,
    mainScope: SPARTACUS_REQUESTED_DELIVERY_DATE,
  },
  folderName: PDF_INVOICES_FOLDER_NAME,
  moduleName: PDF_INVOICES_MODULE,
  featureModule: {
    name: PDF_INVOICES_MODULE,
    importPath: SPARTACUS_PDF_INVOICES,
  },
  rootModule: {
    name: PDF_INVOICES_ROOT_MODULE,
    importPath: SPARTACUS_PDF_INVOICES_ROOT,
  },
  styles: {
    scssFileName: PDF_INVOICES_SCSS_FILE_NAME,
    importStyle: SPARTACUS_PDF_INVOICES,
  },
  lazyLoadingChunk: {
    moduleSpecifier: SPARTACUS_PDF_INVOICES_ROOT,
    namedImports: [PDF_INVOICES_FEATURE_NAME_CONSTANT],
  },
  i18n: {
    resources: PDF_INVOICES_TRANSLATIONS,
    chunks: PDF_INVOICES_TRANSLATION_CHUNKS_CONFIG,
    importPath: SPARTACUS_PDF_INVOICES_ASSETS,
  },
  dependencyFeatures: [USER_PROFILE_FEATURE_NAME],
};
