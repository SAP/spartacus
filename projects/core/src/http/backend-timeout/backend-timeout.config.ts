/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpContextToken } from '@angular/common/http';
import { BackendTimeoutConfig } from '../../occ/config/backend-timeout.config';

// SPIKE TODO: rename BackendTimeoutConfig to HttpTimeoutConfig - here and in other files (backend -> http)

/**
 * Configuration for timeout of HTTP request.
 *
 * Can be different in a server and in a browser.
 *
 * When undefined, no timeout will be applied.
 */
export const BACKEND_TIMEOUT_CONFIG = new HttpContextToken<
  BackendTimeoutConfig | undefined
>(() => undefined);
