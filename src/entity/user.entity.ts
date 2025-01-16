import { Role } from "@prisma/client"
import { Exclude,Expose } from "class-transformer"

export class User{
    @Expose()
    id :Number;
    
    @Expose()
    username:string

    @Exclude()
    password:string

    @Expose()
    role: Role
}