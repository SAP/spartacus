import { getConsignmentTrackingByIdEntityKey } from './order-state';

const order = 'order';
const cons = 'consignment';
const mockResult = 'order,consignment';
describe('getConsignmentTrackingByIdEntityKey', () => {
  it('should be able to return key', () => {
    let result = getConsignmentTrackingByIdEntityKey(order, cons);
    expect(result).toEqual(mockResult);
  });
});
