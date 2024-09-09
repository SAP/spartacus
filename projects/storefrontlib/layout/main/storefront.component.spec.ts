import { Component, DebugElement, Directive, Input } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RoutingService } from '@spartacus/core';
import { EMPTY, Observable, of } from 'rxjs';
import { OutletDirective } from '../../cms-structure';
import { MockFeatureDirective } from '../../shared/test/mock-feature-directive';
import { HamburgerMenuService } from '../header/hamburger-menu/hamburger-menu.service';
import { StorefrontComponent } from './storefront.component';

@Component({
    selector: 'cx-header',
    template: '',
    standalone: true,
    imports: [RouterTestingModule],
})
class MockHeaderComponent {}

@Component({
    selector: 'cx-global-message',
    template: '',
    standalone: true,
    imports: [RouterTestingModule],
})
class MockGlobalMessageComponent {}

@Component({
    selector: 'cx-page-slot',
    template: '',
    standalone: true,
    imports: [RouterTestingModule],
})
class DynamicSlotComponent {}

@Component({
    selector: 'cx-footer',
    template: '',
    standalone: true,
    imports: [RouterTestingModule],
})
class MockFooterComponent {}

class MockRoutingService {
  isNavigating(): Observable<boolean> {
    return EMPTY;
  }
}

@Component({
    selector: 'cx-schema',
    template: '',
    standalone: true,
    imports: [RouterTestingModule],
})
class MockSchemaComponent {}

@Component({
    selector: 'cx-page-layout',
    template: '',
    standalone: true,
    imports: [RouterTestingModule],
})
class MockPageLayoutComponent {}

class MockHamburgerMenuService {
  toggle(_forceCollapse?: boolean): void {}
}

@Directive({
    selector: '[cxOutlet]',
    standalone: true,
})
class MockOutletDirective implements Partial<OutletDirective> {
  @Input() cxOutlet: string;
}

describe('StorefrontComponent', () => {
  let component: StorefrontComponent;
  let fixture: ComponentFixture<StorefrontComponent>;
  let el: DebugElement;
  let routingService: RoutingService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    imports: [RouterTestingModule, StorefrontComponent,
        MockHeaderComponent,
        MockGlobalMessageComponent,
        MockFooterComponent,
        DynamicSlotComponent,
        MockPageLayoutComponent,
        MockFeatureDirective,
        MockSchemaComponent,
        MockOutletDirective],
    providers: [
        {
            provide: RoutingService,
            useClass: MockRoutingService,
        },
        {
            provide: HamburgerMenuService,
            useClass: MockHamburgerMenuService,
        },
    ],
}).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StorefrontComponent);
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

  it('should collapse menu when header is expanded', () => {
    spyOn(component, 'collapseMenu').and.callThrough();

    const mockTarget = {};
    mockTarget['className'] = 'is-expanded';
    mockTarget['nodeName'] = 'HEADER';

    const mockEvent = {
      target: mockTarget,
    };

    component.collapseMenuIfClickOutside(mockEvent);
    expect(component.collapseMenu).toHaveBeenCalled();
  });

  it('should NOT collapse menu when header is NOT expanded', () => {
    spyOn(component, 'collapseMenu').and.callThrough();

    const mockTarget = {};
    mockTarget['nodeName'] = 'DIV';

    const mockEvent = {
      target: mockTarget,
    };
    component.collapseMenuIfClickOutside(mockEvent);
    expect(component.collapseMenu).not.toHaveBeenCalled();
  });
});
