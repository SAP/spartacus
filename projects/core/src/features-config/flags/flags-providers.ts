/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { FactoryProvider, ValueProvider } from '@angular/core';
import { DefaultFlagsChunk, Flags, FlagsChunk } from './flags-tokens';

export type FlagsFactory = (...props: any[]) => Config;

/**
 * Helper function to provide flags chunk using FlagsChunk token
 *
 * To provide default flags in libraries provideDefaultFlags should be used instead.
 *
 * @param flags Flags object to merge with the global flags
 */
export function provideFlags(
  flags: Flags = {},
  defaultFlags = false
): ValueProvider {
  return {
    provide: defaultFlags ? DefaultFlagsChunk : FlagsChunk,
    useValue: flags,
    multi: true,
  };
}

/**
 * Helper function to provide flags with factory function, using FlagsChunk token
 *
 * To provide default flags in libraries provideDefaultFlagsFactory should be used instead.
 *
 * @param flagsFactory Factory Function that will generate flags object
 * @param deps Optional dependencies to a factory function
 */
export function provideFlagsFactory(
  flagsFactory: FlagsFactory,
  defaultFlags = false
): FactoryProvider {
  return {
    provide: defaultFlags ? DefaultFlagsChunk : FlagsChunk,
    useFactory: flagsFactory,
    multi: true,
  };
}

/**
 * Helper function to provide default flags chunk using DefaultFlagsChunk token
 *
 * @param flags Flags object to merge with the default flags
 */
export function provideDefaultFlags(flags: Flags = {}): ValueProvider {
  return {
    provide: DefaultFlagsChunk,
    useValue: flags,
    multi: true,
  };
}

/**
 * Helper function to provide default flags with factory function, using DefaultFlagsChunk token
 *
 * @param flagsFactory Factory Function that will generate flags object
 * @param deps Optional dependencies to a factory function
 */
export function provideDefaultFlagsFactory(
  flagsFactory: FlagsFactory
): FactoryProvider {
  return {
    provide: DefaultFlagsChunk,
    useFactory: flagsFactory,
    multi: true,
  };
}
