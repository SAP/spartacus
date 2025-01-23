/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Directive } from '@angular/core';

/**
 * Directive used for making links styled as a buttons (using .btn class)
 * act as a real buttons a11y wise (meaning making them reactive to both
 * enter and spacebar clicks).
 *
 * Note: This is done as a11y optimization for old button like link compoennts
 * and shouldn't be used other than for those. Whenever you find yourself in a need
 * to be using this consider it as a good 'code smell' for using BUttons instead of links.
 */
@Directive({
  selector: 'a[cxBtnLikeLink].btn', // 'a.btn'
  host: {
    // Adding [tabindex] allows tab-based access to this element.
    tabindex: '0',
    // Adding [role] tells screen reatders that this "link" is really a "button"
    role: 'button',
    // Add Enter keydown click mimic native Button's behaviour
    '(keydown.enter)': '$event.preventDefault() ; $event.target.click() ;',
    // Add Space keydown click mimic native Button's behaviour
    '(keydown.space)': '$event.preventDefault() ; $event.target.click() ;',
  },
  standalone: false,
})
export class BtnLikeLinkDirective {}
