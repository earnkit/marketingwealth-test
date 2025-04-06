import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    orderer: string;
  
    @Column()
    name_product: string;
  
    @Column()
    qty: number;
  
    @Column()
    price: number;
  
    @Column()
    create_at: Date;
  
    @Column()
    update_at: Date;
}
