import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Role {
    @PrimaryGeneratedColumn("uuid")
    roleId: string;

    @Column({
        type: 'character varying',
        length: 255,
        nullable: false
    })
    name: string;

    @Column({
        type: 'character varying',
        length: 550,
        nullable: true
    })
    description: string;

}
