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

/**
 * Public API surface of pickup-in-store
 */
export * from './pickup-in-store.module';
