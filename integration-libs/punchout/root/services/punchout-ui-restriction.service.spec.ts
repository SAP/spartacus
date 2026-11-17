import { ComponentRef, Renderer2, RendererFactory2 } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AuthService } from '@spartacus/core';
import {
  PunchoutStoreService,
  PunchoutUiRestrictionService,
} from '@spartacus/punchout/root';
import { of } from 'rxjs';
import { vi } from 'vitest';
import { firstValueFrom } from 'rxjs';

describe('PunchoutUiRestrictionService', () => {
  let service: PunchoutUiRestrictionService;
  let mockAuthService: any;
  let mockPunchoutStoreService: any;
  let mockRendererFactory: any;
  let mockRenderer: any;
  let mockRootComponent: any;

  const mockRootElement = document.createElement('div');

  beforeEach(() => {
    mockAuthService = { isUserLoggedIn: vi.fn() };
    mockPunchoutStoreService = { getPunchoutState: vi.fn() };
    mockRenderer = {
      addClass: vi.fn(),
      removeClass: vi.fn(),
    };
    mockRendererFactory = { createRenderer: vi.fn() };
    mockRendererFactory.createRenderer.mockReturnValue(mockRenderer);

    // Mock the ComponentRef with a getter for the location property
    mockRootComponent = {
      location: { nativeElement: mockRootElement },
    };

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
    it('should return true if user is logged in and punchoutSessionId exists', async () => {
      mockAuthService.isUserLoggedIn.mockReturnValue(of(true));
      mockPunchoutStoreService.getPunchoutState.mockReturnValue(
        of({ punchoutSessionId: '12345' })
      );

      const result = await firstValueFrom(service.isPunchoutSessionActive());
      expect(result).toBe(true);
      expect(mockAuthService.isUserLoggedIn).toHaveBeenCalled();
      expect(mockPunchoutStoreService.getPunchoutState).toHaveBeenCalled();
    });

    it('should return false if user is logged in but no punchoutSessionId', async () => {
      mockAuthService.isUserLoggedIn.mockReturnValue(of(true));
      mockPunchoutStoreService.getPunchoutState.mockReturnValue(
        of({ punchoutSessionId: undefined })
      );

      const result = await firstValueFrom(service.isPunchoutSessionActive());
      expect(result).toBe(false);
      expect(mockAuthService.isUserLoggedIn).toHaveBeenCalled();
      expect(mockPunchoutStoreService.getPunchoutState).toHaveBeenCalled();
    });

    it('should return false if user is not logged in', async () => {
      mockAuthService.isUserLoggedIn.mockReturnValue(of(false));

      const result = await firstValueFrom(service.isPunchoutSessionActive());
      expect(result).toBe(false);
      expect(mockAuthService.isUserLoggedIn).toHaveBeenCalled();
      expect(
        mockPunchoutStoreService.getPunchoutState
      ).not.toHaveBeenCalled();
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
