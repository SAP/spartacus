/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { OnInit, Directive, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AddToHomeScreenService } from '../services/add-to-home-screen.service';

@Directive()
export abstract class AddToHomeScreenComponent implements OnInit {
  protected addToHomeScreenService = inject(AddToHomeScreenService);

  canPrompt$: Observable<boolean>;

  ngOnInit(): void {
    this.canPrompt$ = this.addToHomeScreenService.canPrompt$;
  }

  prompt(): void {
    this.addToHomeScreenService.firePrompt();
  }
}
