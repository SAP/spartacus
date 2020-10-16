import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import {
  OutletContextData,
  TableDataOutletContext,
} from '@spartacus/storefront';
import { OrganizationItemService } from '../organization-item.service';
import { OrganizationListService } from '../organization-list/organization-list.service';
import { MessageService } from '../organization-message/services/message.service';
import { OrganizationSubListService } from './organization-sub-list.service';

@Component({
  template: `
    <button *ngIf="hasItem" (click)="toggleAssign()" class="link">
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

  /**
   * Indicates whether the item is loaded.
   */
  get hasItem(): boolean {
    return !!this.item && Object.keys(this.item).length > 0;
  }

  get isAssigned(): boolean {
    return (this.item as any)?.selected;
  }

  toggleAssign() {
    this.notify = true;
    this.organizationItemService.key$
      .subscribe((key) => {
        this.isAssigned
          ? this.unassign(key, this.link)
          : this.assign(key, this.link);
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

  /**
   * Returns the key for the linked object.
   *
   * At the moment, we're using a generic approach to assign objects,
   * but the object do not have a normalized shape. Therefor, we need
   * to evaluate the context to return the right key for the associated
   * item.
   */
  protected get link(): string {
    return (
      this.outlet.context.code ??
      this.outlet.context.customerId ??
      this.outlet.context.uid
    );
  }

  protected get item(): T | null {
    if (!this.outlet.context) {
      return null;
    }
    const { _field, _options, _type, _i18nRoot, ...all } = this.outlet.context;
    return all as T;
  }

  ngOnDestroy() {
    // We're playing a dirty trick here; The store is not equipped with a
    // selector to select any updated assignments. Moreover, as soon as
    // an item is unassigned, it might not be available anymore. This is
    // why we add the message when this action is destroyed.
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
