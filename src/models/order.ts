import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Customer } from './customer';
import { Item } from './item';

@Entity()
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  
  @ManyToOne(() => Customer, customer => customer.id)
  @Column({ type: 'text' })
  customerID: string;

  @ManyToOne(() => Item, item => item.id)
  @Column({ type: 'text' })
  ItemID: string;

  @Column({ type: 'integer' })
  quantity: number;

  @Column({ type: 'integer' })
  inVoiceNumber: number;
  
  @Column({ type: 'integer' })
  amount: number;

}
