import { Component } from '@angular/core';
import { AsmService, AsmUi } from '@spartacus/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'cx-asm',
  templateUrl: './asm-root.component.html',
})
export class AsmRootComponent {
  constructor(public asmService: AsmService) {}

  get state$(): Observable<AsmUi> {
    return this.asmService.getAsmUiState();
  }

  set collapse(expanded: boolean) {
    this.asmService.updateAsmUiState({ expanded });
  }
}
