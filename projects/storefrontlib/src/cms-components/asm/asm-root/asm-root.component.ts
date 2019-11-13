import { Component } from '@angular/core';
import { AsmService } from '@spartacus/core';

@Component({
  selector: 'cx-asm',
  templateUrl: './asm-root.component.html',
})
export class AsmRootComponent {
  constructor(protected asmService: AsmService) {}

  expandUi(): void {
    this.asmService.updateAsmUiState({ expanded: true });
  }

  collapseUi(): void {
    this.asmService.updateAsmUiState({ expanded: false });
  }
}
