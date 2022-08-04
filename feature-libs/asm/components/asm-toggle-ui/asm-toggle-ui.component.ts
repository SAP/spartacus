import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AsmFacade, AsmUi } from '../../root';

@Component({
  selector: 'cx-asm-toggle-ui',
  templateUrl: './asm-toggle-ui.component.html',
})
export class AsmToggleUiComponent implements OnInit, OnDestroy {
  protected subscription = new Subscription();
  isCollapsed: boolean;

  constructor(protected asmFacade: AsmFacade) {}

  ngOnInit(): void {
    this.subscription.add(
      this.asmFacade.getAsmUiState().subscribe((uiState: AsmUi) => {
        this.isCollapsed =
          uiState.collapsed === undefined ? false : uiState.collapsed;
      })
    );
  }

  toggleUi(): void {
    this.asmFacade.updateAsmUiState({ collapsed: !this.isCollapsed });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
