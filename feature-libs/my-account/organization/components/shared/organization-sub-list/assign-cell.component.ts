import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import {
  OutletContextData,
  TableDataOutletContext,
} from '@spartacus/storefront';
import { OrganizationItemService } from '../organization-item.service';
import { OrganizationListService } from '../organization-list/organization-list.service';
import { MessageService } from '../organization-message/services/message.service';
import { OrganizationSubListService } from '../organization-sub-list/organization-sub-list.service';

@Component({
  template: `
    <button (click)="toggleAssign()" class="link">
      {{ isAssigned ? 'unassign' : 'assign' }}
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssignCellComponent<T> implements OnDestroy {
  /**
   * Indicates that we need to show a notification message.
   */
  notify = false;

  constructor(
    protected outlet: OutletContextData<TableDataOutletContext>,
    protected organizationItemService: OrganizationItemService<T>,
    protected messageService: MessageService,
    protected organizationSubListService: OrganizationListService<T>
  ) {}

  get isAssigned(): boolean {
    return this.outlet.context.selected;
  }

  toggleAssign() {
    this.notify = true;
    this.organizationItemService.key$
      .subscribe((key) => {
        this.isAssigned
          ? this.unassign(key, this.linkKey)
          : this.assign(key, this.linkKey);
      })
      .unsubscribe();
  }

  protected assign(key: string, linkKey: string): void {
    (this.organizationSubListService as OrganizationSubListService<T>).assign(
      key,
      linkKey
    );
  }

  protected unassign(key: string, linkKey: string): void {
    (this.organizationSubListService as OrganizationSubListService<T>).unassign(
      key,
      linkKey
    );
  }

  protected get linkKey() {
    return this.outlet.context.code || this.outlet.context.customerId;
  }

  ngOnDestroy() {
    // We're playing a dirty trick here; The store is not equipped with a selector to select
    // any updated assignments. Moreover, as soon as an item is unassigned, it might not be available
    // anymore. This is why we add the message when this action is destroyed.
    if (this.notify) {
      this.messageService.add({
        message: {
          key: this.outlet.context.selected
            ? this.organizationSubListService.viewType + '.unassigned'
            : this.organizationSubListService.viewType + '.assigned',
          params: {
            item: this.outlet.context,
          },
        },
      });
    }
  }
}
