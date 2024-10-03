/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Directive,
  ElementRef,
  AfterViewInit,
  ViewContainerRef,
  ChangeDetectorRef,
} from '@angular/core';
import { WindowRef } from '@spartacus/core';
import { FormConfig } from '../../../config/form-config';
import { PasswordVisibilityToggleComponent } from './password-visibility-toggle.component';

/**
 * Directive to bind a PasswordVisibilityToggleDirective to a password input field. This
 * toggle while alternate the appearance of the input between dots and plain text.
 */
@Directive({
  selector: '[cxPasswordVisibilitySwitch][type="password"]',
})
export class PasswordVisibilityToggleDirective implements AfterViewInit {
  protected inputWrapper: HTMLElement | null;

  constructor(
    protected winRef: WindowRef,
    protected config: FormConfig,
    protected elementRef: ElementRef,
    protected viewContainerRef: ViewContainerRef,
    protected changeDetectorRef: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    if (this.config.form?.passwordVisibilityToggle) {
      this.wrapInput();
      this.insertComponent();
      this.changeDetectorRef.detectChanges();
    }
  }

  protected insertComponent(): void {
    const component = this.viewContainerRef.createComponent(
      PasswordVisibilityToggleComponent
    );
    component.instance.inputElement = this.elementRef.nativeElement;
    this.inputWrapper?.appendChild(component.location.nativeElement);
  }

  /**
   * We need to wrap the input element in a div to be able to position the toggle button in the right place.
   */
  protected wrapInput(): void {
    const input = this.elementRef.nativeElement;
    const parent = input.parentNode;

    this.inputWrapper = this.winRef.document.createElement('div');
    this.inputWrapper.setAttribute('class', 'cx-password-input-wrapper');

    // set the wrapper as child (instead of the element)
    parent.replaceChild(this.inputWrapper, input);
    this.inputWrapper.appendChild(input);
  }
}
