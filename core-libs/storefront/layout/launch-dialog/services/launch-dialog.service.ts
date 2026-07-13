/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ComponentRef,
  ElementRef,
  inject,
  Inject,
  Injectable,
  isDevMode,
  ViewContainerRef,
} from '@angular/core';
import { LoggerService, resolveApplicable } from '@spartacus/core';
import { AutoFocusService } from '../../a11y/keyboard-focus/autofocus';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { filter, map, take, tap } from 'rxjs/operators';
import { LayoutConfig } from '../../config/layout-config';
import { LAUNCH_CALLER, LaunchOptions } from '../config/launch-config';
import { LaunchRenderStrategy } from './launch-render.strategy';

@Injectable({ providedIn: 'root' })
export class LaunchDialogService {
  private _dialogClose = new BehaviorSubject<any | undefined>(undefined);
  private _dataSubject = new BehaviorSubject<any>(undefined);

  protected logger = inject(LoggerService);
  protected autoFocusService = inject(AutoFocusService);

  get data$(): Observable<any> {
    return this._dataSubject.asObservable();
  }

  constructor(
    @Inject(LaunchRenderStrategy)
    protected renderStrategies: LaunchRenderStrategy[],
    protected layoutConfig: LayoutConfig
  ) {
    this.renderStrategies = this.renderStrategies || [];
  }

  /**
   * Open the dialog
   *
   * @param caller LAUNCH_CALLER
   * @param openElement element that triggered the dialog and will receive focus on close
   * @param vcr View Container Ref of the container for inline rendering
   * @param data optional data which could be passed to dialog
   */
  openDialog(
    caller: LAUNCH_CALLER | string,
    openElement?: ElementRef,
    vcr?: ViewContainerRef,
    data?: any
  ): Observable<any> | undefined {
    const component = this.launch(caller, vcr, data);

    if (component) {
      return combineLatest([component, this.dialogClose]).pipe(
        filter(([, close]) => close !== undefined),
        tap(([comp]) => {
          this.focusElement(openElement?.nativeElement);
          this.clear(caller);
          comp?.destroy();
        }),
        map(([comp]) => comp)
      );
    }
  }
  /**
   * Render the element based on the strategy from the launch configuration
   *
   * @param caller LAUNCH_CALLER
   * @param vcr View Container Ref of the container for inline rendering
   */
  launch(
    caller: LAUNCH_CALLER | string,
    vcr?: ViewContainerRef,
    data?: any
  ): void | Observable<ComponentRef<any> | undefined> {
    const config = this.findConfiguration(caller);
    if (config) {
      const renderer = this.getStrategy(config);

      // Render if the strategy exists
      if (renderer) {
        this._dialogClose.next(undefined);
        this._dataSubject.next(data);

        return renderer.render(config, caller, vcr);
      }
    } else if (isDevMode()) {
      this.logger.warn('No configuration provided for caller ' + caller);
    }
  }

  /**
   * Opens dialog and subscribe in the service. Should be used if the trigger component might get destroyed while the component is open.
   *
   * @param caller Launch Caller
   * @param openElement Element to open
   * @param data Data to provide to the rendered element
   */
  openDialogAndSubscribe(
    caller: LAUNCH_CALLER | string,
    openElement?: ElementRef,
    data?: any
  ): void {
    this.openDialog(caller, openElement, undefined, data)
      ?.pipe(take(1))
      .subscribe();
  }

  /**
   * Util method to remove element from rendered elements list
   *
   * @param caller LAUNCH_CALLER
   */
  clear(caller: LAUNCH_CALLER | string): void {
    const config = this.findConfiguration(caller);

    if (config) {
      const renderer = this.getStrategy(config);

      // Render if the strategy exists
      if (renderer) {
        renderer.remove(caller, config);
      }
    }
  }

  get dialogClose(): Observable<any | undefined> {
    return this._dialogClose.asObservable();
  }

  closeDialog(reason: any) {
    this._dialogClose.next(reason);
  }

  /**
   * Focuses the given element or its first focusable descendant.
   * Use when a dialog is closed without a trigger element (e.g. opened via URL fragment)
   * and focus needs to be restored manually.
   */
  protected focusElement(element: HTMLElement | undefined): void {
    if (!element) {
      return;
    }
    const target = this.autoFocusService.findFirstFocusable(element) ?? element;
    const hadTabindex = target.hasAttribute('tabindex');
    if (!hadTabindex) {
      target.setAttribute('tabindex', '-1');
    }
    target.focus();
    if (!hadTabindex) {
      target.removeAttribute('tabindex');
    }
  }

  /**
   * Returns the configuration for the caller
   *
   * @param caller LAUNCH_CALLER
   */
  protected findConfiguration(
    caller: LAUNCH_CALLER | string
  ): LaunchOptions | undefined {
    if (this.layoutConfig?.launch) {
      return this.layoutConfig.launch[caller];
    }
    return undefined;
  }

  /**
   * Returns the render strategy based on the configuration
   *
   * @param config Configuration for launch
   */
  protected getStrategy(
    config: LaunchOptions
  ): LaunchRenderStrategy | undefined {
    return resolveApplicable(this.renderStrategies, [config]);
  }
}
