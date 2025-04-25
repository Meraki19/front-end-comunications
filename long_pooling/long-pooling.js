const getData = async (stockPrice) => {
    let controller = new AbortController()
    const timeout  = setTimeout(() => {
        controller.abort()
    }, 30000);
    console.log(stockPrice)
    try {
        const res = await fetch(`/getstockdata?stockprice=${stockPrice}`,{
            signal: controller.signal
        })
        const data = await res.json()
        getData(data.stockPrice)
    }catch(err) {
        console.log(err)
    }finally {
        clearTimeout(timeout)
    }

}
getData()


