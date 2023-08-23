/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ExpressServerLogger, ExpressServerLoggerContext } from '../../loggers';
import { ExpressLogTransformer } from '../express-log-transformer';

export abstract class TraceparentTransformer implements ExpressLogTransformer {
  abstract transform(
    message: string,
    context: ExpressServerLoggerContext,
    logger?: ExpressServerLogger
  ): [string, ExpressServerLoggerContext];
}
