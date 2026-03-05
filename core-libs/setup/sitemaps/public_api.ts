/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

// Configuration
export * from './config/index';

// Angular services (use SemanticPathService internally)
export * from './angular/index';

// Express middleware
export * from './express/index';

// SSR-Bridge (connects Angular config to Express)
export * from './ssr-bridge/index';

// URL transformation utilities
export * from './utils/route-utils';

// Legacy Node.js services (for backward compatibility)
export * from './services/index';
export * from './providers/index';
// export * from './generator/index';

