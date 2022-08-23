/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { IconConfig, IconResourceType } from './icon.model';

export const fontawesomeIconConfig: IconConfig = {
  icon: {
    symbols: {
      SEARCH: 'fas fa-search',
      CART: 'fas fa-shopping-cart',
      INFO: 'fas fa-info-circle',
      STAR: 'fas fa-star',
      GRID: 'fas fa-th-large',
      LIST: 'fas fa-bars',
      CARET_UP: 'fas fa-angle-up',
      CARET_DOWN: 'fas fa-angle-down',
      CARET_RIGHT: 'fas fa-angle-right',
      CARET_LEFT: 'fas fa-angle-left',
      ERROR: 'fas fa-exclamation-circle',
      WARNING: 'fas fa-exclamation-triangle',
      SUCCESS: 'fas fa-check-circle',
      CLOSE: 'fas fa-times',
      VISA: 'fab fa-cc-visa',
      MASTER_CARD: 'fab fa-cc-mastercard',
      AMEX: 'fab fa-cc-amex',
      DINERS_CLUB: 'fab fa-cc-diners-club',
      CREDIT_CARD: 'fas fa-credit-card',
      COLLAPSE: 'fas fa-minus',
      EXPAND: 'fas fa-plus',
      RESET: 'fas fa-times-circle',
      CIRCLE: 'fas fa-circle',
      HEART: 'fas fa-heart',
      EMPTY_HEART: 'far fa-heart',
      FILTER: 'fas fa-filter',
      PENCIL: 'fas fa-pencil-alt',
      CLOCK: 'far fa-clock',
      TRASH: 'fas fa-trash',
      ACTIVE: 'fas fa-check',
      ON: 'fas fa-toggle-on',
      OFF: 'fas fa-toggle-off',
      LINK_OUT: 'fas fa-external-link-alt',
      SORT_DOWN: 'fas fa-sort-down',
      SORT: 'fas fa-sort',
      EXPAND_ARROWS: 'fas fa-expand',
      PDF_FILE: 'fas fa-file-pdf',
      EYE: 'fas fa-eye',
      EYE_SLASH: 'fas fa-eye-slash',
      HEADSET: 'fas fa-headset',
      ATTACHMENT: 'fas fa-paperclip',
      UPLOAD: 'fas fa-upload',
    },
    resources: [
      {
        type: IconResourceType.LINK,
        url: 'https://use.fontawesome.com/releases/v5.8.1/css/all.css',
      },
    ],
  },
};
