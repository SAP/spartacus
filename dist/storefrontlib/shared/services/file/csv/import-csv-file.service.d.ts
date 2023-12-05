import { ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { FileReaderService } from '../file-reader.service';
import { CsvFileValidationErrors } from './csv-file-validation-errors';
import * as i0 from "@angular/core";
export declare class ImportCsvFileService {
    protected fileReaderService: FileReaderService;
    constructor(fileReaderService: FileReaderService);
    /**
     * Load CSV file.
     *
     * @param file File we want to load as CSV.
     * @param separator Separator for CSV data.
     * @return {Observable<string[][]>} Imported file
     */
    loadFile(file: File, separator: string): Observable<string[][]>;
    /**
     * Combined csv validation
     *
     * @param file File we want to load as CSV.
     * @param separator Separator for CSV data.
     * @param isDataParsable (optional) Callback for verify that structure type is proper.
     * @param maxEntries (optional) Limitation for maximum entries count.
     * @return {Observable<CsvFileValidationErrors | null>} Result of validation
     */
    validateFile(file: File, { separator, isDataParsable, maxEntries, }: {
        separator: string;
        isDataParsable?: (data: string[][]) => boolean;
        maxEntries?: number;
    }): Observable<CsvFileValidationErrors | null>;
    /**
     * Processes the CSV data
     *
     * @param csvString raw extracted data from CSV
     * @param separator for csv data
     * @param ignoreHeader (optional) flag allows for ignore headers row while reading
     * @returns {string[][]} Parsed file
     */
    protected parse(csvString: string, separator: string, ignoreHeader?: boolean): string[][];
    protected validateEmpty(data: string, errors: ValidationErrors): void;
    protected validateTooManyEntries(data: string[][], errors: ValidationErrors, maxEntries?: number): void;
    protected validateNotParsable(data: string[][], errors: ValidationErrors, isDataParsable?: (data: string[][]) => boolean): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ImportCsvFileService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ImportCsvFileService>;
}
