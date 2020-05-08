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

  ngOnInit() {
    this.subscription.add(
      this.asmService.getAsmUiState().subscribe((UiState) => {
        this.isCollapsed = UiState.collapsed;
      })
    );
  }

  toggleUi() {
    this.asmService.updateAsmUiState({ collapsed: !this.isCollapsed });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
