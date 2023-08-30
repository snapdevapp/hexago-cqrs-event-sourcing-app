import { ModelBase } from '@vendor/interface/base-classes/model.base.interface';

export interface IOrderResponse extends ModelBase {
  status: string;
  type: string;
  deliveryDate?: Date;
  deliveryTime?: string;
  trackingNumber: string;
  createdAt: Date;
  product?: IOrderLocationResponse;
  deliveryLocation?: IOrderLocationResponse;
  pickupLocation?: IOrderLocationResponse;
  homeLocation?: IOrderLocationResponse;
}

export interface IOrderProductResponse extends ModelBase {
  name: string;
  identifier: string;
}

export interface IOrderLocationResponse extends ModelBase {
  name: string;
}
