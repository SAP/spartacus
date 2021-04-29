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
import { ImportService } from '../../../core/services/import.service';

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
  allowedExtensions =
    this.importExportConfig.importExport.fileValidity?.allowedExtensions ?? '*';

  close(reason: string): void {
    this.launchDialogService.closeDialog(reason);
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

  selectFile(file: File, form: FormGroup) {
    this.selectedFile = file;
    this.importService.loadFile(file).subscribe(
      (data) => {
        this.fileError = {};
        this.loadedFile = data as string[][];
        form.get('file')?.updateValueAndValidity();
      },
      (error) => {
        this.fileError = error;
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
