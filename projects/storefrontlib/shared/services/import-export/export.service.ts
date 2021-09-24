import { Injectable } from '@angular/core';
import { FileOptions } from '@spartacus/storefront';

@Injectable({
  providedIn: 'root',
})
export class ExportService {
  download(fileContent: string, fileOptions: FileOptions) {
    const { fileName, type, extension } = fileOptions;
    const blob = new Blob(['\ufeff' + fileContent], {
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
  }
}
