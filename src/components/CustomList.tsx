
// interface ICustomList {
//     columns: IColumn[],
//     items: any[],
//     onRenderItemColumn?: Function
// }

// const styles = mergeStyleSets({
//     customListWrapper: {
//         padding: 20,
//         backgroundColor: "#e8f9ff",
//         border: "3px dashed #42c5f5",
//         overflowX: "auto",
//         minHeight: 80
//     },
//     header: {
//         backgroundColor: "#fff",
//         padding: '8px 12px',
//     },
//     headerCol: {
//         fontSize: 14,
//         backgroundColor: "#fff",
//         selectors: {
//             ":hover": {
//                 backgroundColor: "#ededed"
//             }
//         }
//     },
//     row: {
//         backgroundColor: "#fff",
//         borderTop: '1px solid #ededed',
//         borderBottom: '1px solid #ededed',
//         fontSize: 12,
//         padding: '4px 12px',
//         display: "flex",
//         alignItems: "center",
//         selectors: {
//             ":hover": {
//                 backgroundColor: "#ededed"
//             }
//         }
//     },
//     rowCol: {
//         display: "inline-block",
//     }
// })

// const addNewFilterBtnStyles: IButtonStyles = {
//     label: { color: "#0078d4" }, icon: { color: "#0078d4" }, iconPressed: { color: "#0078d4" }
// }
// const Header: React.FunctionComponent<any> = (props: { columns: IColumn[] }): JSX.Element => {

//     return (
//         <Stack
//             horizontal
//             verticalAlign="center"
//             className={styles.header}
//         >
//             {props?.columns?.map((item) => {
//                 return (
//                     <div
//                         className={styles.headerCol}
//                         style={{
//                             minWidth: item.minWidth,
//                             maxWidth: item.maxWidth,
//                         }}

//                     >
//                         <strong>{item.name}</strong>
//                     </div>
//                 )
//             })}
//         </Stack>
//     )
// }

// const Row: React.FunctionComponent<any> = (props: { columns: IColumn[], items: any[], onRenderItemColumn }): JSX.Element => {
//     return (<>
//         {props?.items?.map((item, index) => (
//             <div className={styles.row}>
//                 {props.columns?.map((column) => {
//                     return (
//                         <div
//                             className={styles.rowCol}
//                             style={{
//                                 minWidth: column.minWidth,
//                                 maxWidth: column.maxWidth,
//                             }}
//                         >
//                             {props?.onRenderItemColumn(item, index, column) ?? item[column.fieldName]}
//                         </div>
//                     )
//                 })}
//             </div>
//         ))}
//     </>)
// }

// const CustomList: React.FunctionComponent<ICustomList> = (props) => {
//     const columns = props.columns;
//     const items = props.items;
//     const onRenderItemColumn = props.onRenderItemColumn;
//     return (
//         <div className={styles.customListWrapper}>
//             <Header
//                 columns={columns}
//             />
//             <Row
//                 columns={columns}
//                 items={items}
//                 onRenderItemColumn={onRenderItemColumn}
//             />
//         </div>
//     )
// }