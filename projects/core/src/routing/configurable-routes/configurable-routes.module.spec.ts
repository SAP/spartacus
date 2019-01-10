import { TestBed } from '@angular/core/testing';
import { ConfigurableRoutesModule } from './configurable-routes.module';
import { RoutesConfigLoader } from './routes-config-loader';
import { APP_INITIALIZER } from '@angular/core';

class MockRoutesConfigLoader {
  load = jasmine.createSpy().and.returnValue(Promise.resolve());
}

describe('CongifurableRoutesModule', () => {
  let mockRoutesConfigLoader: MockRoutesConfigLoader;

  it('should call RoutesConfigLoader#load function on app initialization', () => {
    TestBed.configureTestingModule({
      imports: [ConfigurableRoutesModule],
      providers: [
        { provide: RoutesConfigLoader, useClass: MockRoutesConfigLoader }
      ]
    });

    mockRoutesConfigLoader = TestBed.get(RoutesConfigLoader);
    const appInits = TestBed.get(APP_INITIALIZER);
    const [appInitiaizerInvokingLoader] = appInits.slice(-1);

    expect(mockRoutesConfigLoader.load).toHaveBeenCalledTimes(1);
    appInitiaizerInvokingLoader();
    expect(mockRoutesConfigLoader.load).toHaveBeenCalledTimes(2);
  });
});
