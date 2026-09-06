import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Cart } from 'src/cart/cart.entity';
import { Product } from 'src/products/products.entity';
import { DataSource } from 'typeorm';
import { Order } from './orders.entity';
import { Order_item } from 'src/order_items/order_items.entity';

@Injectable()
export class OrdersService {
    constructor(private readonly dataSource: DataSource){}

    async checkout(userId: number) {
        // Validation (outside transaction)
        const queryRunner = this.dataSource.createQueryRunner()
        await queryRunner.connect()
       
        const manager = queryRunner.manager
        const cartRepository = manager.getRepository(Cart)
        const productRepository = manager.getRepository(Product)
        const orderRepository = manager.getRepository(Order)
        const orderItemRepository = manager.getRepository(Order_item)

        const cart = await cartRepository.findOne({relations : {
                cartItems : {product : true}
            }, where : {
                user : {user_id : userId}
            }})

            if (!cart) {
                throw new NotFoundException()
            }

            if (cart.cartItems.length === 0) {
                throw new BadRequestException()
            }

            await queryRunner.startTransaction()
            // Transaction begins
        try {
            // Inventory updates
            for (const cartItem of cart.cartItems) {
                const requestedQuantity = cartItem.quantity
                const productId = cartItem.product.product_id

                const result = await productRepository.createQueryBuilder()
                .update(Product)
                .set({quantity : () => `quantity - :requestedQuantity`})
                .setParameters({requestedQuantity,})
                .where("products.product_id = :id", {id : productId})
                .andWhere("quantity >= :requestedQuantity", {requestedQuantity})
                .execute()

                if (result.affected === 0) {
                    throw new ConflictException("Not enough in inventory")
                }
            }

            // Historical data

            // Cleanup

            // Commit
            // create order
            // create order-items
            // decrease inventory (product_id decreased by quantity)
            // remove cart_items
            await queryRunner.commitTransaction()
        }
        catch(error) {
            await queryRunner.rollbackTransaction()
            throw error
        }
        finally {
            await queryRunner.release()
        }
    }
}
