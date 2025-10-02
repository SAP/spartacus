/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderEntriesSource, ProductData } from '@spartacus/cart/base/root';
import { ImportExportConfig } from '@spartacus/cart/import-export/core';
import {
  FilesFormValidators,
  FormUtils,
  ImportCsvFileService,
  LaunchDialogService,
} from '@spartacus/storefront';
import { of, Subject } from 'rxjs';
import { filter, startWith, switchMap, take, tap } from 'rxjs/operators';
import { ImportProductsFromCsvService } from '../../import-products-from-csv.service';
import { GlobalMessageType } from '@spartacus/core';
import { NgIf } from '@angular/common';
import { MessageComponent } from '../../../../../../../projects/storefrontlib/cms-components/misc/message/message.component';
import { FocusDirective } from '../../../../../../../projects/storefrontlib/layout/a11y/keyboard-focus/focus.directive';
import { FileUploadComponent } from '../../../../../../../projects/storefrontlib/shared/components/form/file-upload/file-upload.component';
import { FormErrorsComponent } from '../../../../../../../projects/storefrontlib/shared/components/form/form-errors/form-errors.component';
import { TranslatePipe } from '../../../../../../../projects/core/src/i18n/translate.pipe';
import { MockTranslatePipe } from '../../../../../../../projects/core/src/i18n/testing/mock-translate.pipe';

@Component({
    selector: 'cx-import-entries-form',
    templateUrl: './import-entries-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        NgIf,
        FormsModule,
        ReactiveFormsModule,
        MessageComponent,
        FocusDirective,
        FileUploadComponent,
        FormErrorsComponent,
        TranslatePipe,
        MockTranslatePipe,
    ],
})
export class ImportEntriesFormComponent implements OnInit {
  form: UntypedFormGroup;
  loadedFile: string[][] | null;
  formSubmitSubject$ = new Subject();
  globalMessageType = GlobalMessageType;

  @Output()
  submitEvent = new EventEmitter<{
    products: ProductData[];
  }>();

  @Input()
  type: OrderEntriesSource;

  constructor(
    protected launchDialogService: LaunchDialogService,
    protected importToCartService: ImportProductsFromCsvService,
    protected importCsvService: ImportCsvFileService,
    protected filesFormValidators: FilesFormValidators,
    protected importExportConfig: ImportExportConfig
  ) {}

  ngOnInit() {
    this.form = this.buildForm();

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
      .subscribe(() => {
        this.save();
      });
  }

  close(reason: string): void {
    this.launchDialogService.closeDialog(reason);
  }

  save(): void {
    const file: File = this.form.get('file')?.value?.[0];
    if (this.separator !== undefined) {
      this.importCsvService
        .loadFile(file, this.separator)
        .subscribe((loadedFile: string[][]) => {
          this.submitEvent.emit({
            products: this.importToCartService.csvDataToProduct(loadedFile),
          });
        });
    }
  }

  protected buildForm(): UntypedFormGroup {
    const form = new UntypedFormGroup({});
    form.setControl(
      'file',
      new UntypedFormControl(
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
    return form;
  }

  public get allowedTypes(): string[] | undefined {
    return this.importExportConfig.cartImportExport?.import?.fileValidity
      ?.allowedTypes;
  }

  protected get maxSize(): number | undefined {
    return this.importExportConfig.cartImportExport?.import?.fileValidity
      ?.maxSize;
  }

  protected get maxEntries(): number | undefined {
    return this.importExportConfig.cartImportExport?.import?.fileValidity
      ?.maxEntries?.[this.type];
  }

  protected get separator(): string | undefined {
    return this.importExportConfig.cartImportExport?.file.separator;
  }
}
