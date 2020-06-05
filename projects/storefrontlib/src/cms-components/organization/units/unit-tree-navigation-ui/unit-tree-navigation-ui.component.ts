import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NavigationNode } from '../../../navigation/index';
import { ICON_TYPE } from '../../../misc/icon/index';

@Component({
  selector: 'cx-unit-tree-navigation-ui',
  templateUrl: './unit-tree-navigation-ui.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnitTreeNavigationUIComponent {
  @Input()
  node: NavigationNode;

  iconType = ICON_TYPE;
}
