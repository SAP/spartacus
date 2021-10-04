import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { CartTypes } from '@spartacus/cart/import-export/core';
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
  cartType: CartTypes;

  constructor(protected exportEntriesService: ExportEntriesService) {}

  ngOnInit() {
    this.entries$ = this.exportEntriesService.getResolvedEntries(this.cartType);
  }

  exportToCsv(entries: string[][]): void {
    this.exportEntriesService.downloadCsv(entries);
  }
}
