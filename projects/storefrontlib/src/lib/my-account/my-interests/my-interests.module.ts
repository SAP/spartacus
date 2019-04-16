import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CmsConfig, ConfigModule, I18nModule } from '@spartacus/core';


import { MyInterestsComponent } from './components/my-interests.component';

@NgModule({
  declarations: [MyInterestsComponent],
  imports: [
    CommonModule,
    I18nModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        MyInterestsComponent: {
          selector: 'cx-my-interests',
        }
      },
    }),
  ],
  exports: [MyInterestsComponent],
  entryComponents: [MyInterestsComponent]
})
export class MyInterestsModule { }
