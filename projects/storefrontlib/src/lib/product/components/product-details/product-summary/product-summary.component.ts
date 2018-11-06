import {
  Component,
  Input,
  ChangeDetectionStrategy,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'cx-product-summary',
  templateUrl: './product-summary.component.html',
  styleUrls: ['./product-summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductSummaryComponent {
  @Output()
  itemCountChange = new EventEmitter<any>();
  @Input()
  product: any;

  updateCount(value) {
    this.itemCountChange.emit(value);
  }
}
