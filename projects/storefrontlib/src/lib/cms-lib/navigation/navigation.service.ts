import { Injectable } from '@angular/core';
import { CmsService } from '../../cms/facade/cms.service';

@Injectable()
export class NavigationService {
  constructor(private cmsService: CmsService) {}

  /**
   * Get all navigation entry items' type and id. Dispatch action to load all these items
   * @param nodeData
   * @param root
   * @param itemsList
   */
  public getNavigationEntryItems(
    nodeData: any,
    root: boolean,
    itemsList = []
  ): void {
    if (nodeData.children) {
      this.processChildren(nodeData, itemsList);
    } else if (nodeData.entries && nodeData.entries.length > 0) {
      nodeData.entries.forEach(entry => {
        itemsList.push({
          superType: entry.itemSuperType,
          id: entry.itemId
        });
      });
    }

    if (root) {
      const rootUid = nodeData.uid;
      this.cmsService.loadNavigationItems(rootUid, itemsList);
    }
  }

  private processChildren(node, itemsList): void {
    for (const child of node.children) {
      this.getNavigationEntryItems(child, false, itemsList);
    }
  }

  /**
   * Create a new node tree for display
   * @param nodeData
   * @param items
   */
  public createNode(nodeData, items): any {
    const node = {};

    node['title'] = nodeData.title;
    node['url'] = '';

    if (nodeData.children) {
      const children = this.createChildren(nodeData, items);
      node['children'] = children;
    } else if (nodeData.entries && nodeData.entries.length > 0) {
      const entry = nodeData.entries[0];
      const item = items[`${entry.itemId}_${entry.itemSuperType}`];

      // now we only consider CMSLinkComponent
      if (entry.itemType === 'CMSLinkComponent' && item !== undefined) {
        if (!node['title']) {
          node['title'] = item.linkName;
        }
        node['url'] = item.url;
        // if "NEWWINDOW", target is true
        node['target'] = item.target;
      }
    }

    return node;
  }

  private createChildren(node, items) {
    const children = [];
    for (const child of node.children) {
      const childNode = this.createNode(child, items);
      children.push(childNode);
    }
    return children;
  }
}
