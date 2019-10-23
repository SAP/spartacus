import { NgModule, ModuleWithProviders } from '@angular/core';
import { Config } from '../config/config.module';
import { GroupSkipperConfig } from './config/group-skipper.config';
import { GroupSkipperService } from './facade/group-skipper.service';

@NgModule({
  providers: [
    GroupSkipperService,
    { provide: GroupSkipperConfig, useExisting: Config },
  ],
})
export class GroupSkipperModule {
  static forRoot(): ModuleWithProviders<GroupSkipperModule> {
    return {
      ngModule: GroupSkipperModule,
      providers: [
        GroupSkipperService,
        { provide: GroupSkipperConfig, useExisting: Config },
      ],
    };
  }
}
