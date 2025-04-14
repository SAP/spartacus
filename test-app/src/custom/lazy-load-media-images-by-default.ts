/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Provider } from '@angular/core';
import { provideConfig } from '@spartacus/core';
import { ImageLoadingStrategy } from '@spartacus/storefront';

export const lazyLoadMediaImagesByDefault: Provider = provideConfig({
  imageLoadingStrategy: ImageLoadingStrategy.LAZY,
});
