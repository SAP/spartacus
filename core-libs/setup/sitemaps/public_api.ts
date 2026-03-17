/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

// Configuration (Spartacus Config pattern)
export * from './config/index';

// Models (interfaces, abstract classes, tokens)
export * from './model/sitemap.model';
export * from './model/sitemap-url-provider';

// Default URL providers
export * from './providers/routes-sitemap-provider';
export * from './providers/product-sitemap-provider';

// SSR-Bridge (Angular generates sitemaps, Express serves them)
export * from './ssr-bridge/index';

// Express middleware (serving only)
export * from './express/index';
