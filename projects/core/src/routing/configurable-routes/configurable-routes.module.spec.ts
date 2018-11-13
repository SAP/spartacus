import { TestBed } from '@angular/core/testing';
import { ConfigurableRoutesModule } from './configurable-routes.module';
import { RoutesConfigLoader } from './routes-config-loader';
import { APP_INITIALIZER } from '@angular/core';

const mockRoutesConfigLoader = {
  load: jasmine.createSpy().and.returnValue(Promise.resolve())
};

describe('CongifurableRoutesModule', () => {
  it('should call RoutesConfigLoader#load function on app initialization', () => {
    TestBed.configureTestingModule({
      imports: [ConfigurableRoutesModule],
      providers: [
        { provide: RoutesConfigLoader, useValue: mockRoutesConfigLoader }
      ]
    });

    const routesConfigLoader = TestBed.get(RoutesConfigLoader);
    const appInits = TestBed.get(APP_INITIALIZER);
    const [appInitiaizerInvokingLoader] = appInits.slice(-1);

    expect(routesConfigLoader.load).toHaveBeenCalledTimes(1);
    appInitiaizerInvokingLoader();
    expect(routesConfigLoader.load).toHaveBeenCalledTimes(2);
  });
});
