import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderEntry, TranslationService } from '@spartacus/core';
import {
  ExportOrderEntry,
  ImportExportService,
} from '@spartacus/cart/import-export/core';
import { ExportEntriesService } from './export-entries.service';

@Component({
  selector: 'cx-export-entries',
  templateUrl: './export-entries.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExportEntriesComponent {
  constructor(
    protected exportEntriesService: ExportEntriesService,
    protected importExportService: ImportExportService,
    protected translationService: TranslationService
  ) {}

  entries$: Observable<OrderEntry[]> = this.exportEntriesService.getEntries();

  columnHeaders$: Observable<ExportOrderEntry> = this.exportEntriesService.getColumnHeaders();

  exportToCsv(entries: OrderEntry[], headers?: ExportOrderEntry) {
    this.downloadCsv(
      this.importExportService.dataToCsv(
        this.exportEntriesService.parseEntries(entries, headers)
      )
    );
  }

  downloadCsv(csvData: any, filename = 'data') {
    let blob = new Blob(['\ufeff' + csvData], {
      type: 'text/csv;charset=utf-8;',
    });
    let link = document.createElement('a');
    let url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', filename + '.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
