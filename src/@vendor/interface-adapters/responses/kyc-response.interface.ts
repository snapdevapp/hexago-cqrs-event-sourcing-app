import { ModelBase } from '@vendor/interface/base-classes/model.base.interface';

export interface IKYCSubmissionResponse extends ModelBase {
  firstName?: string;
  lastName?: string;
  gender?: string;
  dateOfBirth?: Date;
  documentExpireDate?: Date;
  documentNumber: string;
  verificationStatus: string;
}
