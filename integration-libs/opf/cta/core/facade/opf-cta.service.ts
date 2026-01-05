/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { Command, CommandService } from '@spartacus/core';
import {
  OpfCtaFacade,
  OpfCtaScriptsRequest,
  OpfCtaScriptsResponse,
} from '@spartacus/opf/cta/root';
import { Observable, Subject } from 'rxjs';
import { OpfCtaConnector } from '../connectors';

@Injectable()
export class OpfCtaService implements OpfCtaFacade {
  protected commandService = inject(CommandService);
  protected opfCtaConnector = inject(OpfCtaConnector);

  protected _readyForScriptEvent: Subject<string> = new Subject();
  readyForScriptEvent$: Observable<string> =
    this._readyForScriptEvent.asObservable();

  protected ctaScriptsCommand: Command<
    {
      opfCtaScriptsRequest: OpfCtaScriptsRequest;
    },
    OpfCtaScriptsResponse
  > = this.commandService.create((payload) => {
    return this.opfCtaConnector.getCtaScripts(payload.opfCtaScriptsRequest);
  });

  getCtaScripts(opfCtaScriptsRequest: OpfCtaScriptsRequest) {
    return this.ctaScriptsCommand.execute({ opfCtaScriptsRequest });
  }
  emitScriptReadyEvent(scriptIdentifier: string) {
    this._readyForScriptEvent.next(scriptIdentifier);
  }

  listenScriptReadyEvent(): Observable<string> {
    return this.readyForScriptEvent$;
  }
}
