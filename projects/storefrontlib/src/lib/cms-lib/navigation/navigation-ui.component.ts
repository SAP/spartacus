import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'y-navigation-ui',
  templateUrl: './navigation-ui.component.html',
  styleUrls: ['./navigation-ui.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationUIComponent {
  @Input()
  dropdownMode = 'list';
  @Input()
  node;
}
