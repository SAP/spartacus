import {
  Injectable,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
  Input
} from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromStore from '../store';
import { ConfigService } from '../config.service';

@Injectable()
export abstract class AbstractCmsComponent {
  @Input() public component: any = null;
  protected uid: string;
  protected contextParameters: any;

  constructor(
    protected cd: ChangeDetectorRef,
    protected store: Store<fromStore.CmsState>,
    protected config: ConfigService
  ) {}

  setContextParameters(contextParameters: any) {
    this.contextParameters = contextParameters;
  }

  bootstrap() {
    this.store
      .select(fromStore.componentSelectorFactory(this.uid))
      .subscribe(componentData => {
        this.component = componentData;
        this.fetchData();
      });
  }

  protected fetchData() {
    if (!this.cd['destroyed']) {
      this.cd.detectChanges();
    }
    // can be used by implementations
  }

  setUid(uid: string) {
    this.uid = uid;
  }

  protected getBaseUrl() {
    return this.config.server.baseUrl;
  }

  // TODO: move to strategy
  /*protected mapUrl(url: string) {
    // console.warn('mapUrl', url);
    let newUrl = '';

    if (url) {
      const brandFragment = this.getUrlParam(url, '/Brands/');
      const categoryFragment = this.getUrlParam(url, '/c/');
      const productFragment = this.getUrlParam(url, '/p/');
      if (brandFragment) {
        newUrl = '/brand/' + categoryFragment;
      } else if (categoryFragment) {
        newUrl = '/category/' + categoryFragment;
      } else if (productFragment) {
        newUrl = '/product/' + productFragment;
      } else {
        if (url !== '/') {
          console.warn("couldn't map url", url);
        }
      }
    }
    return newUrl;
  }

  private getUrlParam(url, param) {
    const fragment = url.indexOf(param);
    return fragment > -1 ? url.substr(fragment + param.length) : null;
  }*/
}
