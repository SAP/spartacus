export class StoreLocation {
   storeName: string;
   displayStoreName: string;
   civicCode: string;
   streetName: string;
   postalCode: string;
   country: string;
   sundayHours: {
     opening_time: string;
     closing_time: string;
   };
   mondayHours: {
     opening_time: string;
     closing_time: string;
   };
   tuesdayHours: {
     opening_time: string;
     closing_time: string;
   };
   wednesdayHours: {
     opening_time: string;
     closing_time: string;
   };
   thursdayHours: {
     opening_time: string;
     closing_time: string;
   };
   fridayHours: {
     opening_time: string;
     closing_time: string;
   };
   saturdayHours: {
     opening_time: string;
     closing_time: string;
   };
   holidayHours: {
     date: Date;
     isOpen: boolean;
     opening_time: string;
     closing_time: string;
   };
}
