import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { OrganizationCellComponent } from '../organization-cell.component';

@Component({
  template: `
    <button class="button action">
      <cx-icon
        *ngIf="expanded; else showExpand"
        type="CARET_UP"
        (click)="collapse($event)"
      ></cx-icon>
      <ng-template #showExpand>
        <cx-icon type="CARET_DOWN" (click)="expand($event)"></cx-icon>
      </ng-template>
    </button>
    <a
      [routerLink]="{ cxRoute: route, params: routeModel } | cxUrl"
      [tabIndex]="tabIndex"
    >
      <span class="text">{{ property }} ({{ count }})</span>
    </a>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToggleLinkCellComponent extends OrganizationCellComponent {
  @HostBinding('style.--cx-nest-level')
  nestLevel = this.model.level;

  get tabIndex() {
    return 1;
  }

  get expanded() {
    return this.model.expanded;
  }

  get level() {
    return this.model.level;
  }

  get count() {
    return this.model.count;
  }

  collapse(event: Event) {
    this.model.expanded = false;
    event.stopPropagation();
  }

  expand(event: Event) {
    this.model.expanded = true;
    event.stopPropagation();
  }
}
