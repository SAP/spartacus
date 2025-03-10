import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { PUNCHOUT_SESSION_KEY, PunchoutFacade } from '@spartacus/punchout/root';
import { of } from 'rxjs';
import { PunchoutSessionComponent } from './punchout-session.component';

class mockActivatedRoute implements Partial<ActivatedRoute> {
  queryParams = of({ [PUNCHOUT_SESSION_KEY]: '123abc' });
}

describe('PunchoutSessionComponent', () => {
  let component: PunchoutSessionComponent;
  let fixture: ComponentFixture<PunchoutSessionComponent>;
  let punchoutFacadeMock: jasmine.SpyObj<PunchoutFacade>;

  beforeEach(() => {
    punchoutFacadeMock = jasmine.createSpyObj('PunchoutFacade', [
      'getPunchoutSession',
    ]);
    TestBed.configureTestingModule({
      declarations: [PunchoutSessionComponent],
      providers: [
        { provide: ActivatedRoute, useClass: mockActivatedRoute },
        { provide: PunchoutFacade, useValue: punchoutFacadeMock },
      ],
    });
    fixture = TestBed.createComponent(PunchoutSessionComponent);
    component = fixture.componentInstance;
    punchoutFacadeMock.getPunchoutSession.and.returnValue(of());
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call punchoutFacade ', () => {
    component.ngOnInit();
    expect(punchoutFacadeMock.getPunchoutSession).toHaveBeenCalled();
  });
});
