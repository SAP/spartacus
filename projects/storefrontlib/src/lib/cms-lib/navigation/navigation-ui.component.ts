import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { NavigationNode } from './navigation-node.model';

@Component({
  selector: 'cx-navigation-ui',
  templateUrl: './navigation-ui.component.html',
  styleUrls: ['./navigation-ui.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationUIComponent {
  @Input()
  dropdownMode = 'list';
  @Input()
  node: NavigationNode;
}
