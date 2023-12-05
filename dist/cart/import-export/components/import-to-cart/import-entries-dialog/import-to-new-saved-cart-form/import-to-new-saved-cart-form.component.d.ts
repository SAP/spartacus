import { EventEmitter } from '@angular/core';
import { AbstractControl, UntypedFormGroup } from '@angular/forms';
import { ProductData } from '@spartacus/cart/base/root';
import { CartNameGeneration, ImportExportConfig } from '@spartacus/cart/import-export/core';
import { CxDatePipe } from '@spartacus/core';
import { FilesFormValidators, ImportCsvFileService, LaunchDialogService } from '@spartacus/storefront';
import { ImportProductsFromCsvService } from '../../import-products-from-csv.service';
import { ImportEntriesFormComponent } from '../import-entries-form/import-entries-form.component';
import * as i0 from "@angular/core";
export declare class ImportToNewSavedCartFormComponent extends ImportEntriesFormComponent {
    protected launchDialogService: LaunchDialogService;
    protected importToCartService: ImportProductsFromCsvService;
    protected importCsvService: ImportCsvFileService;
    protected filesFormValidators: FilesFormValidators;
    protected importExportConfig: ImportExportConfig;
    protected datePipe: CxDatePipe;
    descriptionMaxLength: number;
    nameMaxLength: number;
    submitEvent: EventEmitter<{
        products: ProductData[];
        savedCartInfo?: {
            name: string;
            description: string;
        } | undefined;
    }>;
    get descriptionsCharacterLeft(): number;
    constructor(launchDialogService: LaunchDialogService, importToCartService: ImportProductsFromCsvService, importCsvService: ImportCsvFileService, filesFormValidators: FilesFormValidators, importExportConfig: ImportExportConfig, datePipe: CxDatePipe);
    save(): void;
    protected buildForm(): UntypedFormGroup;
    updateCartName(): void;
    protected setFieldValueByFileName(nameField: AbstractControl): void;
    protected setFieldValueByDatetime(nameField: AbstractControl): void;
    protected get cartNameGeneration(): CartNameGeneration | undefined;
    static ɵfac: i0.ɵɵFactoryDeclaration<ImportToNewSavedCartFormComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ImportToNewSavedCartFormComponent, "cx-import-to-new-saved-cart-form", never, {}, { "submitEvent": "submitEvent"; }, never, never, false, never>;
}
