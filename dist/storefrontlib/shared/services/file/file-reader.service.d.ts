import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class FileReaderService {
    /**
     * Load text file
     *
     * @param file text file to extract the data
     * @returns Observable from file reader
     */
    loadTextFile(file: File): Observable<string | ProgressEvent<FileReader>>;
    static ɵfac: i0.ɵɵFactoryDeclaration<FileReaderService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<FileReaderService>;
}
