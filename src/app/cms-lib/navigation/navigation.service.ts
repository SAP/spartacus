import { Injectable } from '@angular/core';
import * as fromStore from './../../cms/store';
import { Store } from '@ngrx/store';

@Injectable()
export class NavigationService {
  constructor(private store: Store<fromStore.CmsState>) {}

  public createNode(data) {
    const uid = data.uid;
    const childList = [];
    // if (data.children !== undefined) {
    //   this.createChilds(data);
    // }

    // const itemId = this.getItemId(data);
    // const itemSuperType = this.getItemSuperType(data);

    // links.push({ superType: itemSuperType, id: itemId });

    // this.store.dispatch(
    //   new fromStore.LoadNavigationItems({
    //     nodeId: uid,
    //     items: links
    //   })
    // );
    // console.log(uid);
    // console.log(links);

    if (data.children) {
    }
  }

  // private createChilds(node) {
  //   const childs = [];

  //   for (const child of node.children) {
  //     this.createNode(child, node.uid);
  //   }
  // }

  // private getItemSuperType(node) {
  //   let superType = '';
  //   const link = this.getLink(node);
  //   if (link) {
  //     superType = link.itemSuperType;
  //   } else if (node.itemSuperType) {
  //     superType = node.itemSuperType;
  //   }
  //   return superType;
  // }

  // private getItemId(node) {
  //   let id = '';
  //   const link = this.getLink(node);
  //   if (link) {
  //     id = link.itemId;
  //   } else if (node.title) {
  //     id = node.title;
  //   }
  //   return id;
  // }

  // private getLink(child) {
  //   if (child && child.entries && child.entries.length > 0) {
  //     return child.entries[0];
  //   } else {
  //     return;
  //   }
  // }
}
