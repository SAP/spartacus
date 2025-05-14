/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

// /**
//  * The `pathsMapping` array is used to define mappings for SCSS import paths.
//  * Each mapping consists of:
//  * - `key`: The original path or pattern to match in SCSS `@import` statements.
//  * - `value`: The replacement path for the matched `key`.
//  *
//  * This array is primarily used by the `regex-scss-path-replace.ts` script to process SCSS files
//  * and update their `@import` statements to use the correct paths.
//  *
//  * Example:
//  * - For `{ key: 'feature-libs', value: '@spartacus' }`:
//  *   `@import 'feature-libs/asm/styles';` becomes `@import '@spartacus/asm/styles';`.
//  * - For `{ key: 'projects/schematics/index', value: '@spartacus/schematics' }`:
//  *   `@import 'projects/schematics/index';` becomes `@import '@spartacus/schematics';`.
//  */
// export const pathsMapping = [
//   { key: 'cart/base/styles/components/cart-item-list', value: '@spartacus/cart/base/styles/components/cart-item-list' },
//   { key: 'storefrontstyles', value: '@spartacus/styles' },
//   { key: 'projects/schematics/index', value: '@spartacus/schematics' },
//   { key: 'core-libs', value: '@spartacus' },
//   { key: 'feature-libs', value: '@spartacus' },
// ];

// /**
//  * The `appendSpartacusPath` array is used to define paths that should be prefixed with `@spartacus`
//  * in SCSS `@import` statements. This is useful for paths that are not explicitly defined in `pathsMapping`
//  * but still need to be updated to use the `@spartacus` prefix.
//  *
//  * Example:
//  * - For `asm` in the array:
//  *   `@import 'asm/styles';` becomes `@import '@spartacus/asm/styles';`.
//  * - For `cart` in the array:
//  *   `@import 'cart/base/styles';` becomes `@import '@spartacus/cart/base/styles';`.
//  */
// export const appendSpartacusPath = [
//   'asm',
//   'cart',
//   'checkout',
//   'customer-ticketing',
//   'estimated-delivery-date',
//   'order',
//   'organization',
//   'pdf-invoices',
//   'pickup-in-store',
//   'product',
//   'product-configurator',
//   'product-multi-dimensional',
//   'qualtrics',
//   'quote',
//   'requested-delivery-date',
//   'smartedit',
//   'storefinder',
//   'tracking',
//   'user',
//   'cdc',
//   'cdp',
//   'cds',
//   'cpq-quote',
//   'digital-payments',
//   'epd-visualization',
//   'omf',
//   'opf',
//   'opps',
//   's4-service',
//   's4om',
//   'assets',
//   'core',
// ];
