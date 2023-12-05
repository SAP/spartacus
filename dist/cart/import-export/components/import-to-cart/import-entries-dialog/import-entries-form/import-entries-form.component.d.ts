import { EventEmitter, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { OrderEntriesSource, ProductData } from '@spartacus/cart/base/root';
import { ImportExportConfig } from '@spartacus/cart/import-export/core';
import { FilesFormValidators, ImportCsvFileService, LaunchDialogService } from '@spartacus/storefront';
import { Subject } from 'rxjs';
import { ImportProductsFromCsvService } from '../../import-products-from-csv.service';
import * as i0 from "@angular/core";
export declare class ImportEntriesFormComponent implements OnInit {
    protected launchDialogService: LaunchDialogService;
    protected importToCartService: ImportProductsFromCsvService;
    protected importCsvService: ImportCsvFileService;
    protected filesFormValidators: FilesFormValidators;
    protected importExportConfig: ImportExportConfig;
    form: UntypedFormGroup;
    loadedFile: string[][] | null;
    formSubmitSubject$: Subject<unknown>;
    submitEvent: EventEmitter<{
        products: ProductData[];
    }>;
    type: OrderEntriesSource;
    constructor(launchDialogService: LaunchDialogService, importToCartService: ImportProductsFromCsvService, importCsvService: ImportCsvFileService, filesFormValidators: FilesFormValidators, importExportConfig: ImportExportConfig);
    ngOnInit(): void;
    close(reason: string): void;
    save(): void;
    protected buildForm(): UntypedFormGroup;
    get allowedTypes(): string[] | undefined;
    protected get maxSize(): number | undefined;
    protected get maxEntries(): number | undefined;
    protected get separator(): string | undefined;
    static ɵfac: i0.ɵɵFactoryDeclaration<ImportEntriesFormComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ImportEntriesFormComponent, "cx-import-entries-form", never, { "type": "type"; }, { "submitEvent": "submitEvent"; }, never, never, false, never>;
}
