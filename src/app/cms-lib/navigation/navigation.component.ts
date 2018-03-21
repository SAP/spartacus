import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Input,
  OnDestroy
} from '@angular/core';
import { AbstractCmsComponent } from '../../cms/components/abstract-cms-component';
import { NavigationService } from './navigation.service';
import { ConfigService } from '../../cms/config.service';
import { Store } from '@ngrx/store';
import * as fromStore from '../../cms/store';
import { tap, filter } from 'rxjs/operators';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'y-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationComponent extends AbstractCmsComponent
  implements OnDestroy {
  static componentName = 'NavigationComponent';

  itemSubscription: Subscription;

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
        this.node = this.navigationService.createNode(navigation, items);
        if (!this.cd['destroyed']) {
          this.cd.detectChanges();
        }
      });
  }

  ngOnDestroy() {
    if (this.itemSubscription) {
      this.itemSubscription.unsubscribe();
    }
    super.ngOnDestroy();
  }
}
