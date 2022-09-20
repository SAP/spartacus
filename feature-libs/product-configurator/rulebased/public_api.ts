/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * Public API Surface of the rule based configurator
 */

export * from './components/index';
export * from './core/index';
export * from './occ/index';
export * from './rulebased-configurator.module';

/** AUGMENTABLE_TYPES_START */
export { Configurator } from './core/model/configurator.model';
/** AUGMENTABLE_TYPES_END */
