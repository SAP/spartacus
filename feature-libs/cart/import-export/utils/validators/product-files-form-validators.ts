import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { ImportToCartService } from 'feature-libs/cart/import-export/components/import-to-cart';
import { ImportCsvService } from 'feature-libs/cart/import-export/core/services';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductFilesFormValidators {
  constructor(
    protected importService: ImportCsvService,
    protected importToCartService: ImportToCartService
  ) {}

  parsableFile(control: AbstractControl): Observable<ValidationErrors | null> {
    const errors: ValidationErrors = {};
    const file: File = control.value[0];
    return this.importService.loadCsvData(file).pipe(
      map((data: string[][]) => {
        if (!this.importToCartService.isDataParsable(data)) {
          errors.notParsable = true;
        }
      }),
      map(() => (Object.keys(errors).length === 0 ? null : errors))
    );
  }
}
