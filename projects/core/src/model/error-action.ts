/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpErrorResponse } from '@angular/common/http';
import { Action } from '@ngrx/store';
import { HttpErrorModel } from './index';

export interface ErrorAction extends Action {
  error: HttpErrorResponse | HttpErrorModel | Error;
}
