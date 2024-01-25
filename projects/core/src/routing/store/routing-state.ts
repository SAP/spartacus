/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Params } from '@angular/router';
import * as fromNgrxRouter from '@ngrx/router-store';
import { PageContext } from '../models/page-context.model';

export const ROUTING_FEATURE = 'router';

export interface RouterState
  extends fromNgrxRouter.RouterReducerState<ActivatedRouterStateSnapshot> {
  nextState?: ActivatedRouterStateSnapshot;
}

export interface ActivatedRouterStateSnapshot {
  url: string;
  queryParams: Params;
  params: Params;
  context: PageContext;
  cmsRequired: boolean;
  semanticRoute?: string;
}

export interface State {
  [ROUTING_FEATURE]: RouterState;
}
