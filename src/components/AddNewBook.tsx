// App.js
import React, { useState } from 'react';
import { Stack, TextField, PrimaryButton, DatePicker, DayOfWeek } from '@fluentui/react';

const AddNewBook = () => {
  // State untuk form
  const [formData, setFormData] = useState({
    nama: '',
    penulis: '',
    penerbit: '',
    tanggalTerbit: null,
  });

  const handleInputChange = (event, newValue) => {
    const { name } = event.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: newValue,
    }));
  };

  const handleDateChange = (date) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      tanggalTerbit: date,
    }));
  };

  const handleSubmit = () => {
    alert(JSON.stringify(formData, null, 2));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Tambah Buku</h2>
      <Stack tokens={{ childrenGap: 15 }}>
        <Stack horizontal tokens={{ childrenGap: 15 }}>
          <TextField
            label="Nama"
            name="nama"
            value={formData.nama}
            onChange={handleInputChange}
            styles={{ root: { width: 300 } }}
          />
          <TextField
            label="Penulis"
            name="penulis"
            value={formData.penulis}
            onChange={handleInputChange}
            styles={{ root: { width: 300 } }}
          />
        </Stack>
        <Stack horizontal tokens={{ childrenGap: 15 }}>
          <TextField
            label="Penerbit"
            name="penerbit"
            value={formData.penerbit}
            onChange={handleInputChange}
            styles={{ root: { width: 300 } }}
          />
          <DatePicker
            label="Tanggal Terbit"
            value={formData.tanggalTerbit}
            onSelectDate={handleDateChange}
            firstDayOfWeek={DayOfWeek.Monday}
            placeholder="Pilih tanggal terbit"
            ariaLabel="Pilih tanggal terbit"
            styles={{ root: { width: 300 } }}
          />
        </Stack>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 20 }}>
          <PrimaryButton text="Save" onClick={handleSubmit} />
        </div>
      </Stack>
    </div>
  );
};

export default AddNewBook;
