/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
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
   * for keyboard events with Angular's event syntax (e.g., 'keydown.ArrowUp').
   *
   * Angular transforms event names with modifiers (like 'keydown.Escape') into
   * custom event names that need to be typed correctly when typeCheckHostBindings
   * is enabled in the Angular compiler options.
   */
  interface GlobalEventHandlersEventMap {
    'keydown.ArrowUp': KeyboardEvent;
    'keydown.ArrowDown': KeyboardEvent;
    'keydown.ArrowRight': KeyboardEvent;
    'keydown.ArrowLeft': KeyboardEvent;
    'keydown.Escape': KeyboardEvent;
    'keydown.Enter': KeyboardEvent;
    'keydown.Tab': KeyboardEvent;
    'keydown.Space': KeyboardEvent;
  }
}

export {};
