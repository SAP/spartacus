import { Component, OnDestroy, OnInit } from '@angular/core';
import { AsmFacade, AsmUi } from '@spartacus/asm/root';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cx-asm-toggle-ui',
  templateUrl: './asm-toggle-ui.component.html',
})
export class AsmToggleUiComponent implements OnInit, OnDestroy {
  protected subscription = new Subscription();
  isCollapsed: boolean;

  constructor(protected asmService: AsmFacade) {}

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
