import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NavigationNode } from './navigation-node.model';

const COLUMN_SIZE = 10;

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

    // Iterate subcategories
    for (let i = 0; i < children.length; i++) {
      // Column header for each subcategory
      const columnHeader = {
        isHeader: true,
        title: children[i].title,
        url: children[i].url,
      };

      // Split subcategory items and header into columns
      if (children[i].children) {
        const clonedChildren = children[i].children.slice(0);
        clonedChildren.unshift(columnHeader);
        while (clonedChildren.length > 0) {
          columns.push(clonedChildren.splice(0, COLUMN_SIZE));
        }
      } else {
        // Push header only in case of no subcategory items
        const headerArray = new Array();
        headerArray.push(columnHeader);
        columns.push(headerArray);
      }
    }

    return columns;
  }
}
