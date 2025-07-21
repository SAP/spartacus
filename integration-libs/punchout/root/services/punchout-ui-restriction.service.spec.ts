import { ComponentRef, Renderer2, RendererFactory2 } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AuthService } from '@spartacus/core';
import {
  PunchoutStoreService,
  PunchoutUiRestrictionService,
} from '@spartacus/punchout/root';
import { of } from 'rxjs';

describe('PunchoutUiRestrictionService', () => {
  let service: PunchoutUiRestrictionService;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockPunchoutStoreService: jasmine.SpyObj<PunchoutStoreService>;
  let mockRendererFactory: jasmine.SpyObj<RendererFactory2>;
  let mockRenderer: jasmine.SpyObj<Renderer2>;
  let mockRootComponent: jasmine.SpyObj<ComponentRef<any>>;

  const mockRootElement = document.createElement('div');

  beforeEach(() => {
    mockAuthService = jasmine.createSpyObj('AuthService', ['isUserLoggedIn']);
    mockPunchoutStoreService = jasmine.createSpyObj('PunchoutStoreService', [
      'getPunchoutState',
    ]);
    mockRenderer = jasmine.createSpyObj('Renderer2', [
      'addClass',
      'removeClass',
    ]);
    mockRendererFactory = jasmine.createSpyObj('RendererFactory2', [
      'createRenderer',
    ]);
    mockRendererFactory.createRenderer.and.returnValue(mockRenderer);

    // Mock the ComponentRef with a getter for the location property
    mockRootComponent = jasmine.createSpyObj('ComponentRef', [], {
      location: { nativeElement: mockRootElement },
    });

    TestBed.configureTestingModule({
      providers: [
        PunchoutUiRestrictionService,
        { provide: AuthService, useValue: mockAuthService },
        { provide: PunchoutStoreService, useValue: mockPunchoutStoreService },
        { provide: RendererFactory2, useValue: mockRendererFactory },
      ],
    });

    service = TestBed.inject(PunchoutUiRestrictionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('isPunchoutSessionActive', () => {
    it('should return true if user is logged in and punchoutSessionId exists', (done) => {
      mockAuthService.isUserLoggedIn.and.returnValue(of(true));
      mockPunchoutStoreService.getPunchoutState.and.returnValue(
        of({ punchoutSessionId: '12345' })
      );

      service.isPunchoutSessionActive().subscribe((result) => {
        expect(result).toBe(true);
        expect(mockAuthService.isUserLoggedIn).toHaveBeenCalled();
        expect(mockPunchoutStoreService.getPunchoutState).toHaveBeenCalled();
        done();
      });
    });

    it('should return false if user is logged in but no punchoutSessionId', (done) => {
      mockAuthService.isUserLoggedIn.and.returnValue(of(true));
      mockPunchoutStoreService.getPunchoutState.and.returnValue(
        of({ punchoutSessionId: undefined })
      );

      service.isPunchoutSessionActive().subscribe((result) => {
        expect(result).toBe(false);
        expect(mockAuthService.isUserLoggedIn).toHaveBeenCalled();
        expect(mockPunchoutStoreService.getPunchoutState).toHaveBeenCalled();
        done();
      });
    });

    it('should return false if user is not logged in', (done) => {
      mockAuthService.isUserLoggedIn.and.returnValue(of(false));

      service.isPunchoutSessionActive().subscribe((result) => {
        expect(result).toBe(false);
        expect(mockAuthService.isUserLoggedIn).toHaveBeenCalled();
        expect(
          mockPunchoutStoreService.getPunchoutState
        ).not.toHaveBeenCalled();
        done();
      });
    });
  });

  describe('updateClass', () => {
    it('should add the CSS class if punchout is active', () => {
      service.init(mockRootComponent); // Initialize the root element
      service['updateClass'](true);

      expect(mockRenderer.addClass).toHaveBeenCalledWith(
        mockRootElement,
        'cxPunchoutSessionActive'
      );
      expect(mockRenderer.removeClass).not.toHaveBeenCalled();
    });

    it('should remove the CSS class if punchout is not active', () => {
      service.init(mockRootComponent); // Initialize the root element
      service['updateClass'](false);

      expect(mockRenderer.removeClass).toHaveBeenCalledWith(
        mockRootElement,
        'cxPunchoutSessionActive'
      );
      expect(mockRenderer.addClass).not.toHaveBeenCalled();
    });

    it('should do nothing if rootElement is not initialized', () => {
      service['updateClass'](true);

      expect(mockRenderer.addClass).not.toHaveBeenCalled();
      expect(mockRenderer.removeClass).not.toHaveBeenCalled();
    });
  });

  describe('init', () => {
    it('should initialize the root element', () => {
      service.init(mockRootComponent);

      expect(service['rootElement']).toBe(mockRootElement);
    });
  });
});
