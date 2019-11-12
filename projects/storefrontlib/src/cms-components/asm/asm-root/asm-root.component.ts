import { Component } from '@angular/core';
import { AsmService, AsmUi } from '@spartacus/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'cx-asm',
  templateUrl: './asm-root.component.html',
})
export class AsmRootComponent {
  state$: Observable<AsmUi> = this.asmService.getAsmUiState();

  constructor(protected asmService: AsmService) {}

  set collapse(expanded: boolean) {
    this.asmService.updateAsmUiState({ expanded });
  }
}
