

const getYears = startYear => {
    const start = startYear;
    let years = [];
    
    for(let i = 0; i <= 100; i++) years.push(start+i)

    return years;
}

export function PriceInput({start, ...rest}){
    const years = getYears(start);
    return (
        <div className='nonElevatedInput'>
            <select defaultValue={years[0]}>
                {years.map(x => <option value={x}>{x}</option>)}
            </select>
            <input {...rest} />
        </div>
    )
}