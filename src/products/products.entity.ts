import { Category } from "src/category/categories.entity";
import { Check, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

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
}