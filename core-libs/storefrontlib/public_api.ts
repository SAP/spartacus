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
export * from './cms-components';
export * from './cms-pages';
export * from './cms-structure';
export * from './context';
export * from './events';
export * from './layout';
export * from './recipes';
export * from './router';
export * from './shared';
export * from './utils';

/** AUGMENTABLE_TYPES_START */
export { ICON_TYPE } from './cms-components/misc/icon';
export { BREAKPOINT } from './layout/config/layout-config';
export { LAUNCH_CALLER } from './layout/launch-dialog/config/launch-config';
/** AUGMENTABLE_TYPES_END */
