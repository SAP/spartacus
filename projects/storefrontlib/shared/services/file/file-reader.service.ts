import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FileReaderService {
  /**
   * Load text file
   *
   * @param file text file to extract the data
   * @returns Observable from file reader
   */
  loadTextFile(file: File): Observable<string | ProgressEvent<FileReader>> {
    return new Observable((observer: Observer<string>) => {
      const fileReader: FileReader = new FileReader();
      fileReader.readAsText(file);
      fileReader.onload = () => {
        observer.next(fileReader.result as string);
        observer.complete();
      };
      fileReader.onerror = (error) => {
        fileReader.abort();
        observer.error(error);
      };
    });
  }
}
