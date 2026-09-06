import { CartItem } from "src/cart_items/cart_item.entity";
import { User } from "src/users/users.entity";
import { Entity, EntityMetadata, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

console.log("Cart loading")
@Entity("carts")
export class Cart {
    @PrimaryGeneratedColumn()
    cart_id: number

    @OneToOne(() => User, (user) => user.cart, {nullable: false})
    @JoinColumn({name: 'user_id'}) // join column gonna make this field to be FK
    user: User

    @OneToMany(() => CartItem, (cartItem) => cartItem.cart)
    cartItems: CartItem[]
}

console.log(EntityMetadata)