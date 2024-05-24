/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';

import {
  Observable,
  Subject,
} from 'rxjs';
import { RecaptchaService } from '../recaptcha.service';
import { RenderParams } from '../captcha.model';

/**
 * Global function to be passes as "onload" url param for captcha <script>, to be
 * triggered once script and dependencies are loaded
 */
declare global {
  interface Window {
    onCaptchaLoad: () => void;
  }
}

@Injectable({
  providedIn: 'root',
})
export class MockRecaptchaService extends RecaptchaService {

  protected retVal = new Subject<string>();

  protected container: HTMLDivElement;

  protected checkbox: HTMLInputElement;

  protected label: HTMLLabelElement;

  initialize() {
    super.initialize();
    // creating mock elements for captcha.
    this.container = document.createElement('div');
    this.container.className = 'form-check';

    this.checkbox = document.createElement('input');
    this.checkbox.type = 'checkbox';

    this.label = document.createElement('label');
    this.label.textContent = "I'm not a robot";
    this.container.appendChild(this.checkbox);
    this.container.appendChild(this.label);

    this.checkbox.addEventListener('change', this.onCheckBoxClicked.bind(this));
  }

  onCheckBoxClicked() {
    let succeed = Math.random() > 0.8;
    setTimeout(() => {
      if (succeed) {
        this.retVal.next('succeed');
        this.retVal.complete();
        this.token = 'my token';
        this.checkbox.disabled = true;
        this.label.textContent = "Verified";

      } else {
        this.retVal.error('can not fetch token ');
        this.label.textContent = "Can not verified";
        this.checkbox.checked = false;
      }
    }, 500);
  }

  /**
   * Add element to page.
   * @param {HTMLElement} element - HTML element to render captcha widget within.
   */
  renderCaptcha(renderParams: RenderParams): Observable<string> {
    if (renderParams.element instanceof HTMLElement) {
      renderParams.element.appendChild(this.container);
    }

    return this.retVal.asObservable();
  }
}
