import { CartItem } from "src/cart_items/cart-item.entity";
import { Category } from "src/category/categories.entity";
import { Order_item } from "src/order_items/order_items.entity";
import { Check, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('products')
@Check(`"price" > 0`)
@Check(`"quantity" >= 0`)
export class Product {
    @PrimaryGeneratedColumn()
    product_id: number;

    @Column({
        type: "varchar",
        nullable: false,
        length: 150
    })
    name: string;

    @Column({type: "numeric", precision: 10, scale: 2, nullable: false})
    price: number;

    @Column(
        {type: 'int',
         nullable: false,
         default: 1
        }
    )
    quantity: number;

    @CreateDateColumn({name : "created_at"})
    createdAt: Date;

    @ManyToOne(() => Category, (category) => category.products, {nullable: false, onDelete : "RESTRICT"})
    @JoinColumn({name: "category_id"})
    category: Category;

    @Column({
        type: "boolean",
        default: true,
        name : "is_active"
    })
    isActive : boolean;

    @Column({
        type: 'varchar',
        length: 500,
        nullable: false
    })
    description: string;

    @OneToMany(() => CartItem, (cartItem) => cartItem.product)
    cartItems: CartItem[]

    @OneToMany(() => Order_item, (order_item) => order_item.product)
    order_items: Order_item[]
}