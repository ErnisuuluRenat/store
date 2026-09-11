import { Order_item } from "src/order_items/order_items.entity";
import { orderItemDto } from "../dto/order_item.dto";


export class OrderItemMapper {
    static toOrderItemDto(orderItem : Order_item) : orderItemDto{
        return {
            orderItemId : orderItem.order_items_id,
            quantity : orderItem.quantity,
            name: orderItem.product.name,
            unitPrice: Number(orderItem.unit_price)
        }
    }
}