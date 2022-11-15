/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpContextToken } from '@angular/common/http';
import { HttpTimeoutConfig } from '../../occ/config/http-timeout.config';

/**
 * Configuration for timeout of HTTP request.
 *
 * Allows for configuring different timeout time per platform (in server vs. in browser).
 *
 * When undefined, no timeout will be applied.
 */
export const HTTP_TIMEOUT_CONFIG = new HttpContextToken<
  HttpTimeoutConfig | undefined
>(() => undefined);
