import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Product } from '@spartacus/core';
import { CurrentProductService } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { VisualViewerComponent } from '../../viewer/visual-viewer/visual-viewer.component';

@Component({
  selector: 'cx-spare-parts-tab',
  templateUrl: './spare-parts-tab.component.html',
})
export class SparePartsTabComponent implements OnInit, AfterViewInit {
  constructor(protected currentProductService: CurrentProductService) {}

  product$: Observable<Product | null>;
  selectedProductCodes: string[] = [];

  @ViewChild(VisualViewerComponent)
  private visualComponent!: VisualViewerComponent;

  ngOnInit(): void {
    this.product$ = this.currentProductService.getProduct();
  }

  ngAfterViewInit() {
    this.product$.subscribe((product) => {
      if (!product || !product.code) {
        return;
      }
      this.visualComponent.loadVisualization(product.code);
    });
  }
}
