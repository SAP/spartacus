import { DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  CmsImportEntriesComponent,
  FileValidity,
  ImportService,
  InvalidFileInfo,
  ProductsData,
  defaultNameSource,
  cartOptions,
} from '@spartacus/cart/import-export/core';
import { CmsComponentData, LaunchDialogService } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { finalize, map, switchMap, take, tap } from 'rxjs/operators';
import { ImportToCartService } from '../../import-to-cart.service';

@Component({
  selector: 'cx-import-entries-form',
  templateUrl: './import-entries-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DatePipe],
})
export class ImportEntriesFormComponent implements OnInit {
  form: FormGroup = this.buildForm();
  fileValidity: FileValidity;
  descriptionMaxLength: number = 250;
  nameMaxLength: number = 50;
  loadedFile: string[][] | null;
  fileError: InvalidFileInfo = {};
  cartOptions: cartOptions;

  componentData$ = this.componentData.data$;

  @Output()
  submitEvent = new EventEmitter<{
    products: ProductsData;
    name: string;
    description: string;
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
    protected importService: ImportService,
    protected datePipe: DatePipe,
    protected componentData: CmsComponentData<CmsImportEntriesComponent>
  ) {}

  ngOnInit() {
    this.componentData$.pipe(take(1)).subscribe((data) => {
      this.fileValidity = data.fileValidity;
      this.cartOptions = data.cartOptions;
    });
  }

  close(reason: string): void {
    this.launchDialogService.closeDialog(reason);
  }

  loadFile() {
    // We expect at most one file in the FileList:
    const file: File = this.form.get('file')?.value?.[0];
    if (!file) {
      return;
    }

    this.fileError = {};
    of(file)
      .pipe(
        tap((fileData: File) => {
          this.validateMaxSize(fileData);
        }),
        switchMap(
          (fileData: File) =>
            <Observable<string>>this.importService.loadFile(fileData)
        ),
        map((result: string) => this.importService.readCsvData(result)),
        tap((data: string[][]) => {
          this.validateEmpty(data);
          this.validateParsable(data);
        }),
        finalize(() => {
          this.form.get('file')?.updateValueAndValidity();
        })
      )
      .subscribe(
        (data: string[][]) => {
          this.loadedFile = data;
          this.updateCartName();
        },
        () => {
          this.loadedFile = null;
        }
      );
  }

  submit() {
    if (this.loadedFile) {
      this.submitEvent.emit({
        products: this.importToCartService.csvDataToProduct(this.loadedFile),
        name: this.form.get('name')?.value,
        description: this.form.get('description')?.value,
      });
    }
  }

  protected buildForm(): FormGroup {
    const form = new FormGroup({});
    form.setControl(
      'file',
      new FormControl('', [Validators.required, () => this.fileError])
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

  protected validateMaxSize(file: File) {
    const maxSize = this.fileValidity?.maxSize;
    if (maxSize && file.size / 1000000 > maxSize) {
      this.fileError.tooLarge = { maxSize };
      throw Error();
    }
  }

  protected validateEmpty(data: string[][]) {
    if (data.toString().length === 0) {
      this.fileError.empty = true;
      throw Error();
    }
  }

  protected validateParsable(data: string[][]) {
    if (!this.importToCartService.isDataParsable(data)) {
      this.fileError.notParsable = true;
      throw Error();
    }
  }

  protected updateCartName(): void {
    if (this.cartOptions.enableDefaultName) {
      if (this.cartOptions.defaultNameSource === defaultNameSource.FILE_NAME) {
        const cartName = this.form
          .get('file')
          ?.value?.[0]?.name?.replace(/\.[^/.]+$/, '');
        this.form.get('name')?.setValue(cartName);
      } else if (
        this.cartOptions.defaultNameSource === defaultNameSource.DATE
      ) {
        const date = new Date();
        const dateString = this.datePipe.transform(date, 'yyyy/MM/dd_hh:mm');
        this.form.get('name')?.setValue(`cart_${dateString}`);
      }
    }
  }
}
