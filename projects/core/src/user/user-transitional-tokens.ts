/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Observable } from 'rxjs';
import { Title } from '../model/misc.model';

export abstract class UserProfileFacadeTransitionalToken {
  abstract getTitles(): Observable<Title[]>;
}
