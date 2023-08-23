/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ExpressServerLogger, ExpressServerLoggerContext } from '../loggers';

export interface ExpressLogTransformer {
  transform(
    message: string,
    context: ExpressServerLoggerContext,
    logger?: ExpressServerLogger
  ): [string, ExpressServerLoggerContext];
}
