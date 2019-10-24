import { of } from 'rxjs';
import { ConfiguratorPageLayoutHandler } from './configurator-page-layout-handler';

describe('ConfiguratorPageLayoutHandler', () => {
  const mockSlots = [
    'test',
    'TopContent',
    'NavigationBar',
    'VariantConfigMenu',
  ];
  const mockSlots$ = of(mockSlots);
  const configuratorPageTemplate = 'VariantConfigurationTemplate';
  const section = 'navigation';

  it('should create an instance', () => {
    expect(new ConfiguratorPageLayoutHandler()).toBeTruthy();
  });

  it('should remove NavigationBar slots', () => {
    const handler = new ConfiguratorPageLayoutHandler();

    let result;
    handler
      .handle(mockSlots$, configuratorPageTemplate, section)
      .subscribe(res => (result = res));
    expect(result).toEqual(['test', 'TopContent', 'VariantConfigMenu']);
  });

  it('should remove VariantConfigMenu slots', () => {
    const handler = new ConfiguratorPageLayoutHandler();

    let result;
    handler
      .handle(mockSlots$, 'different page', section)
      .subscribe(res => (result = res));
    expect(result).toEqual(['test', 'TopContent', 'NavigationBar']);
  });

  it('should return untouched steam if not on a configuration page and not navigation section', () => {
    const handler = new ConfiguratorPageLayoutHandler();
    const slots$ = handler.handle(
      mockSlots$,
      'different page',
      'different section'
    );
    expect(slots$).toBe(mockSlots$);
  });
});
