import { BaseEntity, PrimaryGeneratedColumn } from "typeorm";

export class CoreEntity extends BaseEntity {
    @PrimaryGeneratedColumn({type: "bigint"})
    id: number;
}
