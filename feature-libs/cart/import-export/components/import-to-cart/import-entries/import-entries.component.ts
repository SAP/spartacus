import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ImportExportConfig } from '@spartacus/cart/import-export/core';
import { ImportToCartService } from '../import-to-cart.service';

@Component({
  selector: 'cx-import-entries',
  templateUrl: './import-entries.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImportEntriesComponent {
  constructor(
    protected importExportConfig: ImportExportConfig,
    protected importToCartService: ImportToCartService
  ) {}

  allowedExtensions =
    this.importExportConfig.importExport.fileValidity?.allowedExtensions ?? '*';

  importProducts(file: FileList): void {
    this.importToCartService.loadProductsToCart(file);
  }
}
