export interface IUploadFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: string | import('stream').Stream | Buffer;
  size: number;
}
