import { Injectable } from '@angular/core';
import * as fromStore from './../../cms/store';
import { Store } from '@ngrx/store';

@Injectable()
export class NavigationService {
  constructor(private store: Store<fromStore.CmsState>) {}

  public createNode(data) {
    let itemsList = [];

    if (data.uid === 'FooterNavNode') {
      for (const child of data.children) {
        if (child.children) {
          for (const subchild of child.children) {
            for (const entry of subchild.entries) {
              itemsList.push({
                superType: entry.itemSuperType,
                id: entry.itemId
              });
            }
          }
        }
      }

      if (itemsList.length > 0) {
        this.store.dispatch(
          new fromStore.LoadNavigationItems({
            nodeId: 'FooterNavNode',
            items: itemsList
          })
        );
      }
    } else {
      for (const child of data.children) {
        if (child.entries && child.entries.length > 0) {
          for (const entry of child.entries) {
            itemsList.push({
              superType: entry.itemSuperType,
              id: entry.itemId
            });
          }
        }
      }
      if (itemsList.length > 0) {
        this.store.dispatch(
          new fromStore.LoadNavigationItems({
            nodeId: data.uid,
            items: itemsList
          })
        );
      }
    }
  }
}
