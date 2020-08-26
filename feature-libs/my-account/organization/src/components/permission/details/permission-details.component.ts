import { ChangeDetectionStrategy, Component, TemplateRef } from '@angular/core';
import { Permission } from '@spartacus/core';
import { ModalService } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { shareReplay, switchMap, tap } from 'rxjs/operators';
import { PermissionService } from '../../../core/services/permission.service';
import { CurrentPermissionService } from '../services/current-permission.service';

@Component({
  selector: 'cx-permission-details',
  templateUrl: './permission-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PermissionDetailsComponent {
  permission$: Observable<Permission> = this.currentPermissionService.key$.pipe(
    tap((code) => this.permissionService.loadPermission(code)),
    switchMap((code) => this.permissionService.get(code)),
    shareReplay({ bufferSize: 1, refCount: true }) // we have side effects here, we want the to run only once
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
