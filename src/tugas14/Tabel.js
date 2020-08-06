import React, { useState, useEffect } from "react";
import "../App.css";
import axios from "axios";

const TabelBuah = () => {
  const [dataHargaBuah, setDataHargaBuah] = useState(null);
  const [inputNama, setInputNama] = useState("");
  const [inputHarga, setInputHarga] = useState("");
  const [inputBerat, setInputBerat] = useState("");
  const [selectedId, setSelectedId] = useState(0);
  const [statusForm, setStatusForm] = useState("create");

  useEffect(() => {
    if (dataHargaBuah === null) {
      axios
        .get(`http://backendexample.sanbercloud.com/api/fruits`)
        .then((res) => {
          setDataHargaBuah(
            res.data.map((item) => {
              return {
                id: item.id,
                nama: item.name,
                harga: item.price,
                berat: item.weight,
              };
            })
          );
        });
    }
  }, [dataHargaBuah]);

  const handleChange = (event) => {
    let typeOfInput = event.target.name;
    switch (typeOfInput) {
      case "nama":
        setInputNama(event.target.value);
        break;
      case "berat":
        setInputBerat(event.target.value);
        break;
      case "harga":
        setInputHarga(event.target.value);
        break;
      default:
        break;
    }
  };

  const handleEdit = (event) => {
    let idBuah = parseInt(event.target.value);
    let buah = dataHargaBuah.find((x) => x.id === idBuah);
    setInputNama(buah.nama);
    setInputHarga(buah.harga);
    setInputBerat(buah.berat);
    setSelectedId(idBuah);
    setStatusForm("edit");
  };

  const handleDelete = (event) => {
    let idBuah = parseInt(event.target.value);
    let newDataBuah = dataHargaBuah.filter((item) => item.id !== idBuah);
    axios
      .delete(`http://backendexample.sanbercloud.com/api/fruits/${idBuah}`)
      .then((res) => {
        console.log(res);
      });
    setDataHargaBuah([...newDataBuah]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      inputNama.replace(/\s/g, "") !== "" &&
      inputHarga !== "" &&
      inputBerat !== ""
    ) {
      if (statusForm === "create") {
        axios.post(`http://backendexample.sanbercloud.com/api/fruits`, {
          inputNama,
          inputHarga,
          inputBerat,
        });
      } else if (statusForm === "edit") {
        axios
          .put(
            `http://backendexample.sanbercloud.com/api/fruits/${selectedId}`,
            { inputNama, inputHarga, inputBerat }
          )
          .then((res) => {
            let dataBuah = dataHargaBuah.find((item) => item.id === selectedId);
            dataBuah.nama = inputNama;
            dataBuah.harga = inputHarga;
            dataBuah.berat = inputBerat;
            setDataHargaBuah([...dataHargaBuah]);
          });
      }
      setStatusForm("create");
      setSelectedId(0);
      setInputNama("");
      setInputHarga("");
      setInputBerat("");
    }
  };

  return (
    <div>
      <div className="container">
        <h1>Tabel Harga Buah</h1>
        <table>
          <thead>
            <tr>
              <th>Nama</th>
              <th>Harga</th>
              <th>Berat</th>
              <th>Aksi</th>
            </tr>
          </thead>
          {dataHargaBuah !== null &&
            dataHargaBuah.map((buah, index) => {
              return (
                <tbody key={index}>
                  <tr>
                    <td>{buah.nama} </td>
                    <td>{buah.harga}</td>
                    <td>{buah.berat / 1000 + " Kg"}</td>
                    <td style={{ textAlign: "center", margin: "0" }}>
                      <button onClick={handleEdit} value={index}>
                        Edit
                      </button>
                      &nbsp;
                      <button onClick={handleDelete} value={index}>
                        Delete
                      </button>
                    </td>
                  </tr>
                </tbody>
              );
            })}
        </table>
      </div>

      <div className="container">
        <h1>Form Tambah/Edit Buah</h1>

        <form onSubmit={handleSubmit}>
          <table>
            <tbody>
              <tr>
                <th>Nama Buah :</th>
                <td style={{ textAlign: "center" }}>
                  <input
                    type="text"
                    name="nama"
                    value={inputNama}
                    onChange={handleChange}
                    placeholder="Masukkan Nama Buah .."
                  />
                </td>
              </tr>
              <tr>
                <th>Harga Buah :</th>
                <td style={{ textAlign: "center" }}>
                  <input
                    type="text"
                    name="harga"
                    value={inputHarga}
                    onChange={handleChange}
                    placeholder="Masukkan Harga .."
                  />
                </td>
              </tr>
              <tr>
                <th>Berat Buah :</th>
                <td style={{ textAlign: "center" }}>
                  <input
                    type="text"
                    name="berat"
                    value={inputBerat}
                    onChange={handleChange}
                    placeholder="Masukkan Berat Buah dalam Gram .."
                  />
                </td>
              </tr>
              <tr>
                <th></th>
                <td>
                  <div style={{ textAlign: "center" }}>
                    <button>Submit</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    </div>
  );
};

export default TabelBuah;
