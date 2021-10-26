import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import {
  OrderEntriesSource,
  ICON_TYPE,
  ProductImportSummary,
} from '@spartacus/storefront';

@Component({
  selector: 'cx-import-entries-summary',
  templateUrl: './import-entries-summary.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImportEntriesSummaryComponent {
  iconTypes = ICON_TYPE;
  orderEntriesSource = OrderEntriesSource;

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
