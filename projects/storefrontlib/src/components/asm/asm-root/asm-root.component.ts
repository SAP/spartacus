import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AsmService, AsmUi } from '@spartacus/core';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'cx-asm',
  templateUrl: './asm-root.component.html',
})
export class AsmRootComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();
  asmUi$: Observable<AsmUi>;
  
  constructor(
    protected activatedRoute: ActivatedRoute,
    protected asmService: AsmService
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
  }

  showUi(): void {
    this.asmService.updateAsmUiState({ visible: true });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
