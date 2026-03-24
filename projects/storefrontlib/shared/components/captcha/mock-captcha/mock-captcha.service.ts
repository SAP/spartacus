/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { RenderParams } from '../captcha.model';
import { CaptchaService } from '../captcha.service';

@Injectable({
  providedIn: 'root',
})
export class MockCaptchaService extends CaptchaService implements OnDestroy {
  protected retVal: Subject<string>;

  protected container: HTMLDivElement;

  protected checkbox: HTMLInputElement;

  protected label: HTMLLabelElement;

  protected spinner: HTMLElement;

  protected removeCheckboxListener: () => void;

  protected createForm() {
    // creating mock elements for captcha.
    this.container = this.renderer.createElement('div');
    this.renderer.addClass(this.container, 'form-check');

    this.checkbox = this.renderer.createElement('input');
    this.renderer.setAttribute(this.checkbox, 'type', 'checkbox');
    this.renderer.addClass(this.checkbox, 'mock-captcha');

    this.label = this.renderer.createElement('label');
    this.renderer.setProperty(this.label, 'textContent', "I'm not a robot");
    this.renderer.appendChild(this.container, this.checkbox);
    this.renderer.appendChild(this.container, this.label);

    this.spinner = this.renderer.createElement('icon');
    this.renderer.addClass(this.spinner, 'fa-solid');
    this.renderer.addClass(this.spinner, 'fa-spinner');
  }

  initialize() {
    super.initialize();
    this.createForm();
    this.removeCheckboxListener = this.renderer.listen(
      this.checkbox,
      'change',
      this.onCheckBoxClicked.bind(this)
    );
  }

  onCheckBoxClicked(): void {
    this.renderer.setProperty(this.label, 'textContent', '');
    this.renderer.appendChild(this.container, this.spinner);
    this.renderer.setProperty(this.checkbox, 'disabled', true);
    this.renderer.setProperty(this.checkbox, 'checked', true);

    setTimeout(() => {
      this.renderer.removeChild(this.container, this.spinner);
      this.retVal.next('succeed');
      this.retVal.complete();
      this.token = 'myToken';
      this.renderer.setProperty(this.label, 'textContent', 'Verified');
    }, 500);
  }

  /**
   * Add element to page.
   * @param {HTMLElement} element - HTML element to render captcha widget within.
   */
  renderCaptcha(renderParams: RenderParams): Observable<string> {
    if (renderParams.element instanceof HTMLElement) {
      // Reset checkbox state before rendering
      this.renderer.setProperty(this.checkbox, 'disabled', false);
      this.renderer.setProperty(this.checkbox, 'checked', false);
      this.renderer.setProperty(this.label, 'textContent', "I'm not a robot");
      this.token = '';
      this.retVal = new Subject<string>();

      this.renderer.appendChild(renderParams.element, this.container);
    }

    return this.retVal.asObservable();
  }

  ngOnDestroy() {
    if (this.removeCheckboxListener) {
      this.removeCheckboxListener();
    }
  }
}
