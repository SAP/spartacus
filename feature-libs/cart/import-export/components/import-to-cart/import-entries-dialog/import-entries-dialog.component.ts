import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { finalize, take, tap } from 'rxjs/operators';
import {
  ImportExportConfig,
  InvalidFileInfo,
  ImportService,
  FileValidity,
} from '@spartacus/cart/import-export/core';
import {
  FocusConfig,
  ICON_TYPE,
  LaunchDialogService,
} from '@spartacus/storefront';
import { ImportToCartService } from '../import-to-cart.service';

@Component({
  selector: 'cx-import-entries-dialog',
  templateUrl: './import-entries-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImportEntriesDialogComponent implements OnInit {
  iconTypes = ICON_TYPE;
  form: FormGroup = this.build();
  focusConfig: FocusConfig = {
    trap: true,
    block: true,
    autofocus: 'button',
    focusOnEscape: true,
  };
  fileValidity: FileValidity;
  descriptionMaxLength: number = 250;
  nameMaxLength: number = 50;
  loadedFile: string[][] | null;
  fileError: InvalidFileInfo = {};

  get descriptionsCharacterLeft(): number {
    return (
      this.descriptionMaxLength -
      (this.form.get('description')?.value?.length || 0)
    );
  }

  constructor(
    protected launchDialogService: LaunchDialogService,
    protected importExportConfig: ImportExportConfig,
    protected importToCartService: ImportToCartService,
    protected importService: ImportService
  ) {}

  ngOnInit() {
    this.launchDialogService.data$
      .pipe(take(1))
      .subscribe((fileValidity: FileValidity) => {
        this.fileValidity = fileValidity;
      });
  }

  close(reason: string): void {
    this.launchDialogService.closeDialog(reason);
  }

  selectFile(file: File, form: FormGroup) {
    if (this.isFileValid(file)) {
      this.loadFile(file, form);
    } else {
      form.get('file')?.updateValueAndValidity();
    }
  }

  importProducts(): void {
    if (this.loadedFile) {
      this.importToCartService.loadProductsToCart(this.loadedFile, {
        name: this.form.get('name')?.value,
        description: this.form.get('description')?.value,
      });
    }
  }

  protected build(): FormGroup {
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

  protected isFileValid(file: File): boolean {
    return this.validateMaxSize(file);
  }

  protected validateMaxSize(file: File): boolean {
    if (
      this.fileValidity?.maxSize &&
      file.size / 1000000 > this.fileValidity?.maxSize
    ) {
      this.fileError.tooLarge = true;
      return false;
    } else {
      if (this.fileError.tooLarge !== undefined) {
        delete this.fileError.tooLarge;
      }
      return true;
    }
  }

  protected loadFile(file: File, form: FormGroup) {
    this.importService
      .loadFile(file)
      .pipe(
        tap((data: string[][]) => {
          if (data.toString().length === 0) {
            throw { empty: true };
          }
          if (!this.importToCartService.isDataParsable(data)) {
            throw { notParsable: true };
          }
        }),
        finalize(() => {
          form.get('file')?.updateValueAndValidity();
        })
      )
      .subscribe(
        (data: string[][]) => {
          this.fileError = {};
          this.loadedFile = data;
        },
        (error: InvalidFileInfo) => {
          this.fileError = error;
          this.loadedFile = null;
        }
      );
  }
}
