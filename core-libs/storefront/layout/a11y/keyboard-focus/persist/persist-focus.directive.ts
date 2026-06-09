/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  OnInit,
  inject,
} from '@angular/core';
import { FeatureConfigService } from '@spartacus/core';
import { BlockFocusDirective } from '../block/block-focus.directive';
import { FOCUS_ATTR, PersistFocusConfig } from '../keyboard-focus.model';
import { PersistFocusService } from './persist-focus.service';

/**
 * Directive that provides persistence of the focused state. This is useful
 * when a group of focusable elements got refocused or even recreated. That
 * happens often when the DOM is constructed with an `*ngIf` or `*ngFor`.
 *
 * The focus state is based on a configured _key_, which can be passed in the
 * config input, either by using a string primitive or `PersistFocusConfig.key`:
 *
 * ```html
 * <button cxPersistFocus="myKey"></button>
 * <button cxFocus="myKey"></button>
 * <button [cxFocus]="{{key:'myKey'}"></button>
 * ```
 *
 * The focus state can be part of a focus _group_, so that the state is shared
 * and remember for the given group. In order to detect the persistence for a
 * given element, we store the persistence key as a data attribute (`data-cx-focus`):
 *
 * ```html
 * <button data-cx-focus="myKey"></button>
 * ```
 *
 * Other keyboard focus directives can read the key to understand whether the element
 * should retrieve focus.
 *
 */
@Directive() // selector: '[cxPersistFocus]',
export class PersistFocusDirective
  extends BlockFocusDirective
  implements OnInit, AfterViewInit
{
  protected defaultConfig: PersistFocusConfig = {};

  private persistFeatureConfigService = inject(FeatureConfigService);

  /**
   * The persistence key can be passed directly or through the `FocusConfig.key`.
   * While this could be considered a global key, the likeliness of conflicts
   * is very small since the key is cleared when the focus is changed.
   */
  // @Input('cxPersistFocus')
  protected config: PersistFocusConfig = {};

  /**
   * The persistence key is maintained in an element attribute for other
   * implementations. This is needed to ensure that we can resolve the focus
   * state in case of a repaint.
   */
  @HostBinding(`attr.${FOCUS_ATTR}`) attr: string | undefined;

  @HostListener('focus', ['$event'])
  handleFocus(event?: FocusEvent) {
    this.service.set(this.key, this.group);

    event?.preventDefault();
    event?.stopPropagation();
  }

  constructor(
    protected elementRef: ElementRef,
    protected service: PersistFocusService
  ) {
    super(elementRef, service);
  }

  ngOnInit() {
    super.ngOnInit();
    this.attr = this.key ? this.key : undefined;
  }

  protected setDefaultConfiguration() {
    if (typeof this.config === 'string' && this.config !== '') {
      this.config = { key: this.config };
    }
    super.setDefaultConfiguration();
  }

  /**
   * Focus the element explicitly if it was focused before.
   *
   * When `PersistFocusConfig.focusTargetSelector` is provided and matches a
   * descendant of the host, that descendant receives focus instead of the
   * host. This supports wrapper components (e.g. `<ng-select>`) where the
   * actual interactive element lives inside the host.
   *
   * When `PersistFocusConfig.clearOnRestore` is `true`, the persisted key is
   * cleared after restoration so the state cannot leak to a fresh instance of
   * the same key on a different route.
   */
  ngAfterViewInit() {
    if (!this.isPersisted) {
      return;
    }

    if (
      this.persistFeatureConfigService.isEnabled('a11yRestoreFocusOnNgSelect')
    ) {
      this.focusTarget.focus({ preventScroll: true });
      if (this.config?.clearOnRestore) {
        this.service.clear(this.group ?? undefined);
      }
    } else {
      this.host.focus({ preventScroll: true });
    }
  }

  protected get focusTarget(): HTMLElement {
    const selector = this.config?.focusTargetSelector;
    const inner = selector
      ? this.host.querySelector<HTMLElement>(selector)
      : null;
    return inner ?? this.host;
  }

  protected get isPersisted(): boolean {
    return !!this.key && this.service.get(this.group) === this.key;
  }

  /**
   * Returns the key for the host element, which is used to persist the
   * focus state. This is useful in cases where the DOM is rebuild.
   */
  protected get key(): string | undefined {
    return (this.config as PersistFocusConfig)?.key;
  }

  /**
   * returns the persistence group (if any) for the focusable elements.
   */
  protected get group(): string | null | undefined {
    return this.service.getPersistenceGroup(
      this.host,
      this.config as PersistFocusConfig
    );
  }
}
