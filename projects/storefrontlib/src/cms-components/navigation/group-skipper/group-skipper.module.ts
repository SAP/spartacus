import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigModule, CmsConfig } from '@spartacus/core';
import { GroupSkipperComponent } from './group-skipper.component';

@NgModule({
  imports: [
    CommonModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        GroupSkipperComponent: {
          component: GroupSkipperComponent,
        },
      },
    }),
  ],
  declarations: [GroupSkipperComponent],
  exports: [GroupSkipperComponent],
  entryComponents: [GroupSkipperComponent],
})
export class GroupSkipperModule {}
