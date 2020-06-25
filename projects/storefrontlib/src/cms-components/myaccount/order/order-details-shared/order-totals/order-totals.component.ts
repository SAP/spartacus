import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'cx-order-totals',
  templateUrl: './order-totals.component.html',
})
export class OrderTotalsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
