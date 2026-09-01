import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Check } from "typeorm";

type Role = 'customer' | 'admin';

@Entity('users')
@Check(`"role" in ('customer', 'admin')`)
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column({
    type: 'varchar',
    length: 100,
    unique: true,
    nullable: false,
  })
  username: string;

  @Column({
    type: 'varchar',
    length: 150,
    unique: true,
    nullable: false,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 200,
    unique: false,
    nullable: false,
  })
  hashedPassword: string;

  @CreateDateColumn()
  created_at: Date;

  @Column({
    type: 'varchar',
    length: 20,
    default: 'customer',
  })
  role: Role;
}