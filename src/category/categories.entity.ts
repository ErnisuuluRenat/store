import { Product } from "src/products/products.entity";
import { Column, Entity,  JoinColumn,  ManyToOne,  OneToMany,  PrimaryGeneratedColumn } from "typeorm";


@Entity("categories")
export class Category {
    @PrimaryGeneratedColumn()
    category_id: number;

    @Column({
        type: 'varchar',
        length : 150,
        nullable: false,
        unique: true
    })
    name: string;

    @ManyToOne(() => Category, (category) => category.children, {nullable: true, onDelete : 'RESTRICT'})
    @JoinColumn({name : 'parent_id'})
    parent: Category | null

    @OneToMany(() => Category, (category) => category.parent)
    children: Category[]

    @OneToMany(() => Product, (product) => product.category)
    products: Product[];
    
}