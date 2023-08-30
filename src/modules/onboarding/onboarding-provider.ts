import { GetOrderCountQueryHandler } from './interface/queries/get-order-count.query-handler';
import { OrderRepository } from './infrastructure/persistence/repositories/order.repository';
import { OrderRepositoryPort } from './core/application/ports/order.repository.port';
import { GetOrderListQueryHandler } from './interface/queries/get-order-list.query';

export const getOrderListQueryProvider = {
  provide: GetOrderListQueryHandler,
  useFactory: (orderRepository: OrderRepositoryPort): GetOrderListQueryHandler => {
    return new GetOrderListQueryHandler(orderRepository);
  },
  inject: [OrderRepository],
};

export const getOrderCountQueryProvider = {
  provide: GetOrderCountQueryHandler,
  useFactory: (orderRepository: OrderRepositoryPort): GetOrderCountQueryHandler => {
    return new GetOrderCountQueryHandler(orderRepository);
  },
  inject: [OrderRepository],
};
