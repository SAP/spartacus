import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  ViewEncapsulation
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter, takeWhile, tap } from 'rxjs/operators';
import { AbstractCmsComponent } from '../../cms/components/abstract-cms-component';
import { ConfigService } from '../../cms/config.service';
import * as fromStore from '../../cms/store';
import { NavigationService } from './navigation.service';

@Component({
  selector: 'y-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None // To be removed once Material is removed from projects ( to style dialog )
})
export class NavigationComponent extends AbstractCmsComponent
  implements OnDestroy {
  static componentName = 'NavigationComponent';

  itemSubscription: Subscription;

  done = false;

  @Input() node;

  constructor(
    protected cd: ChangeDetectorRef,
    private navigationService: NavigationService,
    protected store: Store<fromStore.CmsState>,
    protected config: ConfigService
  ) {
    super(cd, store, config);
  }

  protected fetchData() {
    if (!this.component) {
      return;
    }
    const navigation = this.component.navigationNode
      ? this.component.navigationNode
      : this.component;

    this.itemSubscription = this.store
      .select(fromStore.itemsSelectorFactory(navigation.uid))
      .pipe(
        takeWhile(() => !this.done),
        tap(items => {
          if (items === undefined) {
            this.navigationService.getNavigationEntryItems(
              navigation,
              true,
              []
            );
          }
        }),
        filter(items => items !== undefined)
      )
      .subscribe(items => {
        this.done = true;
        this.node = this.navigationService.createNode(navigation, items);
        if (!this.cd['destroyed']) {
          this.cd.detectChanges();
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
