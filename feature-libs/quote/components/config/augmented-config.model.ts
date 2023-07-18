/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { QuoteUIConfig } from './quote-ui.config';

declare module '@spartacus/core' {
  interface Config extends QuoteUIConfig {}
}
