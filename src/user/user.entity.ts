import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity('user')
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column('text')
    nome: string

    @Column('int')
    idade: number
}
