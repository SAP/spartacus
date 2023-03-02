/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Inject, Injectable, Optional } from '@angular/core';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { Request } from 'express';

@Injectable()
export class RequestLoggingService {
  constructor(@Optional() @Inject(REQUEST) private req: Request) {}

  log(message: string) {
    const time =
      this.req.startTime !== undefined
        ? Date.now() - this.req.startTime
        : new Date();

    console.log(this.req.uuid + ' - ' + message + ' (ms:' + time + ')');
  }
}
