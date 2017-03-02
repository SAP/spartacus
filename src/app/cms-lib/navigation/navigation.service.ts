import { Injectable } from '@angular/core';

@Injectable()
export class NavigationService {

    constructor() { }

    public createNode(data) {
        let node = {};
        let title = this.getLinkName(data);
        if (title) {
            node['title'] = title;
        }

        let url = this.getUrl(data);
        if (url) {
            node['url'] = url;
        }

        let childs = this.createChilds(data);
        if (childs) {
            node['childs'] = childs;
        }
        return node;
    }

    private createChilds(node) {
        if (!node.children) {
            return;
        }
        let childs = [];
        for (let child of node.children) {
            let childNode = this.createNode(child);
            childs.push(childNode);
        }
        return childs;
    }

    private getUrl(child): string {
        let link = this.getLink(child);
        return link ? link.url : '';
    }

    private getLinkName(node) {
        let linkName = '';
        let link = this.getLink(node);
        if (link) {
            linkName = (link.linkName) ? link.linkName : link.title;
        }else if (node.title) {
            linkName = node.title;
        }
        return linkName;
    }

    private getLink(child) {
        if (child.entries && child.entries.length > 0) {
            return child.entries[0].item;
        }else {
            return;
        }
    }

}
