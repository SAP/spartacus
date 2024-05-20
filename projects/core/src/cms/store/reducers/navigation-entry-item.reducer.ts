/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NodeItem } from '../../model/node-item.model';
import { CmsActions } from '../actions/index';

export const initialState: NodeItem | undefined = undefined;

export function reducer(
  state = initialState,
  action: CmsActions.CmsNavigationEntryItemAction
): NodeItem | undefined {
  switch (action.type) {
    case CmsActions.LOAD_CMS_NAVIGATION_ITEMS_SUCCESS: {
      if (action.payload.components.length) {
        const components = action.payload.components;
        const newItem: NodeItem = components.reduce(
          (compItems: { [uid_type: string]: any }, component: any) => {
            return {
              ...compItems,
              [`${component.uid}_AbstractCMSComponent`]: component,
            };
          },
          {}
        );

        return {
          ...state,
          ...newItem,
        };
      }
    }
  }

  return state;
}
