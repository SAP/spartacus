import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { GroupSkipperService } from '@spartacus/core';

@Component({
  selector: 'cx-group-skipper',
  templateUrl: './group-skipper.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupSkipperComponent implements OnInit {
  constructor(public groupSkipperService: GroupSkipperService) {}

  ngOnInit(): void {
    this.groupSkipperService.ngOnInit();
  }
}
