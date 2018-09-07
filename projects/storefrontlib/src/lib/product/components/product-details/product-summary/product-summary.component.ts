import {
  Component,
  Input,
  ChangeDetectionStrategy,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'y-product-summary',
  templateUrl: './product-summary.component.html',
  styleUrls: ['./product-summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductSummaryComponent {
  @Output() onItemCountChange = new EventEmitter<any>();
  @Input() product: any;

  onUpdateCount(value) {
    this.onItemCountChange.emit(value);
  }
}
