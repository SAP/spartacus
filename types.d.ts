/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Global type augmentations for the Spartacus project.
 * This file contains TypeScript declarations that extend global interfaces
 * to support event handling patterns across all libraries.
 * Required due to known issue with type check for event bindings in Angular compiler.
 * For more, see:
 * https://github.com/angular/angular/issues/63170
 * https://github.com/angular/angular/issues/40778
 */

declare global {
  /**
   * Extends the GlobalEventHandlersEventMap to include Angular-specific event names
   * that are used in @HostListener decorators. This ensures proper type checking
   * for keyboard events when typeCheckHostBindings is enabled in the Angular compiler options.
   */
  interface GlobalEventHandlersEventMap {
    [k: `keydown.${string}`]: GlobalEventHandlersEventMap['keydown'];
  }
}

export {};
