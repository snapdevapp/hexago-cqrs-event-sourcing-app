import { AggregateRoot } from '@vendor/domain/base-classes/aggregate-root.base';
import { ArgumentNotProvidedException } from '@vendor/domain/exception';
import { UUID } from '@vendor/domain/value-objects/uuid.value-object';

export interface SettingProps {
  label?: string;
  settingId?: string;
  value?: string;
  config?: never;
}

export class SettingEntity extends AggregateRoot<SettingProps> {
  protected readonly _id: UUID;

  validate(): void {
    if (this.props === undefined) throw new ArgumentNotProvidedException('props are needed');
  }

  static rehydrateFromIdAndProps(id: string, props: SettingProps): SettingEntity {
    return new SettingEntity({ id: new UUID(id), props: { ...props } });
  }

  get value(): string {
    return this.props.value;
  }
}
