export interface OpeningHours {
  weekDay: string;
  closed: boolean;
  openingTime?: {
    formattedHour: string;
    hour: number;
    minute: number;
  };
  closingTime?: {
    formattedHour: string;
    hour: number;
    minute: number;
  };
}
