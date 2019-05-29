import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
} from '@angular/core';
import { ICON_TYPE } from '../../misc/icon/index';
import { NavigationNode } from './navigation-node.model';

@Component({
  selector: 'cx-navigation-ui',
  templateUrl: './navigation-ui.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationUIComponent {
  iconTypes = ICON_TYPE;

  @Input() node: NavigationNode;

  /**
   * drives the UI behaviour, if flyout is set to true, the
   * nested child navitation nodes will only appear on hover or focus.
   */
  @Input() @HostBinding('class.flyout') flyout = true;

  getDepth(node: NavigationNode): number {
    let _depth = 0;
    const traverse = (_node: NavigationNode, depth: number) => {
      if (_node.children && _node.children.length > 0) {
        _depth = depth;
        _node.children.forEach(n => traverse(n, depth + 1));
      }
    };
    traverse(node, _depth + 1);
    return _depth;
  }
}
