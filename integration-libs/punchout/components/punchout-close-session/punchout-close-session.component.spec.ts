import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  PunchoutFacade,
  PunchoutUiRestrictionService,
} from '@spartacus/punchout/root';
import { of } from 'rxjs';
import { PunchoutCloseSessionComponent } from './punchout-close-session.component';

describe('PunchoutCloseSessionComponent', () => {
  let component: PunchoutCloseSessionComponent;
  let fixture: ComponentFixture<PunchoutCloseSessionComponent>;
  let mockPunchoutFacade: { closePunchoutSession: ReturnType<typeof vi.fn> };
  let mockPunchoutUiRestrictionService: {
    isPunchoutSessionActive: ReturnType<typeof vi.fn>;
  };

  beforeEach(async () => {
    mockPunchoutFacade = {
      closePunchoutSession: vi.fn(),
    };
    mockPunchoutUiRestrictionService = {
      isPunchoutSessionActive: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [PunchoutCloseSessionComponent],
      providers: [
        { provide: PunchoutFacade, useValue: mockPunchoutFacade },
        {
          provide: PunchoutUiRestrictionService,
          useValue: mockPunchoutUiRestrictionService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PunchoutCloseSessionComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should expose isPunchoutSessionActive$ observable from service', () => {
    const expected$ = of(true);
    mockPunchoutUiRestrictionService.isPunchoutSessionActive.mockReturnValue(
      expected$
    );

    fixture = TestBed.createComponent(PunchoutCloseSessionComponent);
    component = fixture.componentInstance;

    component.isPunchoutSessionActive$.subscribe((value) => {
      expect(value).toBe(true);
    });

    expect(
      mockPunchoutUiRestrictionService.isPunchoutSessionActive
    ).toHaveBeenCalled();
  });

  it('should call closePunchoutSession on clickCloseSessionButton', () => {
    mockPunchoutFacade.closePunchoutSession.mockReturnValue(of(true));

    component.clickCloseSessionButton();

    expect(mockPunchoutFacade.closePunchoutSession).toHaveBeenCalled();
  });
});
