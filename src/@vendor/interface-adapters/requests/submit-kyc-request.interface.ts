export interface ISubmitKycRequest {
  documentType: string;

  firstName?: string;

  lastName?: string;

  gender?: string;

  homeLocationId: string;

  clientId?: string;
}
