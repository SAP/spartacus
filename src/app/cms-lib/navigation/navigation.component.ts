import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Input
} from '@angular/core';
import { AbstractCmsComponent } from '../../cms/components/abstract-cms-component';
import { NavigationService } from './navigation.service';
import { ConfigService } from '../../cms/config.service';
import { Store } from '@ngrx/store';
import * as fromStore from '../../cms/store';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'y-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationComponent extends AbstractCmsComponent {
  static componentName = 'NavigationComponent';

  node$;

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
    const data = this.component.navigationNode
      ? this.component.navigationNode
      : this.component;

    this.node$ = this.store
      .select(fromStore.getNavigationEntryItems)
      .subscribe(items => {
        if (!items.loading && items[data.uid] === undefined) {
          this.navigationService.createNode(data);
        }
      });
    this.cd.detectChanges();
  }
}
