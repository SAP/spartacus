import { ChangeDetectionStrategy, Component, TemplateRef } from '@angular/core';
import { Permission, PermissionService } from '@spartacus/core';
import { ModalService } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { shareReplay, switchMap, tap } from 'rxjs/operators';
import { CurrentPermissionService } from '../current-permission.service';

@Component({
  selector: 'cx-permission-details',
  templateUrl: './permission-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CurrentPermissionService],
})
export class PermissionDetailsComponent {
  permission$: Observable<
    Permission
  > = this.currentPermissionService.code$.pipe(
    tap((code) => this.permissionService.loadPermission(code)),
    switchMap(() => this.currentPermissionService.model$),
    // we have side effects here, we want the to run only once
    shareReplay({ bufferSize: 1, refCount: true })
  );

  constructor(
    protected permissionService: PermissionService,
    protected currentPermissionService: CurrentPermissionService,
    protected modalService: ModalService
  ) {}

  update(permission: Permission) {
    this.permissionService.update(permission.code, permission);
  }

  openModal(template: TemplateRef<any>): void {
    this.modalService.open(template, {
      centered: true,
    });
  }
}
