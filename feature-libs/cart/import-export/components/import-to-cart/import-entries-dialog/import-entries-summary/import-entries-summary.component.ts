import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProductImportSummary } from '@spartacus/cart/import-export/core';
import { ICON_TYPE } from '@spartacus/storefront';

@Component({
  selector: 'cx-import-entries-summary',
  templateUrl: './import-entries-summary.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImportEntriesSummaryComponent {
  iconTypes = ICON_TYPE;

  @Input()
  summary$: BehaviorSubject<ProductImportSummary>;

  @Output()
  closeEvent = new EventEmitter<string>();

  close(reason: string): void {
    this.closeEvent.emit(reason);
  }
}
