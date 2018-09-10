import { CustomParagraphModule } from './custom-paragraph.module';

describe('CustomParagraphModule', () => {
  let customParagraphModule: CustomParagraphModule;

  beforeEach(() => {
    customParagraphModule = new CustomParagraphModule();
  });

  it('should create an instance', () => {
    expect(customParagraphModule).toBeTruthy();
  });
});
