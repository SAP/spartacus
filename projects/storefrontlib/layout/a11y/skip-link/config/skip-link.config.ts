/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Config } from '@commerce-storefront-toolset/core';

@Injectable({
  providedIn: 'root',
  useExisting: Config,
})
export abstract class SkipLinkConfig {
  skipLinks?: SkipLink[];
}

export abstract class SkipLink {
  key: string;
  i18nKey: string;
  target?: HTMLElement;
  position?: SkipLinkScrollPosition;
}

export enum SkipLinkScrollPosition {
  BEFORE = 'BEFORE',
  AFTER = 'AFTER',
}

declare module '@commerce-storefront-toolset/core' {
  interface Config extends SkipLinkConfig {}
}
