import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ActiveCartService } from '@spartacus/core';
import { ExportService } from '@spartacus/cart/import-export/core';
import { ExportEntriesService } from './export-entries.service';

@Component({
  selector: 'cx-export-entries',
  templateUrl: './export-entries.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExportEntriesComponent {
  constructor(
    protected exportEntriesService: ExportEntriesService,
    protected exportService: ExportService,
    protected activeCartService: ActiveCartService
  ) {}

  entries$ = this.exportEntriesService.getEntries();

  exportToCsv() {
    this.downloadCsv(
      this.exportService.dataToCsv(this.exportEntriesService.exportEntries())
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
