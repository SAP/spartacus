import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { OrderEntry } from '@spartacus/core';
import { ExportProductsToCsvService } from './export-products-to-csv.service';

@Component({
  selector: 'cx-export-entries',
  templateUrl: './export-entries.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExportEntriesComponent {
  @Input()
  entries: OrderEntry[];

  constructor(protected exportEntriesService: ExportProductsToCsvService) {}

  exportCsv(): void {
    this.exportEntriesService.downloadCsv(this.entries);
  }
}
