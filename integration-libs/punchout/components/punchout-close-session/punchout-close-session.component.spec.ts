import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PunchoutCloseSessionComponent } from './punchout-close-session.component';
import { PunchoutFacade } from '@spartacus/punchout/root';
import { PunchoutComponentsService } from '../punchout-components.service';
import { of } from 'rxjs';

describe('PunchoutCloseSessionComponent', () => {
  let component: PunchoutCloseSessionComponent;
  let fixture: ComponentFixture<PunchoutCloseSessionComponent>;
  let mockPunchoutFacade: jasmine.SpyObj<PunchoutFacade>;
  let mockPunchoutComponentsService: jasmine.SpyObj<PunchoutComponentsService>;

  beforeEach(async () => {
    mockPunchoutFacade = jasmine.createSpyObj('PunchoutFacade', [
      'closePunchoutSession',
    ]);
    mockPunchoutComponentsService = jasmine.createSpyObj(
      'PunchoutComponentsService',
      ['isPunchoutSessionActive']
    );

    await TestBed.configureTestingModule({
      declarations: [PunchoutCloseSessionComponent],
      providers: [
        { provide: PunchoutFacade, useValue: mockPunchoutFacade },
        {
          provide: PunchoutComponentsService,
          useValue: mockPunchoutComponentsService,
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
    mockPunchoutComponentsService.isPunchoutSessionActive.and.returnValue(
      expected$
    );

    fixture = TestBed.createComponent(PunchoutCloseSessionComponent);
    component = fixture.componentInstance;

    component.isPunchoutSessionActive$.subscribe((value) => {
      expect(value).toBe(true);
    });

    expect(
      mockPunchoutComponentsService.isPunchoutSessionActive
    ).toHaveBeenCalled();
  });

  it('should call closePunchoutSession on clickCloseSessionButton', () => {
    mockPunchoutFacade.closePunchoutSession.and.returnValue(of(true));

    component.clickCloseSessionButton();

    expect(mockPunchoutFacade.closePunchoutSession).toHaveBeenCalled();
  });
});
