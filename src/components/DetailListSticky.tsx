import * as React from 'react';
import { DetailsHeader, DetailsList, IColumn, ITooltipHostProps, ScrollablePane, ScrollbarVisibility } from '@fluentui/react';
import { mergeStyleSets } from '@fluentui/react/lib/Styling';
import { Affix } from 'antd';
import { Sticky, StickyPositionType } from '@fluentui/react/lib/Sticky';

const columns: IColumn[] = [
    { key: 'column1', name: 'Column 1', fieldName: 'column1', minWidth: 100, maxWidth: 200, isResizable: true },
    { key: 'column2', name: 'Column 2', fieldName: 'column2', minWidth: 100, maxWidth: 200, isResizable: true },
    { key: 'column3', name: 'Column 3', fieldName: 'column3', minWidth: 100, maxWidth: 200, isResizable: true },
    { key: 'column4', name: 'Column 4', fieldName: 'column4', minWidth: 100, maxWidth: 200, isResizable: true },
    { key: 'column5', name: 'Column 5', fieldName: 'column5', minWidth: 100, maxWidth: 200, isResizable: true },
    { key: 'column6', name: 'Column 6', fieldName: 'column6', minWidth: 100, maxWidth: 200, isResizable: true },
    { key: 'column7', name: 'Column 7', fieldName: 'column7', minWidth: 100, maxWidth: 200, isResizable: true },
    { key: 'column8', name: 'Column 8', fieldName: 'column8', minWidth: 100, maxWidth: 200, isResizable: true },
    { key: 'column9', name: 'Column 9', fieldName: 'column9', minWidth: 100, maxWidth: 200, isResizable: true },
    { key: 'column10', name: 'Column 10', fieldName: 'column10', minWidth: 100, maxWidth: 200, isResizable: true },
];

const items = [];
for (let i = 0; i <= 100; i++) {
    items.push({
        column1: `Item ${i}`,
        column2: `Data ${i}`,
        column3: `Data ${i}`,
        column4: `Data ${i}`,
        column5: `Data ${i}`,
        column6: `Data ${i}`,
        column7: `Data ${i}`,
        column8: `Data ${i}`,
        column9: `Data ${i}`,
        column10: `Data ${i}`,
    });
}

const DetailListSticky: React.FC = () => {
    const listRef = React.useRef(null);
    const [isSticky, setIsSticky] = React.useState(false);

    const handleScroll = () => {
        if (listRef.current) {
            const listPosition = listRef.current.getBoundingClientRect().top;
            setIsSticky(listPosition <= 0); // Jika posisi scroll sudah mencapai elemen
        }
    };

    React.useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll); // Membersihkan event listener saat komponen unmount
        };
    }, []);

    const [listHeight, setListHeight] = React.useState(window.innerHeight); // Set initial height to the window height

    // Function to calculate and set the height dynamically
    const calculateHeight = () => {
        console.log(window.innerHeight)
        const footerHeight = 30; // Example fixed height of footer (adjust as needed)
        const availableHeight = window.innerHeight - footerHeight;
        setListHeight(availableHeight);
    };

    // Use useEffect to handle resizing the window
    React.useEffect(() => {
        // Set height on initial render
        calculateHeight();
        // Add event listener to handle window resize
        window.addEventListener('resize', calculateHeight);
        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener('resize', calculateHeight);
        };
    }, []);
    return (
        <div>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur voluptate modi iure sint nam cumque, tempore distinctio dolorem iusto asperiores, doloribus accusantium fuga aliquam dignissimos alias quidem, nihil ipsa aliquid.
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia esse, aperiam eaque amet obcaecati doloremque. Deserunt nisi molestiae beatae amet vel, aliquam delectus voluptates vitae eligendi rem nulla velit tempore?Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur voluptate modi iure sint nam cumque, tempore distinctio dolorem iusto asperiores, doloribus accusantium fuga aliquam dignissimos alias quidem, nihil ipsa aliquid.
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia esse, aperiam eaque amet obcaecati doloremque. Deserunt nisi molestiae beatae amet vel, aliquam delectus voluptates vitae eligendi rem nulla velit tempore?Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur voluptate modi iure sint nam cumque, tempore distinctio dolorem iusto asperiores, doloribus accusantium fuga aliquam dignissimos alias quidem, nihil ipsa aliquid.
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia esse, aperiam eaque amet obcaecati doloremque. Deserunt nisi molestiae beatae amet vel, aliquam delectus voluptates vitae eligendi rem nulla velit tempore?Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur voluptate modi iure sint nam cumque, tempore distinctio dolorem iusto asperiores, doloribus accusantium fuga aliquam dignissimos alias quidem, nihil ipsa aliquid.
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia esse, aperiam eaque amet obcaecati doloremque. Deserunt nisi molestiae beatae amet vel, aliquam delectus voluptates vitae eligendi rem nulla velit tempore?Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur voluptate modi iure sint nam cumque, tempore distinctio dolorem iusto asperiores, doloribus accusantium fuga aliquam dignissimos alias quidem, nihil ipsa aliquid.
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia esse, aperiam eaque amet obcaecati doloremque. Deserunt nisi molestiae beatae amet vel, aliquam delectus voluptates vitae eligendi rem nulla velit tempore?Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur voluptate modi iure sint nam cumque, tempore distinctio dolorem iusto asperiores, doloribus accusantium fuga aliquam dignissimos alias quidem, nihil ipsa aliquid.
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia esse, aperiam eaque amet obcaecati doloremque. Deserunt nisi molestiae beatae amet vel, aliquam delectus voluptates vitae eligendi rem nulla velit tempore?Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur voluptate modi iure sint nam cumque, tempore distinctio dolorem iusto asperiores, doloribus accusantium fuga aliquam dignissimos alias quidem, nihil ipsa aliquid.
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia esse, aperiam eaque amet obcaecati doloremque. Deserunt nisi molestiae beatae amet vel, aliquam delectus voluptates vitae eligendi rem nulla velit tempore?Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur voluptate modi iure sint nam cumque, tempore distinctio dolorem iusto asperiores, doloribus accusantium fuga aliquam dignissimos alias quidem, nihil ipsa aliquid.
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia esse, aperiam eaque amet obcaecati doloremque. Deserunt nisi molestiae beatae amet vel, aliquam delectus voluptates vitae eligendi rem nulla velit tempore?Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur voluptate modi iure sint nam cumque, tempore distinctio dolorem iusto asperiores, doloribus accusantium fuga aliquam dignissimos alias quidem, nihil ipsa aliquid.
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia esse, aperiam eaque amet obcaecati doloremque. Deserunt nisi molestiae beatae amet vel, aliquam delectus voluptates vitae eligendi rem nulla velit tempore?Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur voluptate modi iure sint nam cumque, tempore distinctio dolorem iusto asperiores, doloribus accusantium fuga aliquam dignissimos alias quidem, nihil ipsa aliquid.
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia esse, aperiam eaque amet obcaecati doloremque. Deserunt nisi molestiae beatae amet vel, aliquam delectus voluptates vitae eligendi rem nulla velit tempore?Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur voluptate modi iure sint nam cumque, tempore distinctio dolorem iusto asperiores, doloribus accusantium fuga aliquam dignissimos alias quidem, nihil ipsa aliquid.
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia esse, aperiam eaque amet obcaecati doloremque. Deserunt nisi molestiae beatae amet vel, aliquam delectus voluptates vitae eligendi rem nulla velit tempore?Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur voluptate modi iure sint nam cumque, tempore distinctio dolorem iusto asperiores, doloribus accusantium fuga aliquam dignissimos alias quidem, nihil ipsa aliquid.
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia esse, aperiam eaque amet obcaecati doloremque. Deserunt nisi molestiae beatae amet vel, aliquam delectus voluptates vitae eligendi rem nulla velit tempore?Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur voluptate modi iure sint nam cumque, tempore distinctio dolorem iusto asperiores, doloribus accusantium fuga aliquam dignissimos alias quidem, nihil ipsa aliquid.
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia esse, aperiam eaque amet obcaecati doloremque. Deserunt nisi molestiae beatae amet vel, aliquam delectus voluptates vitae eligendi rem nulla velit tempore?
            </p>
            {/* <div
                style={{
                    position: "sticky",
                    top: 0,
                    padding: "5px",
                    backgroundColor: "#cae8ca",
                    border: "2px solid #4CAF50",
                    zIndex: 10,
                    // paddingRight: 2000
                }}>
                haha
            </div>
            <div>h</div> */}
            {/* <div ref={listRef}>
                <DetailsList
                    items={items}
                    columns={columns}
                    onRenderDetailsHeader={(props, defaultRender) => (
                        defaultRender!(props)
                    )}
                    styles={{
                        root: {
                            overflow: isSticky ? "visible" : "auto visible"
                        },
                        headerWrapper: isSticky && {
                            position: "sticky",
                            top: 0,
                            zIndex: 10
                        }
                    }}
                />
            </div> */}

            {/* <DetailsList
                items={items}
                columns={columns}
                onRenderDetailsHeader={(props, defaultRender) => (
                    defaultRender!(props)
                )}
                styles={{
                    root: {
                        // overflow: "visible",
                        overflowX: "auto",
                        overflowY: "visible",
                        
                        height: 500,
                        position: "relative"
                    },
                    headerWrapper: {
                        position: "sticky",
                        top: 0,
                        zIndex: 10
                    }
                }}
            /> */}

            {/* <DetailsList
                items={items}
                columns={columns}
                onRenderDetailsHeader={(props, defaultRender) => (
                    defaultRender!(props)
                )}
                styles={{
                    root: {
                        overflow: "auto",
                        height: "80vh",
                        position: "relative"
                    }
                    
                }}
            /> */}


            {/* <DetailsList
                items={items}
                columns={columns}
                onRenderDetailsHeader={(props, defaultRender) => (
                    defaultRender!(props)
                )}
                styles={{
                    root: {
                        // height: `${listHeight}px`, // Dynamically set height
                        overflow: 'auto',
                        position: "relative"
                    },
                    headerWrapper: {
                        position: "sticky",
                        top: 0,
                        zIndex: 10
                    }
                }}
                onShouldVirtualize={() => false}
            /> */}

            <DetailsList
                items={items}
                columns={columns}
                onRenderDetailsHeader={(props, defaultRender) => (
                    <Affix offsetTop={0}>{defaultRender!(props)}</Affix>
                )}
                styles={{
                    root: {
                        // height: `${listHeight}px`, // Dynamically set height
                        overflow: 'auto',
                        position: "relative"
                    }
                }}
                onShouldVirtualize={() => false}
            />

        </div>



    );
};

export default DetailListSticky;


// import * as React from 'react';
// import { DetailsList, IColumn } from '@fluentui/react';
// import { mergeStyleSets } from '@fluentui/react/lib/Styling';
// import { useEffect, useRef } from 'react';
// import { Affix } from 'antd';

// const columns: IColumn[] = [
//     { key: 'column1', name: 'Column 1', fieldName: 'column1', minWidth: 100, maxWidth: 200, isResizable: true },
//     { key: 'column2', name: 'Column 2', fieldName: 'column2', minWidth: 100, maxWidth: 200, isResizable: true },
//     // Add more columns to trigger horizontal scrolling
//     { key: 'column3', name: 'Column 3', fieldName: 'column3', minWidth: 100, maxWidth: 200, isResizable: true },
//     { key: 'column4', name: 'Column 4', fieldName: 'column4', minWidth: 100, maxWidth: 200, isResizable: true },
//     { key: 'column5', name: 'Column 5', fieldName: 'column5', minWidth: 100, maxWidth: 200, isResizable: true },
// ];

// const items = [];
// for (let i = 0; i <= 100; i++) {
//     items.push({
//         column1: `Item ${i}`,
//         column2: `Data ${i}`,
//         column3: `Value ${i}`,
//         column4: `Text ${i}`,
//         column5: `Other ${i}`,
//     });
// }

// const classNames = mergeStyleSets({
//     container: {
//         // height: '400px',
//         // overflowX: 'auto', // Allow horizontal scrolling
//     },
// });

// const DetailListWithScroll: React.FC = () => {
//     const detailsListRef = useRef<HTMLDivElement>(null);
//     // Custom event handler for scroll
//     const handleScroll = (event: Event) => {
//         const target = event.target as HTMLElement;
//         console.log(target)
//         console.log('Horizontal Scroll Position:', target.scrollLeft);
//         // Add custom behavior here, like updating another element, synchronizing scrolling, etc.
//     };
//     useEffect(() => {
//         const container = detailsListRef.current;



//         // Attach scroll event listener
//         if (container) {
//             container.addEventListener('scroll', handleScroll);
//         }

//         // Clean up event listener
//         return () => {
//             if (container) {
//                 container.removeEventListener('scroll', handleScroll);
//             }
//         };
//     }, []);

//     return (
//         <div>
//             {/* Content above the DetailsList */}
//             <div>
//                 <h3>Some Content Above the List</h3>
//                 <p>This is additional content that will be visible before the DetailsList.</p>
//             </div>

//             {/* Scrollable container for DetailsList */}
//             <div className={classNames.container} ref={detailsListRef}>
//                 <DetailsList
//                     items={items}
//                     columns={columns}
//                     onRenderDetailsHeader={(props, defaultRender) => (
//                         <Affix offsetTop={0}>
//                             {defaultRender!(props)}
//                         </Affix>
//                     )}
//                 // componentRef={detailsListRef}
//                 // onRenderDetailsHeader and other custom props
//                 />
//             </div>
//         </div>
//     );
// };

// export default DetailListWithScroll;
