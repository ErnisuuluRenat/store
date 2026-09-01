import { Cart } from "src/cart/cart.entity";
import { Product } from "src/products/products.entity";
import { Check, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";


@Entity("cart_items")
@Check(`"quantity" >= 1`)
@Unique(["cart", "product"])
export class CartItem {
    @PrimaryGeneratedColumn()
    cart_item_id: number

    @Column({nullable: false, type: 'int', default: 1})
    quantity: number

    @ManyToOne(() => Cart, (cart) => cart.cartItems, {nullable: false, onDelete : 'RESTRICT'})
    @JoinColumn({name: 'cart_id'})
    cart: Cart

    @ManyToOne(() => Product, (product) => product.cartItems, {nullable: false, onDelete : "RESTRICT"})
    @JoinColumn({name: "product_id"})
    product: Product
}