import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import { AbstractCmsComponent } from '../../newcms/components/abstract-cms-component';
import { NavigationService } from './navigation.service';
import { Router } from '@angular/router';
import { ConfigService } from '../../newcms/config.service';
import { Store } from '@ngrx/store';
import * as fromStore from '../../newcms/store';

@Component({
  selector: 'y-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ConfigService]
})
export class NavigationComponent extends AbstractCmsComponent {
  node;

  constructor(
    protected cd: ChangeDetectorRef,
    private navigationService: NavigationService,
    private store1: Store<fromStore.CmsState>,
    private config1: ConfigService
  ) {
    super(cd, store1, config1);
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

  protected getUrl(link) {
    if (!link || !link.url) {
      return '';
    }
    let url = this.mapUrl(link.url);
    url += '/' + this.sanitizeName(link.title);
    return url;
  }

  private sanitizeName(name) {
    return name.replace(/\s/g, '-');
  }
}
