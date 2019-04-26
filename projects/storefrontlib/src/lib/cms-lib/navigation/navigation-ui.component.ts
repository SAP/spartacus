import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NavigationNode } from './navigation-node.model';

@Component({
  selector: 'cx-navigation-ui',
  templateUrl: './navigation-ui.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationUIComponent {
  @Input() dropdownMode = 'list';
  @Input() node: NavigationNode;
}
