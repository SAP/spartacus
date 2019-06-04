import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { NavigationNode } from './navigation-node.model';

const COLUMN_SIZE = 10;

@Component({
  selector: 'cx-navigation-ui',
  templateUrl: './navigation-ui.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationUIComponent implements OnInit {
  @Input() dropdownMode = 'list';
  @Input() node: NavigationNode;
  columns;

  getColumns(children) {
    const columns = [];

    // Iterate subcategories
    for (let i = 0; i < children.length; i++) {
      // Column header node for each subcategory
      const columnHeader: NavigationNode = {
        isHeader: true,
        title: children[i].title,
        url: children[i].url,
      };

      // Split subcategory items and header into columns
      if (children[i].children) {
        const clonedChildren = [columnHeader, ...children[i].children];
        while (clonedChildren.length > 0) {
          columns.push(clonedChildren.splice(0, COLUMN_SIZE));
        }
      } else {
        // Push header only in case of no subcategory items
        columns.push([columnHeader]);
      }
    }

    return columns;
  }

  ngOnInit() {
    if (this.node.children) {
      this.columns = this.getColumns(this.node.children);
    }
  }
}
