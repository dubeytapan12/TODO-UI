export interface TODO {
  taskName: string;
  category: string;
  startDate: Date;
  endDate: Date;
  autoClose: boolean;
  autoCloseVM?: string;
  startDateVM?: string;
  endDateVM?: string;

  status?:string;
  buttonText?:string;
}
