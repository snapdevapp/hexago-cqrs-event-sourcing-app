import { ModelBase } from '@vendor/interface/base-classes/model.base.interface';

export interface ITooltipResponse extends ModelBase {
  order: number;
  title: string;
  content: string;
  iconUrl: string;
  actionType: string;
  actionLink: string;
  tooltipType: string;
  config?: Record<string, unknown>;
}
