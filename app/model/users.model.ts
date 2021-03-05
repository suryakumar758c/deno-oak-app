import { DataTypes, Model } from 'https://deno.land/x/denodb/mod.ts';

import connection from "./connection.model.ts"

class User extends Model {

    static table:string = 'users'

    static timestamps:boolean = true;

    static fields:any = {
        id: {
            primaryKey: true, 
            autoIncrement: true 
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            length: 50,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            length: 50,
        }
    }

}

connection.link([User])

export default User