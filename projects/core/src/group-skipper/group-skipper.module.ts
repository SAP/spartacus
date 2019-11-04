import { NgModule, ModuleWithProviders } from '@angular/core';
import { Config, provideConfig } from '../config/config.module';
import { GroupSkipperConfig } from './config/group-skipper.config';
import { GroupSkipperService } from './facade/group-skipper.service';
import { defaultGroupSkipperConfig } from './config/default-group-skipper.config';

@NgModule({
  providers: [
    GroupSkipperService,
    { provide: GroupSkipperConfig, useExisting: Config },
    provideConfig(defaultGroupSkipperConfig),
  ],
})
export class GroupSkipperModule {
  static forRoot(): ModuleWithProviders<GroupSkipperModule> {
    return {
      ngModule: GroupSkipperModule,
      providers: [
        GroupSkipperService,
        { provide: GroupSkipperConfig, useExisting: Config },
        provideConfig(defaultGroupSkipperConfig),
      ],
    };
  }
}
