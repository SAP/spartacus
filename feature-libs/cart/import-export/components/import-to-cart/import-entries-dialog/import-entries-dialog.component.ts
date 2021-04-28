import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ImportExportConfig } from '@spartacus/cart/import-export/core';
import {
  FocusConfig,
  ICON_TYPE,
  LaunchDialogService,
} from '@spartacus/storefront';
import { ImportToCartService } from '../import-to-cart.service';
import { InvalidFileInfo } from '../../../core/model/import-to-cart.model';

@Component({
  selector: 'cx-import-entries-dialog',
  templateUrl: './import-entries-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImportEntriesDialogComponent {
  iconTypes = ICON_TYPE;
  form: FormGroup = this.build();
  focusConfig: FocusConfig = {
    trap: true,
    block: true,
    autofocus: 'button',
    focusOnEscape: true,
  };
  descriptionMaxLength: number = 250;
  nameMaxLength: number = 50;
  selectedFile: string[][] | null;
  fileName: FileList;
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
    protected importToCartService: ImportToCartService
  ) {}
  allowedExtensions =
    this.importExportConfig.importExport.fileValidity?.allowedExtensions ?? '*';

  close(reason: string): void {
    this.launchDialogService.closeDialog(reason);
  }

  protected build(): FormGroup {
    const form = new FormGroup({});
    form.setControl(
      'fileName',
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

  selectFile(file: FileList, form: FormGroup) {
    this.fileName = file;
    this.importToCartService.load(file).subscribe(
      (data) => {
        this.fileError = {};
        this.selectedFile = data as string[][];
        form.get('fileName')?.updateValueAndValidity();
      },
      (error) => {
        this.fileError = error;
        this.selectedFile = null;
        form.get('fileName')?.updateValueAndValidity();
      }
    );
  }

  importProducts(): void {
    if (this.selectedFile) {
      this.importToCartService.loadProductsToCart(this.selectedFile, {
        name: this.form.get('name')?.value,
        description: this.form.get('description')?.value,
      });
    }
  }
}
