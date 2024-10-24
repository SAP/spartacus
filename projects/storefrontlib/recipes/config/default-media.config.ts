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
  media: {
    pictureElementFormats: {
      mobile: {
        mediaQueries: '(max-width: 480px)',
      },
      tablet: {
        mediaQueries: '(min-width: 481px) and (max-width: 770px)',
      },
      desktop: {
        mediaQueries: '(min-width: 771px) and (max-width: 960px)',
      },
      widescreen: {
        mediaQueries: '(min-width: 961px)',
      },
    },
    pictureFormatsOrder: ['widescreen', 'desktop', 'tablet', 'mobile'],
  },
};
