import {
  OnInit,
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewChild,
} from '@angular/core';
import { ViewComponent } from '@spartacus/storefront';
import { EntityGuard } from '../../../core/guards/entity.guard';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { OrganizationItemService } from '../organization-item.service';
import { MessageService } from '../organization-message/services/message.service';
import { BaseItem } from '../organization.model';

@Component({
  selector: 'cx-organization-card',
  templateUrl: './organization-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MessageService, EntityGuard],
})
export class OrganizationCardComponent<T extends BaseItem> implements OnInit {
  @Input() i18nRoot: string;
  @Input() previous: boolean | string = true;
  @Input() entity?: string;

  protected itemKey;

  item$: Observable<any>;

  @ViewChild(ViewComponent, { read: ViewComponent }) view: ViewComponent;

  constructor(
    protected itemService: OrganizationItemService<T>,
    protected messageService: MessageService,
    protected entityGuard: EntityGuard
  ) {}

  ngOnInit() {
    this.item$ = this.itemService.current$.pipe(
      map((item) => {
        if (
          this.i18nRoot.includes('details') ||
          this.i18nRoot.includes('edit')
        ) {
          /**
           * the only way to be able to trigger the guard after angular has rendered the template
           * other ways tried, but not working: after view init hook, ng zone onMicrotaskEmpty,
           * putting the guard in separate directive/child component in the template.
           */
          setTimeout(() => {
            this.entityGuard.canActivate(item, this.i18nRoot);
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
