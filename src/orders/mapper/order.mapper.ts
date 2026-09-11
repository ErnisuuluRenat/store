import { orderDto } from "../dto/order.dto";
import { Order } from "../orders.entity";
import { OrderItemMapper } from "./order_item.mapper";


export class OrderMapper {
    static toOrderDto(order : Order) : orderDto {
        return {
            orderId : order.order_id,
            totalPrice: Number(order.total_price),
            status: order.status,
            createdAt : order.created_at,
            items: order.order_items.map((order_item) => OrderItemMapper.toOrderItemDto(order_item))
        }
    }
}