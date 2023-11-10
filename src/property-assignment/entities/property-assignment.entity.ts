import { Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '@/users/entities/user.entity';
import { Property } from '@/properties/entities/property.entity';

@Entity()
export class PropertyAssignment {
    @PrimaryGeneratedColumn()
    propertyAssignmentServiceId: number;

    @ManyToOne(() => User, user => user.userId)
    user: User;

    @ManyToOne(() => Property, property => property.propertyId)
    property: Property;

    @CreateDateColumn({
        type: 'timestamp without time zone',
        default: () => 'CURRENT_TIMESTAMP'
    })
    createdAt: Date;

}
