import { CxApiModule } from './cx-api.module';

describe('CxApiModule', () => {
  let cxApiModule: CxApiModule;

  beforeEach(() => {
    cxApiModule = new CxApiModule();
  });

  it('should create an instance', () => {
    expect(cxApiModule).toBeTruthy();
  });
});
