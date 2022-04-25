import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ScheduleLinesCartEntryComponent } from ".";

describe('ScheduleLinesCartEntryComponent', () => {
  let component: ScheduleLinesCartEntryComponent;
  let fixture: ComponentFixture<ScheduleLinesCartEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ScheduleLinesCartEntryComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleLinesCartEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
