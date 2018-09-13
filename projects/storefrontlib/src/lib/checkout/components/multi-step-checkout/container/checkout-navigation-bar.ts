export class ProgressStatus {
  disabled: boolean;
  completed: boolean;
  active: boolean;
}
export class ProgressItem {
  id: string;
  label: number;
  status: ProgressStatus;
  progressBar: boolean;
}

export const checkoutNavBar = [
  {
    id: 1,
    label: '1. Shipping Address',
    status: {
      disabled: false,
      completed: false,
      active: true
    },
    progressBar: true
  },
  {
    id: 2,
    label: '2. Shipping Method',
    status: {
      disabled: true,
      completed: false,
      active: false
    },
    progressBar: false
  },
  {
    id: 3,
    label: '3. Payment',
    status: {
      disabled: true,
      completed: false,
      active: false
    },
    progressBar: false
  },
  {
    id: 4,
    label: '4. Review',
    status: {
      disabled: true,
      completed: false,
      active: false
    },
    progressBar: false
  }
];
