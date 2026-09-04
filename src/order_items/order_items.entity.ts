import { Order } from "src/orders/orders.entity";
import { Product } from "src/products/products.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity("order_items")
export class Order_item {
    @PrimaryGeneratedColumn()
    order_items_id : number

    @ManyToOne(() => Order, (order) => order.order_items, {nullable: false, onDelete: 'RESTRICT'})
    @JoinColumn({name : "order_id"})
    order: Order

    @ManyToOne(() => Product, (product) => product.order_items, {nullable: false, onDelete: "RESTRICT"})
    @JoinColumn({name : "product_id"})
    product : Product

    @Column({type: "int", nullable : false, default : 1})
    quantity: number

    @Column({type : "numeric", precision: 10, scale: 2, nullable: false})
    unit_price: number
}