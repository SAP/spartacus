import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { AsmService } from '@spartacus/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cx-asm-toggle-ui',
  templateUrl: './asm-toggle-ui.component.html',
  styleUrls: ['./asm-toggle-ui.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AsmToggleUiComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();
  isCollapsed: boolean;

  constructor(protected asmService: AsmService) {}

  ngOnInit(): void {
    this.subscription.add(
      this.asmService.getAsmUiState().subscribe((uiState) => {
        this.isCollapsed = uiState.collapsed;
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
