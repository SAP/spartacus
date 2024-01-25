/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, Optional } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserIdService } from '../../auth/user-auth/facade/user-id.service';
import { Title } from '../../model/misc.model';
import { StateWithProcess } from '../../process/store/process-state';
import { StateWithUser } from '../store/user-state';
import { UserProfileFacadeTransitionalToken } from '../user-transitional-tokens';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(
    protected store: Store<StateWithUser | StateWithProcess<void>>,
    protected userIdService: UserIdService,
    // TODO: Remove transitional tokens in 4.0 with #11607
    @Optional()
    protected userProfileFacade?: UserProfileFacadeTransitionalToken
  ) {}

  /**
   * Returns titles.
   *
   * @deprecated since 3.2, use `UserProfileFacade.getTitles()` from `@spartacus/user` package.
   * We can remove it completely once we move the user-address feature to the User lib.
   */
  getTitles(): Observable<Title[]> {
    if (this.userProfileFacade) {
      return this.userProfileFacade.getTitles();
    }
    throw Error(
      'Cannot get a titles. Install `@spartacus/user` library which provides required services.'
    );
  }
}
