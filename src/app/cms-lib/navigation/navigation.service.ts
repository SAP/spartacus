import { Injectable } from '@angular/core';
import * as fromStore from './../../cms/store';
import { Store } from '@ngrx/store';

@Injectable()
export class NavigationService {
  constructor(private store: Store<fromStore.CmsState>) {}

  public createNode(data, rootUid) {
    const uid = rootUid;
    const itemsList = [];

    if (data.children) {
      for (const child of data.children) {
        if (child.children) {
          this.createNode(child, rootUid);
        } else if (child.entries && child.entries.length > 0) {
          for (const entry of child.entries) {
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
          nodeId: uid,
          items: itemsList
        })
      );
    }
  }
}
