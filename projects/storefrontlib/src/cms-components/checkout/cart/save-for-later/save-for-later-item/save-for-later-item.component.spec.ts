import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveForLaterItemComponent } from './save-for-later-item.component';

describe('SaveForLaterItemComponent', () => {
  let component: SaveForLaterItemComponent;
  let fixture: ComponentFixture<SaveForLaterItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SaveForLaterItemComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveForLaterItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
