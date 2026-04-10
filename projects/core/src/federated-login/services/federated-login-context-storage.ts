/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import { StorageSyncType } from '../../state';
import {
  getStorage,
  persistToStorage,
  readFromStorage,
} from '../../state/utils/browser-storage';
import { WindowRef } from '../../window';
import { FederatedLoginContext } from '../model/federated-login-context.mode';

export const FEDERATED_LOGIN_STATE_KEY = 'federatedLogin';

@Injectable({ providedIn: 'root' })
export class FederatedLoginContextStorageService {
  winRef = inject(WindowRef);

  storage = getStorage(StorageSyncType.LOCAL_STORAGE, this.winRef);
  storageKey = FEDERATED_LOGIN_STATE_KEY;

  write(value: FederatedLoginContext) {
    if (this.storage) {
      persistToStorage(this.storageKey, value, this.storage);
    }
  }

  read() {
    if (this.storage) {
      return readFromStorage(
        this.storage,
        this.storageKey
      ) as FederatedLoginContext;
    }
  }
}
