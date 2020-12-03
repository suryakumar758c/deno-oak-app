import connection from "./connection.ts"

class Counter {

    private readonly table:string = "counter";
    private readonly columns:string[] = ['count']

    public async createCount(data:any):Promise<any> {
        let formatedData:any = this.prepareData(this.columns,data)
        return connection.execute(`INSERT INTO ${this.table}(count) VALUES(?)`,formatedData)
    }

    public async getCount():Promise<any> {
        return connection.query(`SELECT * FROM ${this.table}`)
    }

    private prepareData(defaultData:any,userData:any):any {
       let newArray:any = []
       for(let data of defaultData)
        newArray.push(userData[data])
       return newArray;
    }
}

export default new Counter()