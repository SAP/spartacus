import { Component, Input } from '@angular/core';

@Component({
  selector: 'cx-navigation-ui',
  templateUrl: './navigation-ui.component.html',
  styleUrls: ['./navigation-ui.component.scss']
})
export class NavigationUIComponent {
  @Input()
  dropdownMode = 'list';
  @Input()
  node;
}
