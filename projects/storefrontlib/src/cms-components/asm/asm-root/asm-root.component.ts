import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AsmService, AsmUi } from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'cx-asm',
  templateUrl: './asm-root.component.html',
})
export class AsmRootComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();
  asmUi$: Observable<AsmUi>;
  expanded: boolean;

  constructor(
    protected asmService: AsmService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.asmUi$ = this.asmService.getAsmUiState();

    this.subscription.add(
      this.activatedRoute.queryParamMap.subscribe(queryParams => {
        if (queryParams.get('asm') === 'true') {
          this.showUi();
        }
      })
    );

    this.asmUi$.subscribe(expandedState => {
      this.expanded = expandedState.expanded;
    });
  }

  private showUi(): void {
    this.asmService.updateAsmUiState({ visible: true, expanded: true });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  expandUi(): void {
    this.asmService.updateAsmUiState({ visible: true, expanded: true });
  }

  collapseUi(): void {
    this.asmService.updateAsmUiState({ visible: true, expanded: false });
  }
}
