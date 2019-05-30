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

  getColumns(children) {
    const columns = new Array();

    console.log('Children');
    console.log(children);

    // Column for each subcategory
    for (let i = 0; i < children.length; i++) {
      const clonedChildren = children[i].children.slice(0);
      console.log(clonedChildren);
      while (clonedChildren.length > 0) {
        columns.push(clonedChildren.splice(0, 10));
      }
    }

    console.log('Columns');
    console.log(columns);
    return columns;
  }

  getColumnSize(children) {
    return children.length;
    // return children.length / 10;
  }
}
