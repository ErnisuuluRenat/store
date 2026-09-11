import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Cart } from 'src/cart/cart.entity';
import { Product } from 'src/products/products.entity';
import { DataSource, Repository } from 'typeorm';
import { Order } from './orders.entity';
import { Order_item } from 'src/order_items/order_items.entity';
import { CartItem } from 'src/cart_items/cart_item.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderMapper } from './mapper/order.mapper';

@Injectable()
export class OrdersService {
    constructor(private readonly dataSource: DataSource,
        @InjectRepository(Order) private readonly orderRepository: Repository<Order>
    ){}
    
    private async loadCart(cartRepository : Repository<Cart>, userId : number) {
        const cart = await cartRepository.findOne({relations : {
                cartItems : {product : true}
            }, where : {
                user : {user_id: userId}
            }})

            if (!cart) {
                throw new NotFoundException()
            }

            if (cart.cartItems.length === 0) {
                throw new BadRequestException()
            }

            return cart
    }

    private async updateInventory(productRepository : Repository<Product>, cartItem : CartItem) {
        const requestedQuantity = cartItem.quantity
        const productId = cartItem.product.product_id

        const result = await productRepository.createQueryBuilder()
                .update(Product)
                .set({quantity : () => "quantity - :requestedQuantity"})
                .setParameters({requestedQuantity,})
                .where("product_id = :id", {id : productId})
                .andWhere("quantity >= :requestedQuantity", {requestedQuantity})
                .execute()

        if (result.affected === 0) {
            throw new ConflictException("Not enough in inventory")
            }
        
    }

    private calculateTotal(cart: Cart) : number{
        let total = 0
        
        for (const cartItem of cart.cartItems) {
            total += Number(cartItem.product.price) * cartItem.quantity
        } 

        return total
    }

    private createOrderEntity(orderRepository : Repository<Order>, finalTotal : number, userId : number) {
        return orderRepository.create({
                total_price : finalTotal,
                user: {user_id : userId}
            })
    }

    private async createOrderItems(
        orderItemRepository : Repository<Order_item>,
        order : Order,
        cart : Cart) {
            const orderItems : Order_item[] = []
            for (const cartItem of cart.cartItems) {
                orderItems.push(
                    orderItemRepository.create({
                        unit_price: Number(cartItem.product.price),
                        product: {product_id: cartItem.product.product_id},
                        quantity: cartItem.quantity,
                        order
                    })
                )
            }
        
        await orderItemRepository.save(orderItems)
    }

    private async clearCart(cartItemRepository : Repository<CartItem>, cart: Cart) {
        await cartItemRepository.delete({cart : {cart_id: cart.cart_id}})
    }

    async checkout(userId: number) {
        // Validation (outside transaction)
        const queryRunner = this.dataSource.createQueryRunner()
        await queryRunner.connect()
       
        const manager = queryRunner.manager
        const cartRepository = manager.getRepository(Cart)
        const productRepository = manager.getRepository(Product)
        const orderRepository = manager.getRepository(Order)
        const orderItemRepository = manager.getRepository(Order_item)
        const cartItemRepository = manager.getRepository(CartItem)

        const cart = await this.loadCart(cartRepository, userId)

        await queryRunner.startTransaction()
        try {
            
            for (const cartItem of cart.cartItems) {
                await this.updateInventory(productRepository, cartItem)
                
            }
            const totalPrice = this.calculateTotal(cart)
            const finalTotal = Number(totalPrice.toFixed(2))

            const order = this.createOrderEntity(orderRepository, finalTotal, userId)
            
            await orderRepository.save(order)

            await this.createOrderItems(orderItemRepository, order, cart)

            await this.clearCart(cartItemRepository, cart)

            await queryRunner.commitTransaction()

            return {
                message: "checkout system completed successfully",
                orderId: order.order_id,
                total: order.total_price,
                status: order.status
            }
        }
        catch(error) {
            await queryRunner.rollbackTransaction()
            throw error
        }
        finally {
            await queryRunner.release()
        }
    }

    async getOrder(orderId : number, userId : number) {
        const order = await this.orderRepository.findOne({
            relations: {
                order_items : {product : true}
            },
            where : {
                user : {user_id : userId},
                order_id : orderId
            }
        })

        if (!order) {
            throw new NotFoundException()
        }

        return OrderMapper.toOrderDto(order)
    }
}
