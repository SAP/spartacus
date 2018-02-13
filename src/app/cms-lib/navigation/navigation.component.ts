import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Input
} from '@angular/core';
import { AbstractCmsComponent } from '../../cms/components/abstract-cms-component';
import { NavigationService } from './navigation.service';
import { Router } from '@angular/router';
import { ConfigService } from '../../cms/config.service';
import { Store } from '@ngrx/store';
import * as fromStore from '../../cms/store';

@Component({
  selector: 'y-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationComponent extends AbstractCmsComponent {
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
    const data = this.component.navigationNode
      ? this.component.navigationNode
      : this.component;
    this.node = this.navigationService.createNode(data);
    this.cd.detectChanges();
  }
}
