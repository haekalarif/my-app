import React, { useEffect } from "react"
import format from "date-fns/format"

export const DateFormatExamples = (props) => {
    useEffect(() => {
        console.log(format(new Date(), 'dd MMMM yyyy HH:mm'))
    }, []);
    return (<div></div>)
}