import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguratorResumeConfigDialogComponent } from './configurator-resume-config-dialog.component';

describe('ConfiguratorResumeConfigDialogComponent', () => {
  let component: ConfiguratorResumeConfigDialogComponent;
  let fixture: ComponentFixture<ConfiguratorResumeConfigDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfiguratorResumeConfigDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfiguratorResumeConfigDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
