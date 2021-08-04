import {
  Component,
  ComponentRef,
  CUSTOM_ELEMENTS_SCHEMA,
  Input,
  ViewContainerRef,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LaunchDialogService } from '@spartacus/storefront';
import { of } from 'rxjs';
import { ImageZoomTriggerComponent } from './image-zoom-trigger.component';

@Component({
  template: '',
})
class TestDialogComponent {
  @Input() galleryItem: number;
  constructor(public vcr: ViewContainerRef) {}
}

class MockLaunchDialogService {
  launch() {}
  clear() {}
  get dialogClose() {
    return of('close');
  }
}

describe('ImageZoomTriggerComponent', () => {
  let component: ImageZoomTriggerComponent;
  let fixture: ComponentFixture<ImageZoomTriggerComponent>;
  let testDialogComponent: ComponentRef<TestDialogComponent>;
  let launchDialogService: LaunchDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: LaunchDialogService,
          useClass: MockLaunchDialogService,
        },
      ],
      declarations: [ImageZoomTriggerComponent, TestDialogComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(ImageZoomTriggerComponent);
    component = fixture.componentInstance;
    testDialogComponent = TestBed.createComponent(TestDialogComponent)
      .componentRef;
    launchDialogService = TestBed.inject(LaunchDialogService);
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
