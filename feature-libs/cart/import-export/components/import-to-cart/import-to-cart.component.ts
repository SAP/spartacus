import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { ImportToCartService } from './import-to-cart.service';
import { ImportExportConfig } from '@spartacus/cart/import-export/core';

@Component({
  selector: 'cx-import-to-cart',
  templateUrl: './import-to-cart.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImportToCartComponent {
  protected subscription = new Subscription();
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
