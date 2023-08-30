import { IUploadFile } from '@vendor/interface/dtos/upload-file.interface';
import { isEmptyFile } from './is-empty-file';

export const isInvalidMimeType = (file: IUploadFile[], mimeTypes: string[]): boolean => {
  return !isEmptyFile(file) && !mimeTypes.includes(file[0].mimetype);
};
