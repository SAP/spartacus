import { ExportFileOptions } from '../export-file-options';
import { FileDownloadService } from '../file-download.service';
import * as i0 from "@angular/core";
export declare class ExportCsvFileService {
    protected fileDownloadService: FileDownloadService;
    constructor(fileDownloadService: FileDownloadService);
    /**
     * Converts array of objects into CSV data structure.
     *
     * @param objectsArray Array of objects which should be converted to CSV.
     * @param separator Separator for CSV data.
     * @returns Processed string ready to be saved into file.
     */
    protected convert(objectsArray: string[][], separator: string): string;
    /**
     * Creates and download CSV file.
     *
     * @param objectsArray Array of objects which should be converted to CSV.
     * @param separator Separator for CSV data.
     * @param fileOptions Exported file options.
     */
    download(objectsArray: string[][], separator: string, fileOptions: ExportFileOptions): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ExportCsvFileService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ExportCsvFileService>;
}
