import { NgModule, ModuleWithProviders } from '@angular/core';
import { Config, provideConfig } from '../config/config.module';
import { GroupSkipperSlotConfig } from './config/group-skipper.config';
import { GroupSkipperService } from './facade/group-skipper.service';
import { defaultGroupSkipperSlotConfig } from './config/default-group-skipper.config';

@NgModule({
  providers: [
    GroupSkipperService,
    { provide: GroupSkipperSlotConfig, useExisting: Config },
    provideConfig(defaultGroupSkipperSlotConfig),
  ],
})
export class GroupSkipperModule {
  static forRoot(): ModuleWithProviders<GroupSkipperModule> {
    return {
      ngModule: GroupSkipperModule,
      providers: [
        GroupSkipperService,
        { provide: GroupSkipperSlotConfig, useExisting: Config },
        provideConfig(defaultGroupSkipperSlotConfig),
      ],
    };
  }
}
