import { Injectable } from '@angular/core';

@Injectable()
export class NavigationService {
  constructor() {}

  public createNode(data) {
    const node = {};
    const title = this.getLinkName(data);
    if (title) {
      node['title'] = data.title ? data.title : title;
    }

    const url = this.getUrl(data);
    if (url) {
      node['url'] = url;
    }

    const childs = this.createChilds(data);
    if (childs) {
      node['childs'] = childs;
    }
    return node;
  }

  private createChilds(node) {
    if (!node.children) {
      return;
    }
    const childs = [];
    for (const child of node.children) {
      const childNode = this.createNode(child);
      childs.push(childNode);
    }
    return childs;
  }

  private getUrl(child): string {
    let linkUrl = '';
    const link = this.getLink(child);
    if (link) {
      linkUrl = link.itemId; // TODO: Need to replace this with the actual titles
    }
    return linkUrl;
  }

  private getLinkName(node) {
    let linkName = '';
    const link = this.getLink(node);
    if (link) {
      linkName = link.itemId; // TODO: Need to replace this with the actual titles
    } else if (node.title) {
      linkName = node.title;
    }
    return linkName;
  }

  private getLink(child) {
    if (child.entries && child.entries.length > 0) {
      return child.entries[0];
    } else {
      return;
    }
  }
}
