import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import {
  Component,
  Input,
  ChangeDetectionStrategy,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'y-product-paging',
  templateUrl: './product-paging.component.html',
  styleUrls: ['./product-paging.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductPagingComponent implements OnInit {
  @Input() pagination;
  @Output() viewPageEvent: EventEmitter<number> = new EventEmitter<number>();

  constructor() {}

  ngOnInit() {}

  pageChange(page: number) {
    this.viewPageEvent.emit(page);
  }
}
