import * as React from 'react';
import { DetailsList, DetailsListLayoutMode, IColumn, mergeStyleSets } from '@fluentui/react';

// Generate mock data with 100 rows and 10 columns
const generateItems = () => {
    const items = [];
    for (let i = 0; i < 100; i++) {
        items.push({
            key: i,
            column1: `Item ${i} - Col 1`,
            column2: `Item ${i} - Col 2`,
            column3: `Item ${i} - Col 3`,
            column4: `Item ${i} - Col 4`,
            column5: `Item ${i} - Col 5`,
            column6: `Item ${i} - Col 6`,
            column7: `Item ${i} - Col 7`,
            column8: `Item ${i} - Col 8`,
            column9: `Item ${i} - Col 9`,
            column10: `Item ${i} - Col 10`,
        });
    }
    return items;
};

const items = generateItems();

// Define columns
const columns: IColumn[] = [
    { key: 'column1', name: 'Column 1', fieldName: 'column1', minWidth: 100, maxWidth: 150, isResizable: true },
    { key: 'column2', name: 'Column 2', fieldName: 'column2', minWidth: 100, maxWidth: 150, isResizable: true },
    { key: 'column3', name: 'Column 3', fieldName: 'column3', minWidth: 100, maxWidth: 150, isResizable: true },
    { key: 'column4', name: 'Column 4', fieldName: 'column4', minWidth: 100, maxWidth: 150, isResizable: true },
    { key: 'column5', name: 'Column 5', fieldName: 'column5', minWidth: 100, maxWidth: 150, isResizable: true },
    { key: 'column6', name: 'Column 6', fieldName: 'column6', minWidth: 100, maxWidth: 150, isResizable: true },
    { key: 'column7', name: 'Column 7', fieldName: 'column7', minWidth: 100, maxWidth: 150, isResizable: true },
    { key: 'column8', name: 'Column 8', fieldName: 'column8', minWidth: 100, maxWidth: 150, isResizable: true },
    { key: 'column9', name: 'Column 9', fieldName: 'column9', minWidth: 100, maxWidth: 150, isResizable: true },
    { key: 'column10', name: 'Column 10', fieldName: 'column10', minWidth: 100, maxWidth: 150, isResizable: true },
];

// Custom styles for sticky header
const classNames = mergeStyleSets({
    header: {
        // position: 'sticky',
        // top: 0,
        // zIndex: 1,
        selectors: {
            '.ms-DetailsHeader': {
                backgroundColor: 'white',
                borderBottom: '1px solid #e1e1e1',
                position: 'sticky',
                top: 0,
                zIndex: 10,
            },
        },
    },
    wrapper: {
        overflow: 'auto',
        // maxHeight: '400px', // adjust this to control table height
        position: 'relative',
    },
});

const DetailListStickyV2: React.FC = () => {
    return (
        <div data-is-scrollable={false}>
            <DetailsList
                items={items}
                columns={columns}
                // layoutMode={DetailsListLayoutMode.fixedColumns}
                onRenderDetailsHeader={(props, defaultRender) => (
                    defaultRender!(props)
                )}
                selectionPreservedOnEmptyClick={true}
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
            />
        </div>
    );
};

export default DetailListStickyV2;
