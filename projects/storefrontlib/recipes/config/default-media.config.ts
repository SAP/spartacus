/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { MediaConfig } from '../../shared/components/media/media.config';

export const mediaConfig: MediaConfig = {
  mediaFormats: {
    mobile: { width: 400 },
    tablet: { width: 770 },
    desktop: { width: 1140 },
    widescreen: { width: 1400 },
    // product media
    cartIcon: { width: 65 },
    thumbnail: { width: 96 },
    product: { width: 284 },
    zoom: { width: 515 },
  },
  pictureElementFormats: {
    mobile: {
      mediaQueries: '(max-width: 767px)',
    },
    tablet: {
      mediaQueries: '(min-width: 768px) and (max-width: 1024px)',
    },
    desktop: {
      mediaQueries: '(min-width: 1025px) and (max-width: 1439px)',
    },
    widescreen: {
      mediaQueries: '(min-width: 1440px)',
    },
  },
  pictureFormatsOrder: ['widescreen', 'desktop', 'tablet', 'mobile'],
};
