import { NgModule } from '@angular/core';
import { MockTranslatePipe } from './mock-translate.pipe';
import { TranslationService } from '../translation.service';
import { MockTranslationService } from './mock-translation.service';
import { MockDatePipe } from './mock-date.pipe';

@NgModule({
  declarations: [MockTranslatePipe, MockDatePipe],
  exports: [MockTranslatePipe, MockDatePipe],
  providers: [
    { provide: TranslationService, useClass: MockTranslationService },
  ],
})
export class I18nTestingModule {}
