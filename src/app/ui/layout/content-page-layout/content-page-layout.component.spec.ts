import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentPageLayoutComponent } from './content-page-layout.component';

describe('ContentPageLayoutComponent', () => {
  let component: ContentPageLayoutComponent;
  let fixture: ComponentFixture<ContentPageLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentPageLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentPageLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
