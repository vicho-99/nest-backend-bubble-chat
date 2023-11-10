import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Generated } from 'typeorm';

@Entity()
export class Property {

    @PrimaryGeneratedColumn("uuid")
    propertyId: string;

    @Column({
        type: 'character varying',
        length: 255,
        nullable: false
    })
    name: string;

    @Column({
        type: 'character varying',
        length: 255,
        nullable: false
    })
    url: string;

    @CreateDateColumn({
        type: 'timestamp without time zone',
        default: () => 'CURRENT_TIMESTAMP'
    })
    createdAt: Date;

 


}
