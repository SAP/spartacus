import { inject, Injectable, NgZone } from '@angular/core';
import { WindowRef } from '@spartacus/core';
import { GlobalFunctionsDomain } from '@spartacus/opf/global-functions/root';
import { GlobalOpfPaymentMethods } from '@spartacus/opf/payment/root';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class OpfCtaGlobalFunctionsService {
  protected winRef = inject(WindowRef);
  protected ngZone = inject(NgZone);

  protected _readyForScriptEvent: Subject<string> = new Subject();

  readyForScriptEvent$: Observable<string> =
    this._readyForScriptEvent.asObservable();

  protected registerCtaScriptReady(domain: GlobalFunctionsDomain): void {
    this.getGlobalFunctionContainer(domain).scriptReady = (
      scriptIdentifier: string
    ): void => {
      this.ngZone.run(() => {
        this.emitScriptReadyEvent(scriptIdentifier);
      });
    };
  }

  protected getGlobalFunctionContainer(
    domain: GlobalFunctionsDomain
  ): GlobalOpfPaymentMethods {
    const window = this.winRef.nativeWindow as any;
    if (!window.Opf?.payments[domain]) {
      window.Opf = window?.Opf ?? {};
      window.Opf.payments = {};
      window.Opf.payments[domain] = {};
    }
    return window.Opf.payments[domain];
  }

  protected emitScriptReadyEvent(scriptIdentifier: string) {
    this._readyForScriptEvent.next(scriptIdentifier);
  }
}
