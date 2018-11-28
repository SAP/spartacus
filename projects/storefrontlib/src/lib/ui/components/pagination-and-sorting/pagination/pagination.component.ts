import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import {
  Component,
  Input,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'cx-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class PaginationComponent implements OnInit {
  @Input()
  pagination;
  @Output()
  viewPageEvent: EventEmitter<number> = new EventEmitter<number>();

  constructor() {}

  ngOnInit() {}

  pageChange(page: number): void {
    this.viewPageEvent.emit(page - 1);
  }
}
