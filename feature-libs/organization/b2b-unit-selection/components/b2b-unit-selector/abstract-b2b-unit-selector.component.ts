/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { computed, Directive, inject, OnInit } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { B2BUnit, UserIdService } from '@spartacus/core';
import { forkJoin, of } from 'rxjs';
import { catchError, take } from 'rxjs/operators';
import { B2bUnitSelectionConnector } from '../../core/connectors/b2b-unit-selection.connector';
import { B2bUnitSelectorStateService } from '../../core/services/b2b-unit-selector-state.service';
import { SetDefaultOrgUnit } from '../../core/store/actions/b2b-unit-selection.actions';
import { B2bUnitSelectionConfig } from '../../root/config/b2b-unit-selection.config';

/**
 * 抽象基类：封装 Company 选择器的状态与交互逻辑。
 * 子类只需提供 selector 与模板。
 *
 * 初始化时若 stateService 无数据（例如页面刷新后 effects 尚未写入），
 * 则主动调用 connector 加载，确保选择器在任何场景下都能正确显示。
 */
@Directive()
export abstract class AbstractB2bUnitSelectorComponent implements OnInit {
  protected stateService = inject(B2bUnitSelectorStateService);
  protected store = inject(Store);
  protected userIdService = inject(UserIdService);
  protected connector = inject(B2bUnitSelectionConnector);
  private config = inject(B2bUnitSelectionConfig);

  private _orgUnits = toSignal(this.stateService.orgUnits$, {
    initialValue: [] as B2BUnit[],
  });
  private _activeUnitName = toSignal(this.stateService.activeUnitName$, {
    initialValue: null as string | null,
  });

  /** 所有可选 B2B units */
  readonly items = computed(() => this._orgUnits());

  /** 仅当 unit 数量 ≥ 2 时才显示选择器 */
  readonly hasMultipleUnits = computed(() => this._orgUnits().length > 1);

  /** 有任意 unit 时显示选择器（含单 unit 禁用态） */
  readonly hasAnyUnit = computed(() => this._orgUnits().length > 0);

  /** 当前激活 unit 的 name */
  readonly activeUnitName = computed(() => this._activeUnitName());

  ngOnInit(): void {
    // feature toggle：未启用时不加载数据，组件保持空态（hasAnyUnit() = false，不渲染）
    if (!this.config.b2bUnitSelection?.enabled) {
      return;
    }
    // 页面刷新后 BehaviorSubject 为空（effects 可能尚未写入），主动补充加载一次
    this.stateService.orgUnits$.pipe(take(1)).subscribe((units) => {
      if (units.length === 0) {
        this.loadAndPopulateState();
      }
    });
  }

  /** 用户切换 unit 后调用 PUT /defaultOrgUnit，成功后跳转首页 */
  onSelect(unitName: string): void {
    this.userIdService
      .takeUserId(true)
      .pipe(take(1))
      .subscribe((userId) => {
        this.store.dispatch(
          new SetDefaultOrgUnit({ userId, unitUid: unitName, redirectToHome: true })
        );
      });
  }

  private loadAndPopulateState(): void {
    this.userIdService
      .takeUserId(true)
      .pipe(take(1))
      .subscribe((userId) => {
        forkJoin({
          orgUnits: this.connector.loadOrgUnits(userId),
          defaultUnitUid: this.connector
            .loadDefaultOrgUnitUid(userId)
            .pipe(catchError(() => of(undefined))),
        })
          .pipe(take(1))
          .subscribe(({ orgUnits, defaultUnitUid }) => {
            this.stateService.setOrgUnits(orgUnits);
            this.stateService.setActiveUnit(defaultUnitUid ?? null);
          });
      });
  }
}
