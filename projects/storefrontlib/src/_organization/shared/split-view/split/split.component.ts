import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
} from '@angular/core';
import { SplitService } from './split.service';

@Component({
  selector: 'cx-split',
  templateUrl: './split.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SplitComponent {
  @Input() @HostBinding('class.has-split') hasSplit = false;

  constructor(protected splitService: SplitService) {}

  split() {
    this.hasSplit = true;
    this.splitService.levelUp();
  }

  stitch() {
    this.hasSplit = false;
    this.splitService.levelDown();
  }
}
