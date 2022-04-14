import { Component, OnDestroy, OnInit } from '@angular/core';
import { AsmService, AsmUi } from '@spartacus/asm/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cx-asm-toggle-ui',
  templateUrl: './asm-toggle-ui.component.html',
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
