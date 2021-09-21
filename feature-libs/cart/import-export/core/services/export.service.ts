import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ExportService {
  download(
    textData: string,
    {
      fileName = 'data',
      extension = 'csv',
      type = 'text/csv;charset=utf-8;',
      downloadDelay = 0,
    } = {}
  ) {
    setTimeout(() => {
      const blob = new Blob(['\ufeff' + textData], {
        type,
      });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);

      link.setAttribute('href', url);
      link.setAttribute('download', `${fileName}.${extension}`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, downloadDelay);
  }
}
