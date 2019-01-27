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

export interface CheckoutNavBarItem {
  id: number;
  label: string;
  status: {
    disabled: boolean;
    completed: boolean;
    active: boolean;
  };
  progressBar: boolean;
}
