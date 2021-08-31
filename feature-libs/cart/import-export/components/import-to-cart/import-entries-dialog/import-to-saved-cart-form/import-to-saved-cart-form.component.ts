import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  CmsImportEntriesComponent,
  ImportCsvService,
  FilesFormValidators,
  ProductsData,
  NameSource,
  CartNameGeneration,
} from '@spartacus/cart/import-export/core';
import { CxDatePipe } from '@spartacus/core';
import { CmsComponentData, LaunchDialogService } from '@spartacus/storefront';
import { ImportEntriesFormComponent } from 'feature-libs/cart/import-export/components/import-to-cart/import-entries-dialog/import-entries-form/import-entries-form.component';
import { take } from 'rxjs/operators';
import { ImportToCartService } from '../../import-to-cart.service';

@Component({
  selector: 'cx-import-to-saved-cart-form',
  templateUrl: './import-to-saved-cart-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CxDatePipe],
})
export class ImportToSavedCartFormComponent
  extends ImportEntriesFormComponent
  implements OnInit {
  cartNameGeneration?: CartNameGeneration;
  descriptionMaxLength: number = 250;
  nameMaxLength: number = 50;

  @Output()
  submitEvent = new EventEmitter<{
    products: ProductsData;
    savedCartInfo?: {
      name: string;
      description?: string;
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
    protected importToCartService: ImportToCartService,
    protected componentData: CmsComponentData<CmsImportEntriesComponent>,
    protected importService: ImportCsvService,
    protected filesFormValidators: FilesFormValidators,
    protected datePipe: CxDatePipe
  ) {
    super(
      launchDialogService,
      importToCartService,
      componentData,
      importService,
      filesFormValidators
    );
  }

  ngOnInit() {
    super.ngOnInit();
    this.componentData$
      .pipe(take(1))
      .subscribe((data: CmsImportEntriesComponent) => {
        this.cartNameGeneration = data.cartNameGeneration;
      });
  }

  save() {
    const file: File = this.form.get('file')?.value?.[0];
    this.importService.loadCsvData(file).subscribe((loadedFile: string[][]) => {
      this.submitEvent.emit({
        products: this.importToCartService.csvDataToProduct(loadedFile),
        savedCartInfo: {
          name: this.form.get('name')?.value,
          description: this.form.get('description')?.value,
        },
      });
    });
  }

  protected buildForm(): FormGroup {
    const form = new FormGroup({});
    form.setControl(
      'file',
      new FormControl(
        '',
        [
          Validators.required,
          this.filesFormValidators.maxSize(this.fileValidity?.maxSize),
        ],
        [
          this.filesFormValidators.emptyFile.bind(this.filesFormValidators),
          this.filesFormValidators
            .parsableFile(this.importToCartService.isDataParsableToProducts)
            .bind(this.filesFormValidators),
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
        case NameSource.FILE_NAME: {
          this.setFieldValueByFileName(nameField);
          break;
        }
        case NameSource.DATE_TIME: {
          this.setFieldValueByDatetime(nameField);
          break;
        }
        default: {
          break;
        }
      }
    }
  }

  protected setFieldValueByFileName(nameField: AbstractControl) {
    const fileName = this.form
      .get('file')
      ?.value?.[0]?.name?.replace(/\.[^/.]+$/, '');
    nameField.setValue(fileName);
  }

  protected setFieldValueByDatetime(nameField: AbstractControl) {
    const date = new Date();
    const mask = this.cartNameGeneration?.fromDateOptions?.mask;
    const prefix = this.cartNameGeneration?.fromDateOptions?.prefix ?? '';
    const suffix = this.cartNameGeneration?.fromDateOptions?.suffix ?? '';
    const dateString = mask
      ? this.datePipe.transform(date, mask)
      : this.datePipe.transform(date);
    nameField.setValue(`${prefix}${dateString}${suffix}`);
  }
}
