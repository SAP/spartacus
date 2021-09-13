import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ExportEntriesService } from './export-entries.service';
@Component({
  selector: 'cx-export-entries',
  templateUrl: './export-entries.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExportEntriesComponent {
  constructor(protected exportEntriesService: ExportEntriesService) {}

  entries$ = this.exportEntriesService.getResolvedEntries();

  exportToCsv(entries: string[][]) {
    this.exportEntriesService.downloadCsv(entries);
  }
}
