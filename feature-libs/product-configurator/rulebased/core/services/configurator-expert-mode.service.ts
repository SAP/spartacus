/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

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
  private _expModeRequested: Observable<boolean> = new ReplaySubject<boolean>(
    1
  );
  private _expModeActive: Observable<boolean> = new ReplaySubject<boolean>(1);

  /**
   * Sets requested expert mode.
   *
   * @param expMode
   */
  public setExpModeRequested(expMode: boolean): void {
    (this._expModeRequested as ReplaySubject<boolean>).next(expMode);
  }

  /**
   * This function provides the requested expert mode the OCC calls should use, depending
   * on whether there is an active storefront session or not.
   */
  public getExpModeRequested(): Observable<boolean> {
    return this._expModeRequested;
  }

  /**
   * Sets requested expert mode.
   *
   * @param expMode
   */
  public setExpModeActive(expMode: boolean): void {
    (this._expModeActive as ReplaySubject<boolean>).next(expMode);
  }

  /**
   * This function provides the requested expert mode the OCC calls should use, depending
   * on whether there is an active storefront session or not.
   */
  public getExpModeActive(): Observable<boolean> {
    return this._expModeActive;
  }
}
