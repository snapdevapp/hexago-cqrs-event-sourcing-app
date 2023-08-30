import { ModelBase } from '@vendor/interface/base-classes/model.base.interface';

export interface IIbanResponse extends ModelBase {
  accountNumber: string;
  agency: { code: string; libelle?: string };
  iban: string;
  ibanKey: string;
  clientId?: string;
}
