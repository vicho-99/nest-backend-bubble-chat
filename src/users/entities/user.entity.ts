import { Role } from '@/roles/entities/role.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    userId: string;

    @Column({
        type: 'character varying',
        length: 255,
        nullable: false
    })
    name: string;

    @Column({
        type: 'character varying',
        length: 255,
        nullable: false,
        unique: true,
    })
    email: string;

    @Column({
        type: 'character varying',
        length: 255,
        nullable: false,
        select: false,
    })

    password: string;

    @Column({
        type: 'boolean',
        nullable: false,
        default: false
    })
    isVerified: boolean;

    @ManyToOne(() => Role, role => role.roleId)
    role: Role;

    @CreateDateColumn({
        type: 'timestamp without time zone',
        default: () => 'CURRENT_TIMESTAMP'
    })
    createdAt: Date;

}
