/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Directive, ElementRef, Input, Renderer2, inject } from '@angular/core';
import { FocusConfig } from './keyboard-focus.model';
import { LockFocusDirective } from './lock/lock-focus.directive';
import { KeyboardFocusService } from './services/keyboard-focus.service';

@Directive({
  selector: '[cxFocus]',
  standalone: false,
})
export class FocusDirective extends LockFocusDirective {
  protected elementRef: ElementRef;
  protected service: KeyboardFocusService;
  protected renderer: Renderer2;

  protected defaultConfig: FocusConfig = {};

  @Input('cxFocus') config: FocusConfig = {};

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {
    const elementRef = inject(ElementRef);
    const service = inject(KeyboardFocusService);
    const renderer = inject(Renderer2);

    super(elementRef, service, renderer);
  
    this.elementRef = elementRef;
    this.service = service;
    this.renderer = renderer;
  }
}
