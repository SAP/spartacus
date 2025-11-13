/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Pipe, PipeTransform, inject } from '@angular/core';
import { SemanticPathService } from './semantic-path.service';
import { UrlCommands } from './url-command';

@Pipe({
  name: 'cxUrl',
  standalone: false,
})
export class UrlPipe implements PipeTransform {
  private urlService = inject(SemanticPathService);

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {}

  transform(commands: UrlCommands): any[] {
    return this.urlService.transform(commands);
  }
}
