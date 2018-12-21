import { Injectable, OnDestroy, ChangeDetectorRef, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { CmsService } from '@spartacus/core';

/**
 * @deprecated Inject CmsComponentData instead
 */
@Injectable()
export abstract class AbstractCmsComponent implements OnDestroy {
  @Input()
  public component: any = null;
  protected uid: string;
  protected contextParameters: any;
  protected subscription: Subscription;

  constructor(
    protected cmsService: CmsService,
    protected cd: ChangeDetectorRef
  ) {}

  onCmsComponentInit(uid: string, contextParameters?: any): void {
    this.uid = uid;
    this.contextParameters = contextParameters;
    this.initSubscription();
  }

  protected initSubscription(): void {
    this.subscription = this.cmsService
      .getComponentData(this.uid)
      .subscribe(component => {
        this.component = component;
        this.fetchData();
      });
  }

  protected fetchData(): void {
    if (!this.cd['destroyed']) {
      this.cd.detectChanges();
    }
    // can be used by implementations
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
