import { NgModule } from '@angular/core';
import { smartEditDecorators } from './decorators/index';
import { interceptors } from './http-interceptors/index';
import { SmartEditService } from './services/smart-edit.service';

@NgModule({
  providers: [...smartEditDecorators, ...interceptors],
})
export class SmartEditCoreModule {
  constructor(private smartEditService: SmartEditService) {
    this.smartEditService.getDefaultPreviewCode();
  }
}
