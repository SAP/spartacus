/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Triple-slash reference directive to include global type augmentations.
 * This ensures that Angular's compiler loads the type declarations
 * during the build process, enabling proper type checking for @HostListener decorators
 * with platform event syntax (e.g., 'keydown.Escape', 'keydown.ArrowUp').
 * for more about triple-slash directives, see: https://www.typescriptlang.org/docs/handbook/triple-slash-directives.html
 */
/// <reference path="../../types.d.ts" />

/*
 * Public API Surface of storefrontlib
 */

export * from './base-storefront.module';
export * from './cms-components/index';
export * from './cms-pages/index';
export * from './cms-structure/index';
export * from './context/index';
export * from './events/index';
export * from './layout/index';
export * from './recipes/index';
export * from './router/index';
export * from './shared/index';
export * from './utils/index';

/** AUGMENTABLE_TYPES_START */
export { ICON_TYPE } from './cms-components/misc/icon';
export { BREAKPOINT } from './layout/config/layout-config';
export { LAUNCH_CALLER } from './layout/launch-dialog/config/launch-config';
/** AUGMENTABLE_TYPES_END */
