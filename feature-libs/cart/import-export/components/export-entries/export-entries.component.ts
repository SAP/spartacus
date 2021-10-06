import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { OrderEntry } from '@spartacus/core';
import { Observable } from 'rxjs';
import { ExportProductsToCsvService } from './export-products-to-csv.service';

@Component({
  selector: 'cx-export-entries',
  templateUrl: './export-entries.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExportEntriesComponent implements OnInit {
  csv$: Observable<string[][]>;

  @Input()
  entries: OrderEntry[];

  constructor(protected exportEntriesService: ExportProductsToCsvService) {}

  ngOnInit() {
    this.csv$ = this.exportEntriesService.getResolvedEntries(this.entries);
  }

  downloadCsv(csvData: string[][]): void {
    this.exportEntriesService.downloadCsv(csvData);
  }
}
