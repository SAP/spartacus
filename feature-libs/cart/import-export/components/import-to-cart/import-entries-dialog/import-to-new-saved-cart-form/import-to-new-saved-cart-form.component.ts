import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  CartNameGeneration,
  CartNameSource,
  ImportExportConfig,
} from '@spartacus/cart/import-export/core';
import { CxDatePipe } from '@spartacus/core';
import {
  FilesFormValidators,
  ImportCsvFileService,
  LaunchDialogService,
  ProductData,
} from '@spartacus/storefront';
import { of } from 'rxjs';
import { ImportProductsFromCsvService } from '../../import-products-from-csv.service';
import { ImportEntriesFormComponent } from '../import-entries-form/import-entries-form.component';

@Component({
  selector: 'cx-import-to-new-saved-cart-form',
  templateUrl: './import-to-new-saved-cart-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CxDatePipe],
})
export class ImportToNewSavedCartFormComponent extends ImportEntriesFormComponent {
  descriptionMaxLength: number = 250;
  nameMaxLength: number = 50;

  @Output()
  submitEvent = new EventEmitter<{
    products: ProductData[];
    savedCartInfo?: {
      name: string;
      description: string;
    };
  }>();

  get descriptionsCharacterLeft(): number {
    return (
      this.descriptionMaxLength -
      (this.form.get('description')?.value?.length || 0)
    );
  }

  constructor(
    protected launchDialogService: LaunchDialogService,
    protected importToCartService: ImportProductsFromCsvService,
    protected importCsvService: ImportCsvFileService,
    protected filesFormValidators: FilesFormValidators,
    protected importExportConfig: ImportExportConfig,
    protected datePipe: CxDatePipe
  ) {
    super(
      launchDialogService,
      importToCartService,
      importCsvService,
      filesFormValidators,
      importExportConfig
    );
  }

  save(): void {
    const file: File = this.form.get('file')?.value?.[0];
    if (this.separator !== undefined) {
      this.importCsvService
        .loadFile(file, this.separator)
        .subscribe((loadedFile: string[][]) => {
          this.submitEvent.emit({
            products: this.importToCartService.csvDataToProduct(loadedFile),
            savedCartInfo: {
              name: this.form.get('name')?.value,
              description: this.form.get('description')?.value,
            },
          });
        });
    }
  }

  protected buildForm(): FormGroup {
    const form = new FormGroup({});
    form.setControl(
      'file',
      new FormControl(
        '',
        [Validators.required, this.filesFormValidators.maxSize(this.maxSize)],
        [
          (control) =>
            this.separator !== undefined
              ? this.importCsvService.validateFile(control.value[0], {
                  separator: this.separator,
                  isDataParsable:
                    this.importToCartService.isDataParsableToProducts,
                  maxEntries: this.maxEntries,
                })
              : of(null),
        ]
      )
    );
    form.setControl(
      'name',
      new FormControl('', [
        Validators.required,
        Validators.maxLength(this.nameMaxLength),
      ])
    );
    form.setControl(
      'description',
      new FormControl('', [Validators.maxLength(this.descriptionMaxLength)])
    );
    return form;
  }

  updateCartName(): void {
    const nameField = this.form.get('name');
    if (nameField && !nameField?.value && this.cartNameGeneration?.source) {
      switch (this.cartNameGeneration.source) {
        case CartNameSource.FILE_NAME: {
          this.setFieldValueByFileName(nameField);
          break;
        }
        case CartNameSource.DATE_TIME: {
          this.setFieldValueByDatetime(nameField);
          break;
        }
        default: {
          break;
        }
      }
    }
  }

  protected setFieldValueByFileName(nameField: AbstractControl): void {
    const fileName = this.form
      .get('file')
      ?.value?.[0]?.name?.replace(/\.[^/.]+$/, '');
    nameField.setValue(fileName);
  }

  protected setFieldValueByDatetime(nameField: AbstractControl): void {
    const date = new Date();
    const fromDateOptions = this.cartNameGeneration?.fromDateOptions;
    const mask = fromDateOptions?.mask;
    const prefix = fromDateOptions?.prefix ?? '';
    const suffix = fromDateOptions?.suffix ?? '';
    const dateString = mask
      ? this.datePipe.transform(date, mask)
      : this.datePipe.transform(date);
    nameField.setValue(`${prefix}${dateString}${suffix}`);
  }

  protected get cartNameGeneration(): CartNameGeneration | undefined {
    return this.importExportConfig.cartImportExport?.import?.cartNameGeneration;
  }
}
