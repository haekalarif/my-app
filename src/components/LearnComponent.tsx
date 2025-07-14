import React, { useEffect, useState } from 'react';
import MyComponent from './MyComponent';
import JoditRTE from './JoditRTE';
import moment from 'moment';

function LearnComponent() {
    const [isVisible, setIsVisible] = useState(true);
    console.log(moment().toDate());
    console.log(new Date());

    useEffect(() => {

        const date = new Date(); // Your JavaScript Date object
        const momentDate = moment(date);

        // console.log(momentDate.format()); // Displays the formatted date
        console.log(momentDate.add(1, "days").toDate()); // Displays the formatted date

    }, []);
    return (
        <div>
            <button onClick={() => setIsVisible(!isVisible)}>
                {isVisible ? 'Hapus Komponen' : 'Tambah Komponen'}
            </button>
            {isVisible && <MyComponent />}
            <JoditRTE
                value=""
                disabled={true}
            />
        </div>
    );
}

export default LearnComponent;
