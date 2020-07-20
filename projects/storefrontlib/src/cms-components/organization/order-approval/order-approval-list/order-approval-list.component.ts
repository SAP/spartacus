import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'cx-order-approval-list',
  templateUrl: './order-approval-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderApprovalListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
