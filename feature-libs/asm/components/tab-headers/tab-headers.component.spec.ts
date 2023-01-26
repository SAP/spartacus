import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
import { DirectionMode, DirectionService } from '@spartacus/storefront';
import { TabHeadersComponent } from './tab-headers.component';
import { TabHeader } from './tab-headers.model';

describe('AsmCustomer360Component', () => {

  class MockDirectionService {
    getDirection() {
      return DirectionMode.LTR;
    }
  }


  const mockTabItems: Array<TabHeader> = [
    {i18nNameKey: 'overviewTab'},
    {i18nNameKey: 'profileTab'},
    {i18nNameKey: 'activityTab'},
    {i18nNameKey: 'mapsTab'}
  ];



  let component: TabHeadersComponent;
  let fixture: ComponentFixture<TabHeadersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [TabHeadersComponent],
      providers: [
        {
          provide: DirectionService,
          useClass: MockDirectionService,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabHeadersComponent);
    component = fixture.componentInstance;
    component.tabHeaders = mockTabItems;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


});
