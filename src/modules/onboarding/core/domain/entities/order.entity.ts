import { AggregateRoot } from '@vendor/domain/base-classes/aggregate-root.base';
import { ArgumentInvalidException } from '@vendor/domain/exception';
import { UUID } from '@vendor/domain/value-objects/uuid.value-object';
import { LocationEntity } from './location.entity';
import { ProductEntity } from './product.entity';

export interface OrderHistoryProps {
  comment: string;
  createdAt: Date;
  status: string;
}
export interface OrderProps {
  id: string;
  status: string;
  type: string;
  deliveryDate?: Date;
  deliveryTime?: string;
  trackingNumber: string;
  createdAt: Date;
  product?: ProductEntity;
  deliveryLocation?: LocationEntity;
  homeLocation?: LocationEntity;
  pickupLocation?: LocationEntity;
}

export class OrderEntity extends AggregateRoot<OrderProps> {
  protected readonly _id: UUID;

  validate(): void {
    if (this.props === undefined) {
      throw new ArgumentInvalidException(`props can't be empty`);
    }
  }

  get status(): string {
    return this.props.status;
  }

  get type(): string {
    return this.props.type;
  }

  get deliveryDate(): Date {
    return this.props.deliveryDate;
  }

  get deliveryTime(): string {
    return this.props.deliveryTime;
  }

  get trackingNumber(): string {
    return this.props.trackingNumber;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get product(): ProductEntity {
    return this.props.product;
  }

  get deliveryLocation(): LocationEntity {
    return this.props.deliveryLocation;
  }

  get pickupLocation(): LocationEntity {
    return this.props.pickupLocation;
  }

  get homeLocation(): LocationEntity {
    return this.props.homeLocation;
  }

  static createFromIdAndProps(id: string, props: OrderProps): OrderEntity {
    return new OrderEntity({ id: new UUID(id), props });
  }
}
