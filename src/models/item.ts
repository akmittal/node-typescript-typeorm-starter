import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Item extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type:'text'})
    name: string;
    @Column({type:'text'})
    brand:string

    @Column({type:'integer'})
    price: number;
    @Column({type:'integer'})
    quantity: number;
    @Column({type:'integer'})
    total: number;

}