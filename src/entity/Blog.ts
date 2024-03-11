import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from "typeorm"
import { User } from "./User"

@Entity({name: "blogs"})
export class Blog {
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: false})
    title: string

    @Column({nullable: false, type: "text"})
    content: string

    @Column({type: "int"})
    views: number

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @ManyToOne(type => User, (user) => user.blogs)
    user: User
}