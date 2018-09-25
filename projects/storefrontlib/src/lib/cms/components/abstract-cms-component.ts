import { Injectable, OnDestroy, ChangeDetectorRef, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { CmsComponent } from './cms.component';
import { CmsService } from '../facade/cms.service';

@Injectable()
export abstract class AbstractCmsComponent implements CmsComponent, OnDestroy {
  @Input() public component: any = null;
  protected uid: string;
  protected contextParameters: any;
  protected subscription: Subscription;

  constructor(
    protected cmsService: CmsService,
    protected cd: ChangeDetectorRef
  ) {}

  onCmsComponentInit(
    uid: string,
    contextParameters?: any,
    loadRequired?: boolean
  ) {
    this.uid = uid;
    this.contextParameters = contextParameters;

    this.subscription = this.cmsService
      .getComponentData(uid, loadRequired)
      .subscribe(component => {
        this.component = component;
        this.fetchData();
      });
  }

  protected fetchData() {
    if (!this.cd['destroyed']) {
      this.cd.markForCheck();
    }
    // can be used by implementations
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
