import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'cx-config-previous-next-buttons',
  templateUrl: './config-previous-next-buttons.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigPreviousNextButtonsComponent {
  constructor() {}

  @Input() isFirstGroup: Observable<Boolean>;
  @Input() isLastGroup: Observable<Boolean>;

  @Output() nextGroup = new EventEmitter();
  @Output() previousGroup = new EventEmitter();

  onPrevious() {
    this.previousGroup.emit();
  }
  onNext() {
    this.nextGroup.emit();
  }
}
