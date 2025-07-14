import React, { useState, useRef } from "react";
import "../App.css"; // Optional: add your CSS here

const SwipeableList = ({ items }) => {
    const [swipedIndex, setSwipedIndex] = useState(null);
    const startX = useRef(0);
    const currentX = useRef(0);
    const swiping = useRef(false);
    const itemRefs = useRef([]);

    const handleTouchStart = (e, index) => {
        console.log("Handle touch start");
        startX.current = e.touches[0].clientX;
        console.log(startX.current);
        swiping.current = true;
        setSwipedIndex(index);
    };

    const handleTouchMove = (e) => {
        if (!swiping.current) return;
        currentX.current = e.touches[0].clientX;
        const diffX = currentX.current - startX.current;
        console.log("Handle touch move");
        console.log(currentX.current);
        console.log(startX.current);
        console.log(diffX);
        // if (diffX < 0) {
        // itemRefs.current[swipedIndex].style.transform = `translateX(${diffX}px)`;
        itemRefs.current[swipedIndex].style.transform = `translateX(${Math.min(Math.max(diffX, -140), 140)}px)`;
        // }
    };

    const handleTouchEnd = () => {
        console.log("Handle touch end");
        swiping.current = false;
        console.log(currentX);
        console.log(startX);
        const diffX = currentX.current - startX.current;
        console.log(diffX);

        if (diffX < -200) {
            // itemRefs.current[swipedIndex].style.transform = `translateX(-100%)`;
            itemRefs.current[swipedIndex].style.transform = `translateX(-140px)`;
            items.forEach((item, index) => {
                if (index !== swipedIndex) itemRefs.current[index].style.transform = `translateX(0)`;
            });
            // setTimeout(() => {
            //     itemRefs.current[swipedIndex].style.transform = `trsnlateX(0)`
            // }, 300);
        } else if (diffX > 200) {
            // itemRefs.current[swipedIndex].style.transform = `translateX(100%)`;
            itemRefs.current[swipedIndex].style.transform = `translateX(140px)`;
            items.forEach((item, index) => {
                if (index !== swipedIndex) itemRefs.current[index].style.transform = `translateX(0)`;
            });
            // setTimeout(() => {
            //     itemRefs.current[swipedIndex].style.transform = `trsnlateX(0)`
            // }, 300);
        } else {
            console.log("hoi")
            itemRefs.current[swipedIndex].style.transform = `translateX(0)`;
            items.forEach((item, index) => itemRefs.current[index].style.transform = `translateX(0)`);
        }
    };

    return (
        <div className="swipeable-list">
            {items.map((item, index) => (
                <div
                    key={index}
                    className="swipeable-list-item"
                    ref={(el) => (itemRefs.current[index] = el)}
                    onTouchStart={(e) => handleTouchStart(e, index)}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                >
                    {item}
                </div>
            ))}
        </div>
    );
};

export default SwipeableList;
