import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, JoinColumn } from "typeorm"
import { Blog } from "./Blog"

@Entity({ name: "users"})
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: false})
    name: string

    @Column({nullable: false, unique: true})
    email: string

    @Column({nullable: false})
    password: string

    @Column({nullable: false})
    role: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @OneToMany(type => Blog, (blog) => blog.user)
    blogs: Blog[]
}
