/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { DOCUMENT } from '@angular/common';
import {
  EnvironmentProviders,
  inject,
  provideAppInitializer,
  RendererFactory2,
} from '@angular/core';
import { WindowRef } from '@spartacus/core';
import { MediaService } from '@spartacus/storefront';

export const addPreconnectLinkToCdnInSsr: EnvironmentProviders =
  provideAppInitializer(() => {
    const windowRef = inject(WindowRef);
    const rendererFactory = inject(RendererFactory2);
    const document = inject(DOCUMENT);
    const mediaService = inject(MediaService);

    if (windowRef.isBrowser()) {
      return;
    }
    const renderer = rendererFactory.createRenderer(null, null);
    const preconnect = renderer.createElement('link');
    renderer.setAttribute(preconnect, 'rel', 'preconnect');
    renderer.setAttribute(preconnect, 'href', mediaService.getBaseUrl());
    document.head.insertBefore(preconnect, document.head.firstChild);
  });
