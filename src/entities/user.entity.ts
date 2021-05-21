import { Column, Entity } from "typeorm";
import { CoreEntity } from "./core.entity";

@Entity("USERS", {orderBy: {id: "ASC"}})
export class UserEntity extends CoreEntity {
    @Column({name: "UserName"})
    username: string;

    @Column({name: "Password"})
    password: string;
    @Column({name: "Descriptions"})
    description: string;


    constructor (username: string, password: string, description: string) {
        super();
        this.username = username;
        this.password = password;
        this.description = description;
    }
}
