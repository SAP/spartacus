/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { FactoryProvider, ValueProvider } from '@angular/core';
import {
  BreakingChangesFlags,
  BreakingChangesFlagsChunk,
  DefaultBreakingChangesFlagsChunk,
} from './breaking-changes-flags-tokens';

export type FlagsFactory = (...props: any[]) => BreakingChangesFlags;

/**
 * Helper function to provide flags chunk using FlagsChunk token
 *
 * To provide default flags in libraries provideDefaultFlags should be used instead.
 *
 * @param flags BreakingChangesFlags object to merge with the global flags
 */
export function provideBreakingChangesFlags(
  flags: BreakingChangesFlags = {},
  defaultFlags = false
): ValueProvider {
  return {
    provide: defaultFlags
      ? DefaultBreakingChangesFlagsChunk
      : BreakingChangesFlagsChunk,
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
export function provideBreakingChangesFlagsFactory(
  flagsFactory: FlagsFactory,
  defaultFlags = false
): FactoryProvider {
  return {
    provide: defaultFlags
      ? DefaultBreakingChangesFlagsChunk
      : BreakingChangesFlagsChunk,
    useFactory: flagsFactory,
    multi: true,
  };
}

/**
 * Helper function to provide default flags chunk using DefaultBreakingChangesFlagsChunk token
 *
 * @param flags BreakingChangesFlags object to merge with the default flags
 */
export function provideDefaultBreakingChangesFlags(
  flags: BreakingChangesFlags = {}
): ValueProvider {
  return {
    provide: DefaultBreakingChangesFlagsChunk,
    useValue: flags,
    multi: true,
  };
}

/**
 * Helper function to provide default flags with factory function, using DefaultBreakingChangesFlagsChunk token
 *
 * @param flagsFactory Factory Function that will generate flags object
 * @param deps Optional dependencies to a factory function
 */
export function provideDefaultBreakingChangesFlagsFactory(
  flagsFactory: FlagsFactory
): FactoryProvider {
  return {
    provide: DefaultBreakingChangesFlagsChunk,
    useFactory: flagsFactory,
    multi: true,
  };
}
