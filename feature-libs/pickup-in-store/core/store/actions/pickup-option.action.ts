/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { createAction, props } from '@ngrx/store';
import { PickupOption } from 'feature-libs/pickup-in-store/root';

const SET_PICKUP_OPTION = '[PickupOption] Set Pickup Option';
const SET_PAGE_CONTEXT = '[PickupOption] Set Page Context';

export const SetPickupOption = createAction(
  SET_PICKUP_OPTION,
  props<{ payload: { entryNumber: number; pickupOption: PickupOption } }>()
);
export const SetPageContext = createAction(
  SET_PAGE_CONTEXT,
  props<{ payload: { pageContext: string } }>()
);
