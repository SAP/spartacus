import {BehaviorSubject, Observable} from "rxjs";

export class ApplePayConfigState {
  availableChange: Observable<boolean>;
  configuredChange: Observable<boolean>;

  private _available = false;
  private _configured = false;

  private availableChangeSubject = new BehaviorSubject<boolean>(this.available);
  private configuredChangeSubject = new BehaviorSubject<boolean>(this.configured);

  private flags = {
    applePayAvailable: false,
    canMakePaymentsWithActiveCard: false
  }

  get available(): boolean {
    return this._available;
  }

  private setAvailable(newValue: boolean): void {
    if (newValue !== this._available) {
      this._available = newValue;
      this.availableChangeSubject.next(newValue);
    }
  }

  get configured(): boolean {
    return this._configured;
  }

  private setConfigured(newValue: boolean): void {
    if (newValue !== this._configured) {
      this._configured = newValue;
      this.configuredChangeSubject.next(newValue);
    }
  }

  constructor() {
    this.availableChange = this.availableChangeSubject.asObservable();
    this.configuredChange = this.configuredChangeSubject.asObservable();
  }

  applePayAvailable(status: boolean): void {
    this.flags.applePayAvailable = status;
    this.recalculate();
  }

  canMakePaymentsWithActiveCard(status: boolean): void {
    this.flags.canMakePaymentsWithActiveCard = status;
    this.recalculate();
  }

  private isAvailable(): boolean {
    return this.flags.applePayAvailable;
  }

  private isConfigured(): boolean {
    return this.flags.canMakePaymentsWithActiveCard;
  }

  private recalculate(): void {
    this.setAvailable(this.isAvailable());
    this.setConfigured(this.isConfigured());
  }

}
