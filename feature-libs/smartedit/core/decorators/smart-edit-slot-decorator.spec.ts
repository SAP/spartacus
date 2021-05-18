import { TestBed } from '@angular/core/testing';
import { SmartEditService } from '../services/smart-edit.service';
import { SmartEditSlotDecorator } from './smart-edit-slot-decorator';

class MockSmartEditService {
  addSmartEditContract() {}
}
describe('SmartEditSlotDecorator', () => {
  let decorator: SmartEditSlotDecorator;
  let smartEditService: SmartEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SmartEditSlotDecorator,
        {
          provide: SmartEditService,
          useClass: MockSmartEditService,
        },
      ],
    });
    decorator = TestBed.inject(SmartEditSlotDecorator);
    smartEditService = TestBed.inject(SmartEditService);
  });

  it('should be created', () => {
    expect(decorator).toBeTruthy();
  });

  it('should call addSmartEditContract', () => {
    const slot = { properties: { smartedit: { uuid: 'test-id' } } };
    spyOn(smartEditService, 'addSmartEditContract');
    decorator.decorate(null, null, slot);
    expect(smartEditService.addSmartEditContract).toHaveBeenCalledWith(
      null,
      null,
      slot.properties
    );
  });
});
