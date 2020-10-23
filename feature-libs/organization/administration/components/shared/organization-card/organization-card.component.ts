import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { ViewComponent } from '@spartacus/storefront';
import { ExistEntityItemGuard } from '../../../core/guards/exist-entity-item.guard';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { OrganizationItemService } from '../organization-item.service';
import { MessageService } from '../organization-message/services/message.service';
import { BaseItem } from '../organization.model';
import { ActiveEntityItemGuard } from '../../../core/guards/active-entity-item.guard';

@Component({
  selector: 'cx-organization-card',
  templateUrl: './organization-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MessageService, ExistEntityItemGuard, ActiveEntityItemGuard],
})
export class OrganizationCardComponent<T extends BaseItem>
  implements AfterViewInit {
  @Input() i18nRoot: string;
  @Input() previous: boolean | string = true;
  @Input() routeParam?: string;

  protected itemKey;

  item$: Observable<any>;

  @ViewChild(ViewComponent, { read: ViewComponent }) view: ViewComponent;

  constructor(
    protected itemService: OrganizationItemService<T>,
    protected messageService: MessageService,
    protected existEntityItemGuard: ExistEntityItemGuard,
    protected activeEntityItemGuard: ActiveEntityItemGuard
  ) {}

  ngAfterViewInit() {
    this.item$ = this.itemService.current$.pipe(
      map((item) => {
        /**
         * the only way to be able to trigger the guard after angular has rendered the template
         * other ways tried, but not working: after view init hook, ng zone onMicrotaskEmpty,
         * putting the guard in separate directive/child component in the template.
         */
        if (this.i18nRoot.includes('details')) {
          setTimeout(() => {
            this.existEntityItemGuard.canActivate(
              item,
              this.i18nRoot,
              this.routeParam
            );
          }, 1);
        } else if (
          Object.keys(item).length !== 0 &&
          this.i18nRoot.includes('edit')
        ) {
          setTimeout(() => {
            this.activeEntityItemGuard.canActivate(
              item,
              this.i18nRoot,
              this.routeParam
            );
          }, 1);
        }
      })
    );
  }

  /**
   * The views are router based, which means if we close a view, the router outlet is
   * cleaned immediately. To prevent this, we're closing the view manually, before
   * navigating back.
   */
  closeView(event: MouseEvent) {
    event.stopPropagation();
    this.view.toggle(true);

    setTimeout(() => {
      (event.target as HTMLElement)?.parentElement.click();
    }, 500);

    return false;
  }

  get previousLabel(): string {
    return this.previous as string;
  }

  protected refreshMessages(item: T) {
    if (item?.code !== this.itemKey) {
      this.messageService.clear();
    }
    this.itemKey = item?.code;
  }
}
