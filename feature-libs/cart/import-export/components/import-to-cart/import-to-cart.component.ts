import { ChangeDetectionStrategy, Component } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ProductsData } from '../../core/model';
import { ImportExportService, ImportToCartService } from '../../core/services';

@Component({
  selector: 'cx-import-to-cart',
  templateUrl: './import-to-cart.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImportToCartComponent {
  constructor(
    protected importExportService: ImportExportService,
    protected importToCartService: ImportToCartService
  ) {}

  importProducts(file: FileList): void {
    this.importExportService
      .csvToData(file, true, {
        maxSize: 1,
        checkEmptyFile: true,
      })
      .pipe(catchError((error) => throwError(error)))
      .subscribe((csvData) => {
        this.importToCartService.addProductsToCart(csvData as ProductsData);
      });
  }
}
