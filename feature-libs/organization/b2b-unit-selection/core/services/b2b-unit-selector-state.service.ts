/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { B2BUnit } from '@spartacus/core';
import { BehaviorSubject, Observable } from 'rxjs';

/**
 * 轻量级状态服务：在 B2B unit 选择 Dialog 及常驻 Company 选择器之间共享状态。
 *
 * 数据由 B2bUnitSelectionEffects 在登录后写入，组件直接订阅，无需重复调用 API。
 */
@Injectable({ providedIn: 'root' })
export class B2bUnitSelectorStateService {
  private _orgUnits$ = new BehaviorSubject<B2BUnit[]>([]);
  private _activeUnitName$ = new BehaviorSubject<string | null>(null);

  /** 当前用户被分配的所有 org units */
  readonly orgUnits$: Observable<B2BUnit[]> =
    this._orgUnits$.asObservable();

  /** 当前激活（默认）unit 的 name */
  readonly activeUnitName$: Observable<string | null> =
    this._activeUnitName$.asObservable();

  setOrgUnits(units: B2BUnit[]): void {
    this._orgUnits$.next(units);
  }

  setActiveUnit(name: string | null): void {
    this._activeUnitName$.next(name);
  }
}
