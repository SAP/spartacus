import { Injectable, OnDestroy, ChangeDetectorRef, Input } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { CmsComponent } from './cms.component';
import { filter } from 'rxjs/operators';

@Injectable()
export abstract class AbstractCmsComponent implements CmsComponent, OnDestroy {
  @Input() public component: any = null;
  protected uid: string;
  protected load: boolean;
  protected contextParameters: any;
  protected subscription: Subscription;

  constructor(protected cd: ChangeDetectorRef) {}

  OnCmsComponentInit(
    uuid: string,
    componentData$: Observable<any>,
    contextParameters?: any
  ) {
    this.uid = uuid;
    this.contextParameters = contextParameters;

    this.subscription = componentData$
      .pipe(filter(Boolean))
      .subscribe(component => {
        this.component = component;
        this.fetchData();
      });
  }

  protected fetchData() {
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
