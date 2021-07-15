import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';
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
  CustomFormValidators,
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
  selectedFile: File;
  loadedFile: string[][] | null;
  fileError: InvalidFileInfo | {};

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

  protected build(): FormGroup {
    const form = new FormGroup({});
    form.setControl(
      'file',
      new FormControl('', [
        Validators.required,
        () => this.fileError,
        CustomFormValidators.fileMinSize(this.fileValidity),
        CustomFormValidators.fileMaxSize(this.fileValidity),
        CustomFormValidators.extensionValidator(this.fileValidity),
      ])
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

  selectFile(file: File, form: FormGroup) {
    this.selectedFile = file;
    this.importService.loadFile(file).subscribe(
      (data: string[][]) => {
        if (this.importToCartService.isDataParsable(data)) {
          this.fileError = {};
          this.loadedFile = data;
        } else {
          this.fileError = { notParsable: true };
          this.loadedFile = null;
        }
        form.get('file')?.updateValueAndValidity();
      },
      () => {
        this.fileError = { notParsable: true };
        this.loadedFile = null;
        form.get('file')?.updateValueAndValidity();
      }
    );
  }

  importProducts(): void {
    if (this.loadedFile) {
      this.importToCartService.loadProductsToCart(this.loadedFile, {
        name: this.form.get('name')?.value,
        description: this.form.get('description')?.value,
      });
    }
  }
}
