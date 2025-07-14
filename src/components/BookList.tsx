import { DetailsList, DetailsListLayoutMode, IColumn, PrimaryButton } from "@fluentui/react";
import React from "react";

const BookList = (props) => {
    // Dummy data
    const books = [
        { key: 1, namaBuku: 'Buku A', penulis: 'Penulis A', penerbit: 'Penerbit A', tanggalTerbit: "22-12-2021" },
        { key: 2, namaBuku: 'Buku B', penulis: 'Penulis B', penerbit: 'Penerbit B', tanggalTerbit: "22-12-2022" },
        { key: 3, namaBuku: 'Buku C', penulis: 'Penulis C', penerbit: 'Penerbit C', tanggalTerbit: "22-12-2023" },
    ];

    // Kolom definisi
    const columns: IColumn[] = [
        { key: 'column1', name: 'No', fieldName: 'key', minWidth: 30, maxWidth: 30, isResizable: true },
        { key: 'column2', name: 'Nama Buku', fieldName: 'namaBuku', minWidth: 100, maxWidth: 200, isResizable: true },
        { key: 'column3', name: 'Penulis', fieldName: 'penulis', minWidth: 100, maxWidth: 200, isResizable: true },
        { key: 'column4', name: 'Penerbit', fieldName: 'penerbit', minWidth: 100, maxWidth: 200, isResizable: true },
        { key: 'column5', name: 'Tanggal Terbit', fieldName: 'tanggalTerbit', minWidth: 50, maxWidth: 100, isResizable: true },
        {
            key: 'column6',
            name: 'Action',
            fieldName: 'action',
            minWidth: 100,
            maxWidth: 200,
            isResizable: true,
            onRender: (item) => (
                <div>
                    <PrimaryButton text="Ubah" onClick={() => handleEdit(item)} />
                    <PrimaryButton text="Hapus" onClick={() => handleDelete(item)} style={{ marginLeft: 10 }} />
                </div>
            ),
        },
    ];

    const handleEdit = (item) => {
        alert(`Edit ${item.namaNuku}`);
    };

    const handleDelete = (item) => {
        alert(`Delete ${item.namaNuku}`);
    };

    return (
        <div style={{ margin: '20px' }}>
            <PrimaryButton text="Tambah buku" onClick={() => { }} />
            <DetailsList
                items={books}
                columns={columns}
                setKey="set"
                layoutMode={DetailsListLayoutMode.justified}
                selectionMode={0}
                isHeaderVisible={true}
            />
        </div>
    );
}

export default BookList;