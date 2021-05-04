import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  CmsConfig,
  DeferLoadingStrategy,
  provideDefaultConfig,
} from '@spartacus/core';
import { ProfileTagComponent } from './profile-tag.component';

@NgModule({
  imports: [CommonModule],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        ProfileTagComponent: {
          component: ProfileTagComponent,
          deferLoading: DeferLoadingStrategy.INSTANT,
        },
      },
    }),
  ],
  exports: [ProfileTagComponent],
  declarations: [ProfileTagComponent],
})
export class ProfileTagCmsModule {}
