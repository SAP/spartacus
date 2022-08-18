import { TestBed } from '@angular/core/testing';

import { OCC_ASM_TOKEN } from '../utils';
import { AsmContextService } from './asm-context.service';

describe('AsmContextService', () => {
  let service: AsmContextService;

  beforeEach(() => {
    service = TestBed.inject(AsmContextService);
  });

  it('should create a context', () => {
    const arg = { sendUserIdAsHeader: true };
    const context = service.createContext(arg);

    expect(context.get(OCC_ASM_TOKEN)).toBe(arg);
  });
});
