import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DynamicSlotComponent } from './dynamic-slot.component';
import { ComponentWrapperDirective } from './component-wrapper.directive';
import { OutletDirective } from '../../../outlet';
import { CmsService } from '../../facade/cms.service';

class MockCmsService {
  getContentSlot() {}
}

describe('DynamicSlotComponent', () => {
  let dynamicSlotComponent: DynamicSlotComponent;
  let fixture: ComponentFixture<DynamicSlotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [
        DynamicSlotComponent,
        ComponentWrapperDirective,
        OutletDirective
      ],
      providers: [
        {
          provide: CmsService,
          useClass: MockCmsService
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicSlotComponent);
    dynamicSlotComponent = fixture.componentInstance;
    dynamicSlotComponent.position = 'left';

    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(dynamicSlotComponent).toBeTruthy();
  });
});
