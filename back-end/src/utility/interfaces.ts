
export interface Case {
  id: number;
  customerName: string;
  startDate: Date;
  isFinished: boolean;
  fxFileId: string;
}

export interface SuccessResponse {
  status: 'success';
  code: number
  message: string;
  data: Case[];
}

export interface FailedResponse {
  status: string;
  code: number,
  message: string,
  data: any,
}

