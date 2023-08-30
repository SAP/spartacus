/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { UserCreationNotifierData } from '../model';

@Injectable({ providedIn: 'root' })
export class B2BUserCreationNotifierService {
  protected b2bUserCreatedSubject = new Subject<UserCreationNotifierData>();

  get b2bUserCreated$(): Observable<UserCreationNotifierData> {
    return this.b2bUserCreatedSubject.asObservable();
  }

  notifyAboutUser(data: UserCreationNotifierData): void {
    this.b2bUserCreatedSubject.next(data);
  }
}
