import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { OrderEntry } from '@spartacus/core';

@Component({
  selector: 'cx-export-from-cart',
  templateUrl: './export-from-cart.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExportFromCartComponent {
  @Input() entries: OrderEntry[];

  exportToCsv() {
    this.downloadFile(this.entries);
  }

  convertToCSV(objArray) {
    let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    let str = '';

    for (let i = 0; i < array.length; i++) {
      let line = '';
      for (let index in array[i]) {
        if (line != '') line += ',';

        line += array[i][index];
      }

      str += line + '\r\n';
    }

    return str;
  }

  downloadFile(data, filename = 'data') {
    let parsedData = [];
    parsedData.push({
      sku: 'Sku',
      quantity: 'Quantity',
      name: 'Name',
      price: 'Price',
    });
    data.forEach((element: OrderEntry) => {
      parsedData.push({
        sku: element?.product?.code,
        quantity: element?.quantity,
        name: element?.product?.name,
        price: element?.totalPrice?.formattedValue,
      });
    });

    let csvData = this.convertToCSV(parsedData);
    console.log(data);
    let blob = new Blob(['\ufeff' + csvData], {
      type: 'text/csv;charset=utf-8;',
    });
    let dwldLink = document.createElement('a');
    let url = URL.createObjectURL(blob);
    let isSafariBrowser =
      navigator.userAgent.indexOf('Safari') != -1 &&
      navigator.userAgent.indexOf('Chrome') == -1;
    if (isSafariBrowser) {
      //if Safari open in new window to save file with random filename.
      dwldLink.setAttribute('target', '_blank');
    }
    dwldLink.setAttribute('href', url);
    dwldLink.setAttribute('download', filename + '.csv');
    dwldLink.style.visibility = 'hidden';
    document.body.appendChild(dwldLink);
    dwldLink.click();
    document.body.removeChild(dwldLink);
  }
}
