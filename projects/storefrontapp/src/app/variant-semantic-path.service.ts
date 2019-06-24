import { NgModule } from '@angular/core';
import {
  SemanticPathService,
  UrlCommand,
  UrlCommandRoute,
  UrlCommands,
} from '@spartacus/core';

export class VariantSemanticPathService extends SemanticPathService {
  private mapping = {
    M35364_R: {
      code: '300052678',
      name: 'T-Shirt-Men-Playboard-Logo-Tee-red-S',
    },
    M35365_G: {
      code: '300147511',
      name: 'T-Shirt-Men-Playboard-Logo-Tee-irish-green-M',
    },
    M35366_B: {
      code: '300067374',
      name: 'T-Shirt-Men-Playboard-Logo-Tee-black-L',
    },

    '118871_plaid': { code: '300785814', name: 'Maguro-Pu-Belt-plaid-LXL' },
    '118871_print': { code: '300608277', name: 'Maguro-Pu-Belt-print-LXL' },

    '122379_black': { code: '300613490', name: 'Seizure-Satchel-black-Uni' },
    '122379_brown': { code: '300613491', name: 'Seizure-Satchel-brown-Uni' },
  };

  transform(commands: UrlCommands): any[] {
    if (!Array.isArray(commands)) {
      commands = [commands];
    }

    commands = commands.map(command =>
      this.isProductRoute(command) ? this.map(command) : command
    );

    return super.transform(commands);
  }

  private isProductRoute(command: UrlCommand): boolean {
    return command && command.cxRoute === 'product';
  }

  private map(command: UrlCommandRoute) {
    const mapping = this.mapping[command.params.code];
    return mapping
      ? {
          ...command,
          params: {
            ...command.params,
            code: mapping.code,
            name: mapping.name,
          },
        }
      : command;
  }
}

@NgModule({
  providers: [
    {
      provide: SemanticPathService,
      useClass: VariantSemanticPathService,
    },
  ],
})
export class VariantRoutingModule {}
