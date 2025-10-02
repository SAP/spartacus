/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, OnDestroy, OnInit } from '@angular/core';
import { AsmService } from '@spartacus/asm/core';
import { AsmUi } from '@spartacus/asm/root';
import { Subscription } from 'rxjs';
import { NgClass, NgIf } from '@angular/common';
import { TranslatePipe } from '../../../../projects/core/src/i18n/translate.pipe';
import { MockTranslatePipe } from '../../../../projects/core/src/i18n/testing/mock-translate.pipe';

@Component({
    selector: 'cx-asm-toggle-ui',
    templateUrl: './asm-toggle-ui.component.html',
    imports: [
        NgClass,
        NgIf,
        TranslatePipe,
        MockTranslatePipe,
    ],
})
export class AsmToggleUiComponent implements OnInit, OnDestroy {
  protected subscription = new Subscription();
  isCollapsed: boolean;

  constructor(protected asmService: AsmService) {}

  ngOnInit(): void {
    this.subscription.add(
      this.asmService.getAsmUiState().subscribe((uiState: AsmUi) => {
        this.isCollapsed =
          uiState.collapsed === undefined ? false : uiState.collapsed;
      })
    );
  }

  toggleUi(): void {
    this.asmService.updateAsmUiState({ collapsed: !this.isCollapsed });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
