import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Input,
  OnDestroy
} from '@angular/core';
import { takeWhile } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { AbstractCmsComponent } from '../../cms/components/abstract-cms-component';
import { NavigationService } from './navigation.service';
import { CmsService } from '../../cms/facade/cms.service';

@Component({
  selector: 'cx-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationComponent extends AbstractCmsComponent
  implements OnDestroy {
  itemSubscription: Subscription;

  done = false;

  @Input()
  dropdownMode = 'list';
  @Input()
  node: any;

  constructor(
    protected cmsService: CmsService,
    protected cd: ChangeDetectorRef,
    private navigationService: NavigationService
  ) {
    super(cmsService, cd);
  }

  protected fetchData(): void {
    if (!this.component) {
      return;
    }
    const navigation = this.component.navigationNode
      ? this.component.navigationNode
      : this.component;

    this.itemSubscription = this.cmsService
      .getNavigationEntryItems(navigation.uid)
      .pipe(takeWhile(() => !this.done))
      .subscribe(items => {
        if (items === undefined) {
          this.navigationService.getNavigationEntryItems(navigation, true, []);
        } else {
          this.done = true;
          this.node = this.navigationService.createNode(navigation, items);
          if (!this.cd['destroyed']) {
            this.cd.detectChanges();
          }
        }
      });
  }

  ngOnDestroy() {
    if (this.itemSubscription) {
      this.done = true;
      this.itemSubscription.unsubscribe();
    }
    super.ngOnDestroy();
  }
}
