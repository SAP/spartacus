import { Injectable, OnDestroy, ChangeDetectorRef, Input, Inject } from '@angular/core';

import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as fromStore from '../store';
import { CmsModuleConfig } from '../cms-module-config';
import { Config } from '../../config/config.module';

@Injectable()
export abstract class AbstractCmsComponent implements OnDestroy {
  @Input() public component: any = null;
  protected uid: string;
  protected load: boolean;
  protected contextParameters: any;
  protected subscription: Subscription;

  constructor(
    protected cd: ChangeDetectorRef,
    protected store: Store<fromStore.CmsState>,
    @Inject(Config) protected config: CmsModuleConfig
  ) {}

  setContextParameters(contextParameters: any) {
    this.contextParameters = contextParameters;
  }

  bootstrap() {
    this.subscription = this.store
      .select(fromStore.componentSelectorFactory(this.uid))
      .subscribe(componentData => {
        if (componentData === undefined && this.load) {
          this.store.dispatch(new fromStore.LoadComponent(this.uid));
        } else if (componentData != null) {
          this.component = componentData;
          this.uid = componentData.uid;
          this.fetchData();
        }
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

  setLoad(componentLoad: boolean) {
    this.load = componentLoad;
  }

  public getBaseUrl() {
    return this.config.server.baseUrl;
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
