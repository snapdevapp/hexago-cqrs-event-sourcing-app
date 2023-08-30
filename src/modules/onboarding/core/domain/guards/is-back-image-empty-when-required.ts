import { IUploadFile } from '@vendor/interface/dtos/upload-file.interface';
import {
  KycDocumentType,
  KYC_BACK_IMAGE_REQUIRED_KYC_DOCUMENT_TYPE,
} from '@modules/onboarding/infrastructure/persistence/orm-entities';
import { isEmptyFile } from './is-empty-file';

export const isBackImageEmptyWhenRequired = (file: IUploadFile[], documentType: KycDocumentType): boolean => {
  return KYC_BACK_IMAGE_REQUIRED_KYC_DOCUMENT_TYPE.includes(documentType) && isEmptyFile(file);
};
