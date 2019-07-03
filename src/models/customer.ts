import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Customer extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type:'text'})
    name: string;
    @Column({type:'text'})
    address: string;

    @Column({type:'text'})
    contact: string;

}