import Counter from "../mysql/counter.ts"

self.onmessage = async (e:any) => {
    await Counter.createCount({count:e.data})
    await Counter.getCount()
    console.log(e)
}