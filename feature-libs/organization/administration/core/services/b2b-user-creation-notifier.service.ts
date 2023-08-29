/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { B2BUser } from '@spartacus/core';
import { Observable, Subject } from 'rxjs';
import { LoadStatus } from '../model';

interface UserCreationNotificationData {
  status: LoadStatus;
  item: B2BUser | undefined;
}

@Injectable({ providedIn: 'root' })
export class B2BUserCreationNotifierService {
  protected b2bUserCreatedSubject = new Subject<UserCreationNotificationData>();

  get b2bUserCreated$(): Observable<UserCreationNotificationData> {
    return this.b2bUserCreatedSubject.asObservable();
  }

  notifyAboutUser(data: UserCreationNotificationData): void {
    this.b2bUserCreatedSubject.next(data);
  }
}
