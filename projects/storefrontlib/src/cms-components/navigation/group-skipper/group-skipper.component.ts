import { Component, ChangeDetectionStrategy } from '@angular/core';
import { GroupSkipperService } from '@spartacus/core';

@Component({
  selector: 'cx-group-skipper',
  templateUrl: './group-skipper.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupSkipperComponent {
  constructor(public groupSkipperService: GroupSkipperService) {}
}
