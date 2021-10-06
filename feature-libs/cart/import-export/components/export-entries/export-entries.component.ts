import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Observable } from 'rxjs';
import { ImportExportContext } from '@spartacus/cart/import-export/core';
import { ExportEntriesService } from './export-entries.service';

@Component({
  selector: 'cx-export-entries',
  templateUrl: './export-entries.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExportEntriesComponent implements OnInit {
  entries$: Observable<string[][]>;

  @Input()
  service: ImportExportContext;

  constructor(protected exportEntriesService: ExportEntriesService) {}

  ngOnInit() {
    this.entries$ = this.exportEntriesService.getResolvedEntries(
      this.service.getEntries()
    );
  }

  exportToCsv(entries: string[][]): void {
    this.exportEntriesService.downloadCsv(entries);
  }
}
