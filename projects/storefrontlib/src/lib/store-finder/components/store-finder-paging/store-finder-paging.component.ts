import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  Input
} from '@angular/core';

@Component({
  selector: 'y-store-finder-paging',
  templateUrl: './store-finder-paging.component.html',
  styleUrls: ['./store-finder-paging.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StoreFinderPagingComponent implements OnInit {
  @Input() pagination;
  @Output() viewPageEvent: EventEmitter<number> = new EventEmitter<number>();

  constructor() {}

  ngOnInit() {}

  next(nextPage: number) {
    this.viewPageEvent.emit(nextPage);
  }

  previous(previousPage: number) {
    this.viewPageEvent.emit(previousPage);
  }
}
