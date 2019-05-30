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
      const columnHeader = {
        isHeader: true,
        title: children[i].title,
        url: children[i].url,
      };

      const clonedChildren = children[i].children.slice(0);
      clonedChildren.unshift(columnHeader);
      while (clonedChildren.length > 0) {
        columns.push(clonedChildren.splice(0, 10));
      }
    }

    console.log('Columns');
    console.log(columns);
    return columns;
  }
}
