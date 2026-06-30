import { of } from 'rxjs';
import { vi } from 'vitest';
import { UserCostCenterConnector } from './user-cost-center.connector';

const userId = 'userId';
const costCenterCode = 'costCenterCode';

const costCenter = {
  code: costCenterCode,
};

describe('UserCostCenterConnector', () => {
  let service: UserCostCenterConnector;
  let adapter: { loadActiveList: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    adapter = {
      loadActiveList: vi.fn().mockReturnValue(of([costCenter])),
    };
    service = new UserCostCenterConnector(adapter as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load active costCenters of user', () => {
    service.getActiveList(userId);
    expect(adapter.loadActiveList).toHaveBeenCalledWith(userId);
  });
});
