import { NgModule } from '@angular/core';
import { MockTranslatePipe } from './mock-translate.pipe';

@NgModule({
  declarations: [MockTranslatePipe],
  exports: [MockTranslatePipe]
})
export class I18nTestingModule {}
