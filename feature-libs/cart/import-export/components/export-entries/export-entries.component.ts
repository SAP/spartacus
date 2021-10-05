import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { AbstractImportExportService } from 'feature-libs/cart/import-export/core/services';
import { Observable } from 'rxjs';
import { ExportEntriesService } from './export-entries.service';

@Component({
  selector: 'cx-export-entries',
  templateUrl: './export-entries.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExportEntriesComponent implements OnInit {
  entries$: Observable<string[][]>;

  @Input()
  service: AbstractImportExportService;

  constructor(protected exportEntriesService: ExportEntriesService) {}

  ngOnInit() {
    this.entries$ = this.exportEntriesService.getResolvedEntries(this.service);
  }

  exportToCsv(entries: string[][]): void {
    this.exportEntriesService.downloadCsv(entries);
  }
}
