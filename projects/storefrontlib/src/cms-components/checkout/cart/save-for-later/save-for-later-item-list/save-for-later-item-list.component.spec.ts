import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveForLaterItemListComponent } from './save-for-later-item-list.component';

describe('SaveForLaterItemListComponent', () => {
  let component: SaveForLaterItemListComponent;
  let fixture: ComponentFixture<SaveForLaterItemListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SaveForLaterItemListComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveForLaterItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
