import { NgModule } from '@angular/core';
import { interceptors } from './http-interceptors/index';
import { SmartEditService } from './services/smart-edit.service';

@NgModule({
  providers: [...interceptors],
})
export class SmartEditCoreModule {
  constructor(private smartEditService: SmartEditService) {
    this.smartEditService.getDefaultPreviewCode();
  }
}
