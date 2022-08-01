import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

/**
 * This implementation is OCC specific.
 * Different backend might have completely different need regarding expert mode.
 * To implement custom solution provide your own implementation and customize services that use ConfiguratorExpertModeService
 */
@Injectable({
  providedIn: 'root',
})
export class ConfiguratorExpertModeService {
  private _expMode: Observable<boolean> = new ReplaySubject<boolean>(1);

  /**
   * Sets current expert mode.
   *
   * @param expMode
   */
  public setExpMode(expMode: boolean): void {
    (this._expMode as ReplaySubject<boolean>).next(expMode);
  }

  /**
   * This function provides the expert mode the OCC calls should use, depending
   * on whether there is an active storefront session or not.
   */
  public getExpMode(): Observable<boolean> {
    return this._expMode;
  }
}
