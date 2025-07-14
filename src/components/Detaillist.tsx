import React, { useState, useEffect } from 'react';
import { Announced } from '@fluentui/react/lib/Announced';
import { TextField, ITextFieldStyles } from '@fluentui/react/lib/TextField';
import { DetailsList, DetailsListLayoutMode, Selection, IColumn } from '@fluentui/react/lib/DetailsList';
import { MarqueeSelection } from '@fluentui/react/lib/MarqueeSelection';
import { mergeStyles } from '@fluentui/react/lib/Styling';
import { Text } from '@fluentui/react/lib/Text';
import { ScrollablePane, ScrollbarVisibility, Sticky, StickyPositionType } from '@fluentui/react';

const exampleChildClass = mergeStyles({
    display: 'block',
    marginBottom: '10px',
});

const textFieldStyles: Partial<ITextFieldStyles> = { root: { maxWidth: '300px' } };

const DetailsListBasicExample = () => {
    const [items, setItems] = useState([]);
    const [selectionDetails, setSelectionDetails] = useState('');

    const _selection = new Selection({
        onSelectionChanged: () => setSelectionDetails(_getSelectionDetails()),
    });

    const _allItems = [];
    for (let i = 0; i < 200; i++) {
        _allItems.push({
            key: i,
            name: 'Item ' + i,
            value: i,
        });
    }

    const _columns = [
        { key: 'column1', name: 'Name', fieldName: 'name', minWidth: 100, maxWidth: 200, isResizable: true },
        { key: 'column2', name: 'Value', fieldName: 'value', minWidth: 100, maxWidth: 200, isResizable: true },
    ];

    useEffect(() => {
        setItems(_allItems);
        setSelectionDetails(_getSelectionDetails());
    }, []);

    const _getSelectionDetails = () => {
        const selectionCount = _selection.getSelectedCount();

        switch (selectionCount) {
            case 0:
                return 'No items selected';
            case 1:
                return '1 item selected: ' + (_selection.getSelection()[0] as any).name;
            default:
                return `${selectionCount} items selected`;
        }
    };

    const _onFilter = (ev, text) => {
        setItems(text ? _allItems.filter(i => i.name.toLowerCase().indexOf(text) > -1) : _allItems);
    };

    const _onItemInvoked = (item) => {
        alert(`Item invoked: ${item.name}`);
    };

    return (
        <>
            <p>hahahaha</p>
            <div
                data-is-scrollable={true}
            >
                {/* <div className={exampleChildClass}>{selectionDetails}</div>
            <Text>
                Note: While focusing a row, pressing enter or double clicking will execute onItemInvoked, which in this
                example will show an alert.
            </Text>
            <Announced message={selectionDetails} />
            <TextField
                className={exampleChildClass}
                label="Filter by name:"
                onChange={_onFilter}
                styles={textFieldStyles}
            />
            <Announced message={`Number of items after filter applied: ${items.length}.`} /> */}
                {/* <MarqueeSelection selection={_selection}> */}
                {/* <div style={{ height: '400px', position: 'relative' }}> */}

                <ScrollablePane scrollbarVisibility={ScrollbarVisibility.auto}>
                    <DetailsList
                        items={items}
                        columns={_columns}
                        // setKey="set"
                        layoutMode={DetailsListLayoutMode.justified}
                        selection={_selection}
                        selectionPreservedOnEmptyClick={true}
                        ariaLabelForSelectionColumn="Toggle selection"
                        ariaLabelForSelectAllCheckbox="Toggle selection for all items"
                        checkButtonAriaLabel="select row"
                        onRenderDetailsHeader={(props, defaultRender) => (
                            <Sticky stickyPosition={StickyPositionType.Header} isScrollSynced={true}>
                                {defaultRender!(props)}
                            </Sticky>
                        )}
                    // onItemInvoked={_onItemInvoked}
                    />
                </ScrollablePane>
                {/* </div> */}
                {/* </MarqueeSelection> */}
            </div>
        </>
    );
};

export default DetailsListBasicExample;
