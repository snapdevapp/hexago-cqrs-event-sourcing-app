import { ModelBase } from '@vendor/interface/base-classes/model.base.interface';

export interface IServiceResponse extends ModelBase {
  name: string;
  label: string;
  identifier: string;
  iconUrl: string;
  category: string;
  isActive: boolean;
  accountTypes: string[];
  configuration: {
    [key: string]: string | boolean | number | undefined;
  };
  order: number;
}
