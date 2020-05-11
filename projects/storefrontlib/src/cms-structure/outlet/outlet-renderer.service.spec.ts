import { TestBed } from '@angular/core/testing';
import { OutletRendererService } from './outlet-renderer.service';
import { OutletDirective } from './outlet.directive';

const outlet = 'mock-outlet';

class MockOutletDirective {
  render() {}
}

describe('OutletRendererService', () => {
  let outletRendererService: OutletRendererService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OutletRendererService],
    });

    outletRendererService = TestBed.inject(OutletRendererService);
  });

  it('should be created', () => {
    expect(outletRendererService).toBeTruthy();
  });

  it('should render using outlet the directive', () => {
    const mockDirective = new MockOutletDirective() as OutletDirective;
    const mockDirective2 = new MockOutletDirective() as OutletDirective;
    spyOn(mockDirective, 'render');
    spyOn(mockDirective2, 'render');

    outletRendererService.register(outlet, mockDirective);
    outletRendererService.register('not-outlet', mockDirective2);

    outletRendererService.render(outlet);
    expect(mockDirective.render).toHaveBeenCalled();
    expect(mockDirective2.render).not.toHaveBeenCalled();
  });

  it('should register outlet', () => {
    const mockDirective = new MockOutletDirective() as OutletDirective;
    outletRendererService.register(outlet, mockDirective);

    expect(outletRendererService['outletRefs'].value.get(outlet)).toEqual(
      mockDirective
    );
  });
});
