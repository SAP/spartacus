import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'cx-split',
  templateUrl: './split.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SplitComponent implements OnInit {
  @Input() @HostBinding('class.has-split') hasSplit = false;
  @Output() hasSplitChange: EventEmitter<string> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  split() {
    this.hasSplit = true;
  }

  stitch() {
    this.hasSplit = false;
  }
}
