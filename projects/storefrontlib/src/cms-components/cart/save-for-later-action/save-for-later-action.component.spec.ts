import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import {
  ActiveCartService,
  AuthService,
  Cart,
  FeaturesConfigModule,
  I18nTestingModule,
  OrderEntry,
  RoutingService,
  SelectiveCartService,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { SaveForLaterActionComponent } from './save-for-later-action.component';

class MockActiveCartService {
  removeEntry(): void {}
  loadDetails(): void {}
  updateEntry(): void {}
  getActive(): Observable<Cart> {
    return of<Cart>({ code: '123', totalItems: 1 });
  }
  getEntries(): Observable<OrderEntry[]> {
    return of([{}]);
  }
  isStable(): Observable<boolean> {
    return of(true);
  }
}

describe('SaveForLaterActionComponent', () => {
  let component: SaveForLaterActionComponent;
  let fixture: ComponentFixture<SaveForLaterActionComponent>;
  let activeCartService: ActiveCartService;

  const mockSelectiveCartService = jasmine.createSpyObj(
    'SelectiveCartService',
    [
      'getCart',
      'getLoaded',
      'removeEntry',
      'getEntries',
      'addEntry',
      'isEnabled',
    ]
  );

  const mockAuthService = jasmine.createSpyObj('AuthService', [
    'isUserLoggedIn',
  ]);

  const mockRoutingService = jasmine.createSpyObj('RoutingService', ['go']);

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          RouterTestingModule,
          I18nTestingModule,
          FeaturesConfigModule,
        ],
        declarations: [
            SaveForLaterActionComponent,
        ],
        providers: [
          { provide: SelectiveCartService, useValue: mockSelectiveCartService },
          { provide: AuthService, useValue: mockAuthService },
          { provide: RoutingService, useValue: mockRoutingService },
          {
            provide: ActiveCartService,
            useClass: MockActiveCartService,
          },
        ],
      }).compileComponents();

      mockSelectiveCartService.isEnabled.and.returnValue(true);
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveForLaterActionComponent);
    component = fixture.componentInstance;
    activeCartService = TestBed.inject(ActiveCartService);
  });

  it('should create save for later action component', () => {
    expect(component).toBeTruthy();
  });

  it('should move to save for later for login user', () => {
    const mockItem = {
      quantity: 5,
      product: {
        code: 'PR0000',
      },
    };
    mockAuthService.isUserLoggedIn.and.returnValue(of(true));
    mockSelectiveCartService.addEntry.and.callThrough();
    mockSelectiveCartService.getLoaded.and.returnValue(of(true));
    spyOn(activeCartService, 'removeEntry').and.callThrough();
    spyOn(activeCartService, 'getEntries').and.callThrough();
    spyOn(activeCartService, 'isStable').and.returnValue(of(true));
    fixture.detectChanges();
    component.saveForLater(mockItem);
    expect(activeCartService.removeEntry).toHaveBeenCalledWith(mockItem);
    expect(mockSelectiveCartService.addEntry).toHaveBeenCalledWith(
      mockItem.product.code,
      mockItem.quantity
    );
  });

  it('should go to login page for anonymous user', () => {
    const mockItem = {
      quantity: 5,
      product: {
        code: 'PR0000',
      },
    };
    mockAuthService.isUserLoggedIn.and.returnValue(of(false));
    component.saveForLater(mockItem);
    fixture.detectChanges();
    expect(mockRoutingService.go).toHaveBeenCalled();
  });

  it('should not show save for later when selective cart is disabled', () => {
    mockSelectiveCartService.isEnabled.and.returnValue(of(false));
    fixture.detectChanges();
    const el = fixture.debugElement.query(By.css('button'));
    expect(el).toBe(null);
  });

  it('should show save for later when selective cart is enabled', () => {
    fixture.detectChanges();
    const el = fixture.debugElement.query(By.css('button'));
    expect(el).toBeDefined();
  });

});
