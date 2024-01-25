/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export * from './config/direction.config';
export * from './config/direction.model';
export { DirectionModule } from './direction.module'; // we don't export the factory to avoid a breaking change when we drop the initHtmlDirAttribute
export * from './direction.service';
