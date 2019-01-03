import {
  Component,
  ChangeDetectionStrategy,
  Input,
  OnDestroy
} from '@angular/core';
import { takeWhile } from 'rxjs/operators';
import { Subscription, BehaviorSubject } from 'rxjs';

import { NavigationService } from './navigation.service';
import { CmsService, CmsNavigationComponent } from '@spartacus/core';
import { CmsComponentData } from '../../cms/components/cms-component-data';

@Component({
  selector: 'cx-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationComponent implements OnDestroy {
  itemSubscription: Subscription;
  componentDataSubscription: Subscription;

  nodeSubject = new BehaviorSubject(null);
  node$ = this.nodeSubject.asObservable();

  done = false;

  @Input()
  dropdownMode = 'list';
  @Input()
  node: any;

  constructor(
    protected cmsService: CmsService,
    private navigationService: NavigationService,
    public component: CmsComponentData<CmsNavigationComponent>
  ) {
    this.componentDataSubscription = component.data$.subscribe(data => {
      this.done = false;
      if (this.itemSubscription) {
        this.itemSubscription.unsubscribe();
      }
      if (data) {
        const navigation = data.navigationNode ? data.navigationNode : data;
        this.itemSubscription = this.cmsService
          .getNavigationEntryItems(navigation.uid)
          .pipe(takeWhile(() => !this.done))
          .subscribe(items => {
            if (items === undefined) {
              this.navigationService.getNavigationEntryItems(
                navigation,
                true,
                []
              );
            } else {
              this.done = true;
              this.nodeSubject.next(
                this.navigationService.createNode(navigation, items)
              );
            }
          });
      }
    });
  }

  ngOnDestroy() {
    if (this.componentDataSubscription) {
      this.componentDataSubscription.unsubscribe();
    }
    if (this.itemSubscription) {
      this.done = true;
      this.itemSubscription.unsubscribe();
    }
  }
}
