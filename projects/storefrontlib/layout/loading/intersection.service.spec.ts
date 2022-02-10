import { TestBed } from '@angular/core/testing';
import { LayoutConfig } from '../config/layout-config';
import { IntersectionService } from './intersection.service';

const MockLayoutConfig: LayoutConfig = {};

describe('IntersectionService', () => {
  let service: IntersectionService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: LayoutConfig, useValue: MockLayoutConfig }],
    });
    service = TestBed.inject(IntersectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
