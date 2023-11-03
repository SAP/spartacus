import {Inject, Injectable} from "@angular/core";
import {APPLE_PAY_SESSION} from "../apple-pay-session.token";
import {Observable, of} from "rxjs";
import {fromPromise} from "rxjs/internal-compatibility";

@Injectable()
export class ApplePaySessionFactory {

  canMake = false;

  constructor(@Inject(APPLE_PAY_SESSION) public applePaySession: typeof ApplePaySession) {
    try {
      if (this.applePaySession) {
        this.canMake = this.applePaySession.canMakePayments();
      }
    } catch (err) {}
  }

  get STATUS_SUCCESS(): number {
    return this.canMake ? this.applePaySession.STATUS_SUCCESS : 1;
  }

  get STATUS_FAILURE(): number {
    return this.canMake ? this.applePaySession.STATUS_FAILURE : 1;
  }

  supportsVersion(version: number): boolean {
    try {
      return this.canMake && this.applePaySession.supportsVersion(version);
    } catch (err) {
      return false;
    }
  }

  canMakePayments(): boolean {
    try {
      return this.canMake && this.applePaySession.canMakePayments();
    } catch (err) {
      return false;
    }
  }

  canMakePaymentsWithActiveCard(merchantId: string): Observable<boolean> {
    if (this.canMake) {
      return fromPromise(this.applePaySession.canMakePaymentsWithActiveCard(merchantId));
    } else {
      return of(false);
    }
  }

  make(version: number, paymentRequest: ApplePayJS.ApplePayPaymentRequest): ApplePaySession | undefined {
    return this.canMake ? new this.applePaySession(version, paymentRequest) : undefined;
  }
}
