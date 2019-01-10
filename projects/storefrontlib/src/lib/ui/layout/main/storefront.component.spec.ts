import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ConfigurableRoutesService } from '@spartacus/core';
import { StorefrontComponent } from './storefront.component';

@Component({
  selector: 'cx-header',
  template: ''
})
class MockHeaderComponent {}

@Component({
  selector: 'cx-global-message',
  template: ''
})
class MockGlobalMessagerComponent {}

@Component({
  selector: 'cx-footer',
  template: ''
})
class MockFooterComponent {}

class MockConfigurableRoutesService {
  init() {}
  translateRouterConfig() {}
}

describe('StorefrontComponent', () => {
  let component: StorefrontComponent;
  let configurableRoutesService: ConfigurableRoutesService;
  let fixture: ComponentFixture<StorefrontComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [
        StorefrontComponent,
        MockHeaderComponent,
        MockGlobalMessagerComponent,
        MockFooterComponent
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {
          provide: ConfigurableRoutesService,
          useClass: MockConfigurableRoutesService
        }
      ]
    }).compileComponents();

    configurableRoutesService = TestBed.get(ConfigurableRoutesService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StorefrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should set current language for routes', () => {
      spyOn(configurableRoutesService, 'translateRouterConfig');
      component.ngOnInit();
      expect(
        configurableRoutesService.translateRouterConfig
      ).toHaveBeenCalled();
    });
  });
});
