import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'cx-view',
  templateUrl: './view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewComponent {}
