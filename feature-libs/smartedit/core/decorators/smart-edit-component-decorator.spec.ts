import { TestBed } from '@angular/core/testing';
import { SmartEditService } from '../services/smart-edit.service';
import { SmartEditComponentDecorator } from './smart-edit-component-decorator';

class MockSmartEditService {
  addSmartEditContract() {}
}
describe('SmartEditComponentDecorator', () => {
  let decorator: SmartEditComponentDecorator;
  let smartEditService: SmartEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SmartEditComponentDecorator,
        {
          provide: SmartEditService,
          useClass: MockSmartEditService,
        },
      ],
    });
    decorator = TestBed.inject(SmartEditComponentDecorator);
    smartEditService = TestBed.inject(SmartEditService);
  });

  it('should be created', () => {
    expect(decorator).toBeTruthy();
  });

  it('should call addSmartEditContract', () => {
    const component = { properties: { smartedit: { uuid: 'test-id' } } };
    spyOn(smartEditService, 'addSmartEditContract');
    decorator.decorate(null, null, component);
    expect(smartEditService.addSmartEditContract).toHaveBeenCalledWith(
      null,
      null,
      component.properties
    );
  });
});
