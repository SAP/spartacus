import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'cx-view',
  templateUrl: './view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
