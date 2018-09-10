import {
    Component,
    Input,
    Output,
    ChangeDetectionStrategy,
    EventEmitter
  } from '@angular/core';
  
  @Component({
    selector: 'y-product-view',
    templateUrl: './product-view.component.html',
    styleUrls: ['./product-view.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
  })
  export class ProductViewComponent {
    @Input() grid;
    @Input() sortOptions;
  
    constructor() {}
  
  }
  