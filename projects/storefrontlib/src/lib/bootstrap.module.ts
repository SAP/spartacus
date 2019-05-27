import { NgModule } from '@angular/core';
import {
  NgbCollapseModule,
  NgbDropdownModule,
  NgbModalModule,
  NgbPaginationModule,
  NgbTabsetModule,
} from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  imports: [
    NgbDropdownModule,
    NgbPaginationModule,
    NgbModalModule,
    NgbTabsetModule,
    NgbCollapseModule,
  ],
  exports: [
    NgbDropdownModule,
    NgbTabsetModule,
    NgbCollapseModule,
    NgbModalModule,
    NgbPaginationModule,
  ],
})
export class BootstrapModule {}
