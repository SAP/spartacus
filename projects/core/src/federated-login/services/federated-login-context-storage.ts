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
import { FederatedLoginContext } from '../model';

export const FEDERATED_LOGIN_STATE_KEY = 'federatedLogin';

@Injectable({ providedIn: 'root' })
export class FederatedLoginContextStorageService {
  winRef = inject(WindowRef);

  storage = getStorage(StorageSyncType.LOCAL_STORAGE, this.winRef);
  storageKey = FEDERATED_LOGIN_STATE_KEY;

  read() {
    if (this.storage) {
      return readFromStorage<FederatedLoginContext>(
        this.storage,
        this.storageKey
      );
    }
    return undefined;
  }

  write(value: FederatedLoginContext) {
    if (this.storage) {
      persistToStorage(this.storageKey, value, this.storage);
    }
  }
}
