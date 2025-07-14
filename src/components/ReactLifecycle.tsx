import React, { useState, useCallback } from 'react';

const ReactLifecycle = () => {
    const [count, setCount] = useState(0);

    // useCallback is used to memoize the increment function
    const increment = useCallback(() => {
        setCount(prevCount => prevCount + 1);
    }, []);

    return (
        <div>
            <p>Count: {count}</p>
            {/* Pass the memoized function as an event handler */}
            <button onClick={increment}>Increment</button>
        </div>
    );
};

export default ReactLifecycle;
