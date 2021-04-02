import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { OrderEntry } from '@spartacus/core';
import { ImportExportService } from '../../core/services/import-export.service';

@Component({
  selector: 'cx-export-product-list',
  templateUrl: './export-product-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExportProductListComponent {
  constructor(protected importExportService: ImportExportService) {}

  @Input() entries: OrderEntry[];

  exportToCsv() {
    this.parseEntries(this.entries);
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
      }),
      link = document.createElement('a'),
      url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', filename + '.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
