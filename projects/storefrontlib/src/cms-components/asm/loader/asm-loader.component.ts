import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AsmService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';
@Component({
  selector: 'cx-asm-loader',
  templateUrl: './asm-loader.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AsmLoaderComponent {
  isVisible$: Observable<boolean> = this.activatedRoute.queryParamMap.pipe(
    tap(queryParams => (this.showAsmUi = queryParams.get('asm') === 'true')),
    switchMap(() =>
      this.asmService.getAsmUiState().pipe(map(asm => asm.visible))
    ),
    distinctUntilChanged()
  );

  constructor(
    protected activatedRoute: ActivatedRoute,
    protected asmService: AsmService
  ) {}

  private set showAsmUi(visible: boolean) {
    if (visible) {
      this.asmService.updateAsmUiState({ visible });
    }
  }
}
