/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { CaptchaService } from '../captcha.service';
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
export class MockCaptchaService extends CaptchaService {
  protected retVal = new Subject<string>();

  protected container: HTMLDivElement;

  protected checkbox: HTMLInputElement;

  protected label: HTMLLabelElement;

  protected spinner: HTMLElement;

  initialize() {
    super.initialize();
    // creating mock elements for captcha.
    this.container = document.createElement('div');
    this.container.className = 'form-check';

    this.checkbox = document.createElement('input');
    this.checkbox.type = 'checkbox';
    this.checkbox.className = 'mock-captcha';

    this.label = document.createElement('label');
    this.label.textContent = "I'm not a robot";
    this.container.appendChild(this.checkbox);
    this.container.appendChild(this.label);

    this.spinner = document.createElement('icon');
    this.spinner.className = 'fa-solid fa-spinner';

    this.checkbox.addEventListener('change', this.onCheckBoxClicked.bind(this));
  }

  onCheckBoxClicked(): void {
    this.label.textContent = '';
    this.container.appendChild(this.spinner);
    this.checkbox.disabled = true;

    setTimeout(() => {
      this.container.removeChild(this.spinner);
      this.retVal.next('succeed');
      this.retVal.complete();
      this.token = 'my token';
      this.label.textContent = 'Verified';
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
