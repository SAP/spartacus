import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CmsConfig, provideDefaultConfig } from '@spartacus/core';
import { ProfileTagComponent } from './profile-tag.component';

@NgModule({
  imports: [CommonModule],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        ProfileTagComponent: {
          component: ProfileTagComponent,
        },
      },
    }),
  ],
  exports: [ProfileTagComponent],
  declarations: [ProfileTagComponent],
  entryComponents: [ProfileTagComponent],
})
export class ProfileTagCmsModule {}
