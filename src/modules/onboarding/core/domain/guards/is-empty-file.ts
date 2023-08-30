import { IUploadFile } from '@vendor/interface/dtos/upload-file.interface';
import _ from 'lodash';

export const isEmptyFile = (file: IUploadFile[]): boolean => {
  return _.isEmpty(file);
};
