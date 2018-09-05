import { NgModule } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [NgbDropdownModule.forRoot()],
  exports: [NgbDropdownModule]
})
export class BootstrapModule {}
