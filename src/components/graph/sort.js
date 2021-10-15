export const SortIntervel = (data) => {

    if(data.length <= 30 ) {
        return data
    }  else {
        const int = Math.round((data.length / 30))
        const New = []
        New.push(data[0])

        let i = 0
        data.forEach(v => {
            if( i % int === 0 && i !== 0 && i !== data.length) {
                New.push(v)
            }
            i = i + 1
        });
        New.push(data[data.length - 1])
        return New
    }
}