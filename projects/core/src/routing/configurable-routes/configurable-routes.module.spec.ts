import { TestBed } from '@angular/core/testing';
import { ConfigurableRoutesModule } from './configurable-routes.module';
import { APP_INITIALIZER } from '@angular/core';
import { ConfigurableRoutesService } from './configurable-routes.service';

class MockConfigurableRoutesService {
  init = jasmine.createSpy().and.returnValue(Promise.resolve());
}

describe('ConfigurableRoutesModule', () => {
  let mockService: MockConfigurableRoutesService;

  it('should call RoutesConfigLoader#load function on app initialization', () => {
    TestBed.configureTestingModule({
      imports: [ConfigurableRoutesModule],
      providers: [
        {
          provide: ConfigurableRoutesService,
          useClass: MockConfigurableRoutesService
        }
      ]
    });

    mockService = TestBed.get(ConfigurableRoutesService);
    const appInits = TestBed.get(APP_INITIALIZER);
    const [appInitializerInvokingLoader] = appInits.slice(-1);

    expect(mockService.init).toHaveBeenCalledTimes(1);
    appInitializerInvokingLoader();
    expect(mockService.init).toHaveBeenCalledTimes(2);
  });
});
