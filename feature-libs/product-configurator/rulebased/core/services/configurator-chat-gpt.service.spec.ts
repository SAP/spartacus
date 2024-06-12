import { TestBed, waitForAsync } from '@angular/core/testing';
import { ConfiguratorChatGptService } from './configurator-chat-gpt.service';
import { LoggerService, Product, ProductService } from '@spartacus/core';
import {
  CommonConfigurator,
  ConfiguratorModelUtils,
  ConfiguratorRouter,
  ConfiguratorRouterExtractorService,
  ConfiguratorType,
} from '@spartacus/product-configurator/common';
import { Observable, of } from 'rxjs';
import {
  ChatGptBtpConnector,
  Configurator,
  ConfiguratorCommonsService,
  ConfiguratorGroupsService,
} from '@spartacus/product-configurator/rulebased';
import { ConfiguratorChatGptMapperService } from './configurator-chat-gpt-mapper.service';

const product: Product = { code: 'pCode' };

const router: ConfiguratorRouter.Data = {
  pageType: ConfiguratorRouter.PageType.CONFIGURATION,
  isOwnerCartEntry: true,
  owner: ConfiguratorModelUtils.createOwner(
    CommonConfigurator.OwnerType.PRODUCT,
    '3',
    ConfiguratorType.VARIANT
  ),
};

class MockLoggerService {
  log(): void {}
  warn(): void {}
  error(): void {}
  info(): void {}
  debug(): void {}
}

class MockChatGptBtpConnector {
  ask() {}
}

class MockConfiguratorChatGptMapperService {
  serializeConfiguration() {}

  isSingleValued() {}

  flatMapGroups() {}
}

let configurationObs: any;

class MockConfiguratorCommonsService {
  getConfiguration(): Observable<Configurator.Configuration> {
    return configurationObs;
  }
}

class MockConfigRouterExtractorService {
  extractRouterData() {
    return of(router);
  }
}

class MockConfiguratorGroupService {
  navigateToGroup() {}
}

class MockProductService {
  get(): Observable<Product> {
    return of(product);
  }
}

describe('ConfiguratorChatGptService', () => {
  let classUnderTest: ConfiguratorChatGptService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        providers: [
          ConfiguratorChatGptService,
          { provide: LoggerService, useClass: MockLoggerService },
          {
            provide: ChatGptBtpConnector,
            useClass: MockChatGptBtpConnector,
          },
          {
            provide: ConfiguratorChatGptMapperService,
            useClass: MockConfiguratorChatGptMapperService,
          },
          {
            provide: ConfiguratorCommonsService,
            useClass: MockConfiguratorCommonsService,
          },
          {
            provide: ConfiguratorRouterExtractorService,
            useClass: MockConfigRouterExtractorService,
          },
          {
            provide: ConfiguratorGroupsService,
            useClass: MockConfiguratorGroupService,
          },
          {
            provide: ProductService,
            useClass: MockProductService,
          },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    classUnderTest = TestBed.inject(ConfiguratorChatGptService);
  });

  it('should create', () => {
    expect(classUnderTest).toBeDefined();
  });
});
