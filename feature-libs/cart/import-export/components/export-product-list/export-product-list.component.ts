import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActiveCartService, OrderEntry } from '@spartacus/core';
import { filter, take } from 'rxjs/operators';
import { ImportExportService } from '@spartacus/cart/import-export/core';

@Component({
  selector: 'cx-export-product-list',
  templateUrl: './export-product-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExportProductListComponent {
  constructor(
    protected importExportService: ImportExportService,
    protected activeCartService: ActiveCartService,
  ) {}

  entries$ = this.activeCartService
    .getEntries()
    .pipe(filter((entries) => entries.length > 0));

  exportToCsv() {
    this.entries$
      .pipe(take(1))
      .subscribe((entries) => this.parseEntries(entries));
  }

  parseEntries(entries: OrderEntry[]) {
    let parsedData = [];
    parsedData.push({
      sku: 'Sku',
      quantity: 'Quantity',
      name: 'Name',
      price: 'Price',
    });
    entries.forEach((element: OrderEntry) => {
      parsedData.push({
        sku: element?.product?.code,
        quantity: element?.quantity,
        name: element?.product?.name,
        price: element?.totalPrice?.formattedValue,
      });
    });

    this.downloadCsv(this.importExportService.dataToCsv(parsedData));
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
