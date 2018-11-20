import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import createSpy = jasmine.createSpy;

import { AddToHomeScreenService } from '../services/add-to-home-screen.service';
import { AddToHomeScreenBtnComponent } from './add-to-home-screen-btn.component';

describe('AddToHomeScreenBtnComponent', () => {
  let component: AddToHomeScreenBtnComponent;
  let fixture: ComponentFixture<AddToHomeScreenBtnComponent>;
  let mockAddToHomeScreenService: any;

  beforeEach(async(() => {
    mockAddToHomeScreenService = {
      firePrompt: createSpy(),
      canPrompt$: of(true)
    };

    TestBed.configureTestingModule({
      providers: [
        {
          provide: AddToHomeScreenService,
          useValue: mockAddToHomeScreenService
        }
      ],
      declarations: [AddToHomeScreenBtnComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddToHomeScreenBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be able to get canPrompt', () => {
    component.ngOnInit();
    let canPrompt;
    component.canPrompt$.subscribe(value => (canPrompt = value));
    expect(canPrompt).toBeTruthy();
  });

  it('should be able to call prompt', () => {
    component.prompt();
    expect(mockAddToHomeScreenService.firePrompt).toHaveBeenCalled();
  });
});
