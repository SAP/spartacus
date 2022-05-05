import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ViewChild,
} from '@angular/core';
import { VisualViewerComponent } from '../../visual-viewer/visual-viewer.component';
import { VisualViewerService } from '../../visual-viewer/visual-viewer.service';
import { VisualPickingProductListComponent } from './product-list/visual-picking-product-list.component';
import { VisualPickingProductListService } from './product-list/visual-picking-product-list.service';
import { VisualPickingTabService } from './visual-picking-tab.service';

@Component({
  selector: 'cx-epd-visualization-visual-picking-tab',
  templateUrl: './visual-picking-tab.component.html',
  providers: [VisualPickingTabService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VisualPickingTabComponent implements AfterViewInit {
  constructor(protected visualPickingTabService: VisualPickingTabService) {}

  ngAfterViewInit(): void {
    this.visualPickingTabService.initialize(
      this.visualViewerService,
      this.visualPickingProductListService
    );
  }

  selectedProductCodes: string[] = [];

  @ViewChild(VisualViewerComponent, { read: VisualViewerService })
  visualViewerService: VisualViewerService;

  @ViewChild(VisualPickingProductListComponent, {
    read: VisualPickingProductListService,
  })
  visualPickingProductListService: VisualPickingProductListService;

  public get hideNoProductReferencesIndicator() {
    return this.visualPickingTabService.hideNoProductReferencesText;
  }

  public get hideProductList() {
    return this.visualPickingTabService.hideProductList;
  }

  public get hideViewport() {
    return this.visualPickingTabService.hideViewport;
  }
}
