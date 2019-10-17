import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Configurator } from '@spartacus/core';

@Component({
  selector: 'cx-config-previous-next-buttons',
  templateUrl: './config-previous-next-buttons.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigPreviousNextButtonsComponent {
  constructor() {}

  @Input() group: Configurator.Group;
  @Input() groupList: Configurator.Group[];

  @Output() nextGroup = new EventEmitter();
  @Output() previousGroup = new EventEmitter();

  onPrevious() {
    this.previousGroup.emit(this.group);
  }
  onNext() {
    this.nextGroup.emit(this.group);
  }

  isPreviousButtonDisabled() {
    return this.groupList.indexOf(this.group) === 0;
  }

  isNextButtonDisabled() {
    return this.groupList.indexOf(this.group) === this.groupList.length - 1;
  }
}
