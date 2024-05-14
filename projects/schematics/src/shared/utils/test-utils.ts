/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { normalize, strings, virtualFs } from '@angular-devkit/core';
import { TempScopedNodeJsSyncHost } from '@angular-devkit/core/node/testing';
import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';
import { findNodes } from '@schematics/angular/utility/ast-utils';
import ts from 'typescript';
import { findConstructor } from './file-utils';

export const appModulePath = 'src/app/app.module.ts';
export const spartacusFeaturesModulePath =
  'src/app/spartacus/spartacus-features.module.ts';

export const asmFeatureModulePath =
  'src/app/spartacus/features/asm/asm-feature.module.ts';
export const cartBaseFeatureModulePath =
  'src/app/spartacus/features/cart/cart-base-feature.module.ts';
export const cartWrapperModulePath =
  'src/app/spartacus/features/cart/cart-base-wrapper.module.ts';
export const customerTicketingFeatureModulePath =
  'src/app/spartacus/features/customer-ticketing/customer-ticketing-feature.module.ts';
export const customerTicketingWrapperModulePath =
  'src/app/spartacus/features/customer-ticketing/customer-ticketing-wrapper.module.ts';
export const estimatedDeliveryDateFeatureModulePath =
  'src/app/spartacus/features/estimated-delivery-date/estimated-delivery-date-feature.module.ts';
export const importExportFeatureModulePath =
  'src/app/spartacus/features/cart/cart-import-export-feature.module.ts';
export const quickOrderFeatureModulePath =
  'src/app/spartacus/features/cart/cart-quick-order-feature.module.ts';
export const wishListFeatureModulePath =
  'src/app/spartacus/features/cart/wish-list-feature.module.ts';
export const savedCartFeatureModulePath =
  'src/app/spartacus/features/cart/cart-saved-cart-feature.module.ts';
export const checkoutFeatureModulePath =
  'src/app/spartacus/features/checkout/checkout-feature.module.ts';
export const checkoutWrapperModulePath =
  'src/app/spartacus/features/checkout/checkout-wrapper.module.ts';
export const quoteFeatureModulePath =
  'src/app/spartacus/features/quote/quote-feature.module.ts';
export const orderFeatureModulePath =
  'src/app/spartacus/features/order/order-feature.module.ts';
export const organizationAdministrationFeatureModulePath =
  'src/app/spartacus/features/organization/organization-administration-feature.module.ts';
export const pickupInStoreFeatureModulePath =
  'src/app/spartacus/features/pickup-in-store/pickup-in-store-feature.module.ts';
export const organizationAdministrationWrapperModulePath =
  'src/app/spartacus/features/organization/administration-wrapper.module.ts';
export const organizationOrderApprovalFeatureModulePath =
  'src/app/spartacus/features/organization/organization-order-approval-feature.module.ts';
export const organizationUserRegistrationFeatureModulePath =
  'src/app/spartacus/features/organization/organization-user-registration-feature.module.ts';
export const organizationUserRegistrationWrapperModulePath =
  'src/app/spartacus/features/organization/organization-user-registration-wrapper.module.ts';
export const organizationUnitOrderFeatureModulePath =
  'src/app/spartacus/features/organization/organization-unit-order-feature.module.ts';
export const organizationAccountSummaryFeatureModulePath =
  'src/app/spartacus/features/organization/organization-account-summary-feature.module.ts';
export const pdfInvoicesFeatureModulePath =
  'src/app/spartacus/features/pdf-invoices/pdf-invoices-feature.module.ts';
export const productBulkPricingFeatureModulePath =
  'src/app/spartacus/features/product/product-bulk-pricing-feature.module.ts';
export const productImageZoomFeatureModulePath =
  'src/app/spartacus/features/product/product-image-zoom-feature.module.ts';
export const productVariantsFeatureModulePath =
  'src/app/spartacus/features/product/product-variants-feature.module.ts';
export const productFutureStockFeatureModulePath =
  'src/app/spartacus/features/product/product-future-stock-feature.module.ts';
export const productConfiguratorFeatureModulePath =
  'src/app/spartacus/features/product-configurator/product-configurator-feature.module.ts';
export const productConfiguratorRulebasedWrapperModulePath =
  'src/app/spartacus/features/product-configurator/rulebased-configurator-wrapper.module.ts';
export const qualtricsFeatureModulePath =
  'src/app/spartacus/features/qualtrics/qualtrics-feature.module.ts';
export const requestedDeliveryDateFeatureModulePath =
  'src/app/spartacus/features/requested-delivery-date/requested-delivery-date-feature.module.ts';
export const smartEditFeatureModulePath =
  'src/app/spartacus/features/smartedit/smart-edit-feature.module.ts';
export const storeFinderFeatureModulePath =
  'src/app/spartacus/features/storefinder/store-finder-feature.module.ts';
export const trackingPersonalizationFeatureModulePath =
  'src/app/spartacus/features/tracking/personalization-feature.module.ts';
export const trackingTagManagementFeatureModulePath =
  'src/app/spartacus/features/tracking/tag-management-feature.module.ts';
export const userFeatureModulePath =
  'src/app/spartacus/features/user/user-feature.module.ts';
export const userAccountWrapperModulePath =
  'src/app/spartacus/features/user/user-account-wrapper.module.ts';
export const userProfileWrapperModulePath =
  'src/app/spartacus/features/user/user-profile-wrapper.module.ts';

export const cdcFeatureModulePath =
  'src/app/spartacus/features/cdc/cdc-feature.module.ts';
export const cdpFeatureModulePath =
  'src/app/spartacus/features/cdp/cdp-feature.module.ts';
export const cdsFeatureModulePath =
  'src/app/spartacus/features/cds/cds-feature.module.ts';
export const digitalPaymentsFeatureModulePath =
  'src/app/spartacus/features/digital-payments/digital-payments-feature.module.ts';
export const epdFeatureModulePath =
  'src/app/spartacus/features/epd-visualization/epd-visualization-feature.module.ts';
export const segmentRefsFeatureModulePath =
  'src/app/spartacus/features/segment-refs/segment-refs-feature.module.ts';
export const oppsFeatureModulePath =
  'src/app/spartacus/features/opps/opps-feature.module.ts';

export function writeFile(
  host: TempScopedNodeJsSyncHost,
  filePath: string,
  contents: string
): void {
  host.sync.write(normalize(filePath), virtualFs.stringToFileBuffer(contents));
}

export function runMigration(
  appTree: UnitTestTree,
  schematicRunner: SchematicTestRunner,
  migrationScript: string,
  options = {}
): Promise<UnitTestTree> {
  return schematicRunner.runSchematic(migrationScript, options, appTree);
}

export function getConstructor(nodes: ts.Node[]): ts.Node {
  const constructorNode = findConstructor(nodes);
  if (!constructorNode) {
    throw new Error('No constructor node found');
  }
  return constructorNode;
}

export function getSuperNode(constructorNode: ts.Node): ts.Node | undefined {
  const superNodes = findNodes(constructorNode, ts.SyntaxKind.SuperKeyword);
  if (!superNodes || superNodes.length === 0) {
    return undefined;
  }
  return superNodes[0];
}

export function getParams(
  constructorNode: ts.Node,
  camelizedParamNames: string[]
): string[] {
  const superNode = getSuperNode(constructorNode);
  if (!superNode) {
    throw new Error('No super() node found');
  }

  const callExpressions = findNodes(
    constructorNode,
    ts.SyntaxKind.CallExpression
  );
  if (!callExpressions || callExpressions.length === 0) {
    throw new Error('No call expressions found in constructor');
  }
  const params = findNodes(callExpressions[0], ts.SyntaxKind.Identifier);

  camelizedParamNames = camelizedParamNames.map((param) =>
    strings.camelize(param)
  );

  return params
    .filter((n) => n.kind === ts.SyntaxKind.Identifier)
    .map((n) => n.getText())
    .filter((text) => camelizedParamNames.includes(text));
}
