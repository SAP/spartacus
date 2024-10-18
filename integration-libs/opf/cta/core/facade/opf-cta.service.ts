/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Command, CommandService } from '@spartacus/core';
import {
  CtaScriptsRequest,
  CtaScriptsResponse,
  OpfCtaFacade,
} from '@spartacus/opf/cta/root';
import { Observable, Subject } from 'rxjs';
import { OpfCtaConnector } from '../connectors';

@Injectable()
export class OpfCtaService implements OpfCtaFacade {
  protected _readyForScriptEvent: Subject<string> = new Subject();
  readyForScriptEvent$: Observable<string> =
    this._readyForScriptEvent.asObservable();

  protected ctaScriptsCommand: Command<
    {
      ctaScriptsRequest: CtaScriptsRequest;
    },
    CtaScriptsResponse
  > = this.commandService.create((payload) => {
    return this.opfCtaConnector.getCtaScripts(payload.ctaScriptsRequest);
  });

  constructor(
    protected commandService: CommandService,
    protected opfCtaConnector: OpfCtaConnector
  ) {}

  getCtaScripts(ctaScriptsRequest: CtaScriptsRequest) {
    return this.ctaScriptsCommand.execute({ ctaScriptsRequest });
  }
  emitScriptReadyEvent(scriptIdentifier: string) {
    this._readyForScriptEvent.next(scriptIdentifier);
  }

  listenScriptReadyEvent(): Observable<string> {
    return this.readyForScriptEvent$;
  }
}
