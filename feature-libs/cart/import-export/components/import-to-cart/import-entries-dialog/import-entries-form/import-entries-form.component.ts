import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  FileValidity,
  ImportCsvService,
  FilesFormValidators,
  ProductsData,
} from '@spartacus/cart/import-export/core';
import { FormUtils, LaunchDialogService } from '@spartacus/storefront';
import { Subject } from 'rxjs';
import { filter, startWith, switchMap, take, tap } from 'rxjs/operators';
import { ImportToCartService } from '../../import-to-cart.service';

@Component({
  selector: 'cx-import-entries-form',
  templateUrl: './import-entries-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImportEntriesFormComponent implements OnInit {
  form: FormGroup;
  fileValidity: FileValidity;
  descriptionMaxLength: number = 250;
  nameMaxLength: number = 50;
  loadedFile: string[][] | null;
  formSubmitSubject$ = new Subject();

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
    protected importService: ImportCsvService,
    protected filesFormValidators: FilesFormValidators
  ) {}

  ngOnInit() {
    this.launchDialogService.data$
      .pipe(take(1))
      .subscribe((fileValidity: FileValidity) => {
        this.fileValidity = fileValidity;
        this.form = this.buildForm();
      });

    this.formSubmitSubject$
      .pipe(
        tap(() => {
          if (this.form.invalid) {
            this.form.markAllAsTouched();
            FormUtils.deepUpdateValueAndValidity(this.form);
          }
        }),
        switchMap(() =>
          this.form.statusChanges.pipe(
            startWith(this.form.get('file')?.status),
            filter((status) => status !== 'PENDING'),
            take(1)
          )
        ),
        filter((status) => status === 'VALID')
      )
      .subscribe(() => this.save());
  }

  close(reason: string): void {
    this.launchDialogService.closeDialog(reason);
  }

  save() {
    const file: File = this.form.get('file')?.value?.[0];
    this.importService.loadCsvData(file).subscribe((loadedFile: string[][]) => {
      this.submitEvent.emit({
        products: this.importToCartService.csvDataToProduct(loadedFile),
        name: this.form.get('name')?.value,
        description: this.form.get('description')?.value,
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
}
