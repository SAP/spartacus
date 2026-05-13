/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { chain, Rule } from '@angular-devkit/schematics';
import { removeZoneChangeDetectionFromMain } from './remove-zone-change-detection-from-main';
import { addZoneChangeDetectionToAppModule } from './add-zone-change-detection-to-app-module';

/**
 * Migration that moves provideZoneChangeDetection from main.ts to app.module.ts.
 * This is a two-step process:
 * 1. Remove provideZoneChangeDetection from main.ts applicationProviders
 * 2. Add provideZoneChangeDetection to app.module.ts providers
 */
export function migrate(): Rule {
  return chain([
    removeZoneChangeDetectionFromMain(),
    addZoneChangeDetectionToAppModule(),
  ]);
}
