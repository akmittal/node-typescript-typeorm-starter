import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, BeforeInsert } from "typeorm";
import bcrypt from 'bcrypt';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text", nullable: true })
  firstName: string;

  @Column({ type: "text", nullable: true })
  lastName: string;

  @Column({ type: "text" })
  username: string;
  @Column({ type: "text" })
  password: string;

  constructor(username: string, password: string){
      super();
      this.username = username;
      this.password = password;
  }
  @BeforeInsert()
  hashPassword() {
      this.password = bcrypt.hashSync(this.password, 2);
  }
  toJSON(){
    return {
      firstName: this.firstName,
      lastName: this.lastName,
      username: this.username,
      password: this.password
    }
  }
}
