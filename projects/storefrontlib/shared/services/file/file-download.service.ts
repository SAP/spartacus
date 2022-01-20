import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FileDownloadService {
  /**
   * Triggers the browser downloading of the file from the given URL.
   *
   * @param {string} url URL to file.
   * @param {string} [fileName] The optional parameter for defining filename
   * (including the extension) when saving the file.
   */
  download(url: string, fileName?: string): void {
    const link = document.createElement('a');

    link.setAttribute('href', url);
    link.setAttribute('download', `${fileName}`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
