import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { ICON_TYPE } from '@spartacus/storefront';
import {
  ProductImportSummary,
  CartTypes,
} from '@spartacus/cart/import-export/core';

@Component({
  selector: 'cx-import-entries-summary',
  templateUrl: './import-entries-summary.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImportEntriesSummaryComponent {
  iconTypes = ICON_TYPE;
  cartTypes = CartTypes;

  warningDetailsOpened: boolean = false;
  errorDetailsOpened: boolean = false;

  @Input()
  type: string;

  @Input()
  summary: ProductImportSummary;

  @Output()
  closeEvent = new EventEmitter<string>();

  close(reason: string): void {
    this.closeEvent.emit(reason);
  }

  toggleWarningList(): void {
    this.warningDetailsOpened = !this.warningDetailsOpened;
  }

  toggleErrorList(): void {
    this.errorDetailsOpened = !this.errorDetailsOpened;
  }
}
