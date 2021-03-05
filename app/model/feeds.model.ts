import { DataTypes, Model } from "https://deno.land/x/denodb/mod.ts";

import connection from "./connection.model.ts";

class Feeds extends Model {
  static table: string = "feeds";

  static timestamps: boolean = true;

  static fields: any = {
    id: {
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true,
      default: null,
    },
  };
}

connection.link([Feeds]);

export default Feeds;
