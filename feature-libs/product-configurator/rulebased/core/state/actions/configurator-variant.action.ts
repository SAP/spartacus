/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ActionErrorProperty, StateUtils } from '@spartacus/core';
import { Configurator } from '../../model/configurator.model';
import { CONFIGURATOR_DATA } from '../configurator-state';

export const SEARCH_VARIANTS = '[Configurator] Search Variants';
export const SEARCH_VARIANTS_FAIL = '[Configurator]  Search Variants fail';
export const SEARCH_VARIANTS_SUCCESS = '[Configurator] Search Variants success';

export class SearchVariants extends StateUtils.EntityLoadAction {
  readonly type = SEARCH_VARIANTS;
  constructor(public payload: Configurator.Configuration) {
    super(CONFIGURATOR_DATA, payload.owner.key);
  }
}

export class SearchVariantsFail extends StateUtils.EntityFailAction {
  readonly type = SEARCH_VARIANTS_FAIL;
  /**
   * @deprecated Please use the `error` parameter with a non-null, non-undefined value.
   *             Support for `null` or `undefined` will be removed in future versions,
   *             along with the feature toggle `ssrStrictErrorHandlingForHttpAndNgrx`.
   */
  constructor(payload: { ownerKey: string; error: null | undefined });
  constructor(
    // eslint-disable-next-line @typescript-eslint/unified-signatures -- needed to deprecate only the old constructor
    payload: {
      ownerKey: string;
      error: ActionErrorProperty;
    }
  );
  constructor(public payload: { ownerKey: string; error: any }) {
    super(CONFIGURATOR_DATA, payload.ownerKey, payload.error);
  }
}

export class SearchVariantsSuccess extends StateUtils.EntitySuccessAction {
  readonly type = SEARCH_VARIANTS_SUCCESS;
  constructor(
    public payload: { ownerKey: string; variants: Configurator.Variant[] }
  ) {
    super(CONFIGURATOR_DATA, payload.ownerKey);
  }
}

export type ConfiguratorVariantAction =
  | SearchVariants
  | SearchVariantsFail
  | SearchVariantsSuccess;
