import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RoutingService } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { GigyaStorefrontComponent } from './gigya.storefront.component';
import { GigyaJsComponent } from '../../cms-components/gigya-js/gigya-js.component';

@Component({
  selector: 'cx-asm',
  template: '',
})
class MockAsmRootComponent {}
@Component({
  selector: 'cx-header',
  template: '',
})
class MockHeaderComponent {}

@Component({
  selector: 'cx-global-message',
  template: '',
})
class MockGlobalMessagerComponent {}

@Component({
  selector: 'cx-page-slot',
  template: '',
})
class DynamicSlotComponent {}

@Component({
  selector: 'cx-footer',
  template: '',
})
class MockFooterComponent {}

class MockRoutingService {
  isNavigating(): Observable<boolean> {
    return of();
  }
}

@Component({
  selector: 'cx-schema',
  template: '',
})
class MockSchemaComponent {}

@Component({
  selector: 'cx-page-layout',
  template: '',
})
class MockPageLayoutComponent {}

describe('GigyaStorefrontComponent', () => {
  let component: GigyaStorefrontComponent;
  let fixture: ComponentFixture<GigyaStorefrontComponent>;
  let el: DebugElement;
  let routingService: RoutingService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [
        GigyaStorefrontComponent,
        MockHeaderComponent,
        MockGlobalMessagerComponent,
        MockFooterComponent,
        DynamicSlotComponent,
        MockPageLayoutComponent,
        MockAsmRootComponent,
        MockSchemaComponent,
        GigyaJsComponent,
      ],
      providers: [
        {
          provide: RoutingService,
          useClass: MockRoutingService,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GigyaStorefrontComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    routingService = TestBed.inject(RoutingService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain start-navigating class', () => {
    spyOn(routingService, 'isNavigating').and.returnValue(of(true));
    fixture.detectChanges();
    expect(
      el.nativeElement.classList.contains('start-navigating')
    ).toBeTruthy();
  });

  it('should contain stop-navigating class', () => {
    spyOn(routingService, 'isNavigating').and.returnValue(of(false));
    fixture.detectChanges();
    expect(el.nativeElement.classList.contains('stop-navigating')).toBeTruthy();
    expect(el.nativeElement.classList.contains('start-navigating')).toBeFalsy();
  });
});
