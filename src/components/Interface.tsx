import React, { useEffect } from "react"



interface Person<T> {
    name: T,
}
interface Car<T, U, N> {
    name: T,
    color: U,
    no: N
}
const Interface = () => {


    function sayHello<T>(name: T) {
        console.log(`Hello ${name}`)
    }

    useEffect(() => {
        const personName: Person<string> = { name: "andi" }
        console.log(personName.name);

        sayHello<string>("Budi");

        const avanza: Car<string, boolean, number> = { name: "avanza", color: false, no: 999 };
        console.log(avanza);

    }, []);
    return (
        <div>

        </div>
    )
}

export default Interface;