import { ChangeDetectionStrategy, Component } from '@angular/core';
import { OrderEntry } from '@spartacus/core';
import { ExportCsvService } from '@spartacus/cart/import-export/core';
import { ExportEntriesService } from './export-entries.service';
@Component({
  selector: 'cx-export-entries',
  templateUrl: './export-entries.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExportEntriesComponent {
  constructor(
    protected exportEntriesService: ExportEntriesService,
    protected exportService: ExportCsvService
  ) {}

  entries$ = this.exportEntriesService.getEntries();

  exportToCsv(entries: OrderEntry[]) {
    this.exportService.downloadCsv(
      this.exportService.dataToCsv(
        this.exportEntriesService.entriesToDataArray(entries)
      )
    );
  }
}
