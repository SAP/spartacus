/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { PunchoutSession, PunchoutState } from '../model/punchout.model';

@Injectable()
export class PunchoutStateService {
  protected _punchoutState?: PunchoutState;

  setPunchoutState(punchoutState: PunchoutState) {
    this._punchoutState = {
      session: { ...punchoutState.session },
      sId: punchoutState.sId,
    };
  }

  getPunchoutState(): PunchoutState {
    return {
      session: {
        ...(this._punchoutState?.session as PunchoutSession),
      },
      sId: this._punchoutState?.sId,
    };
  }
}
