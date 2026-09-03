import { Order_item } from "src/order_items/order_items.entity";
import { User } from "src/users/users.entity";
import { Check, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity("orders")
@Check(`"status" in ('pending', 'paid', 'cancelled')`)
export class Order {
    @PrimaryGeneratedColumn()
    order_id: number

    @ManyToOne(() => User, (user) => user.orders, {nullable :false})
    @JoinColumn({name : "user_id"})
    user: User

    @Column({type: 'numeric', precision: 10, scale: 2})
    total_price: number

    @CreateDateColumn()
    created_at: Date

    @Column({type : 'varchar', length : 20, nullable : false, default : "pending"})
    status: string

    @OneToMany(() => Order_item, (order_item) => order_item.order)
    order_items: Order_item[]
}