import React, { Component } from "react";
import "../App.css";

class TabelBuah extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataHargaBuah: [
        { nama: "Semangka", harga: 10000, berat: 1000 },
        { nama: "Anggur", harga: 40000, berat: 500 },
        { nama: "Strawberry", harga: 30000, berat: 400 },
        { nama: "Jeruk", harga: 30000, berat: 1000 },
        { nama: "Mangga", harga: 30000, berat: 500 },
      ],
      input: {
        nama: "",
        harga: "",
        berat: "",
      },
      indexOfForm: -1,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleChange(event) {
    let input = { ...this.state.input };
    input[event.target.name] = event.target.value;
    this.setState({
      input,
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    let input = this.state.input;
    if (
      input["nama"].replace(/\s/g, "") !== "" &&
      input["harga"].toString().replace(/\s/g, "") !== "" &&
      input["berat"].toString().replace(/\s/g, "") !== ""
    ) {
      let newDataBuah = this.state.dataHargaBuah;
      let index = this.state.indexOfForm;
      if (index === -1) {
        newDataBuah = [...newDataBuah, input];
      } else {
        newDataBuah[index] = input;
      }

      this.setState({
        dataHargaBuah: newDataBuah,
        input: {
          nama: "",
          harga: "",
          berat: "",
        },
        indexOfForm: -1,
      });
    }
  }

  handleEdit(event) {
    let index = event.target.value;
    let buah = this.state.dataHargaBuah[index];
    this.setState({
      input: {
        nama: buah.nama,
        harga: buah.harga,
        berat: buah.berat,
      },
      indexOfForm: index,
    });
  }

  handleDelete(event) {
    let index = event.target.value;
    let newDataBuah = this.state.dataHargaBuah;
    let editDataBuah = newDataBuah[this.state.indexOfForm];
    newDataBuah.splice(index, 1);

    if (editDataBuah !== undefined) {
      var newIndex = newDataBuah.findIndex((el) => el === editDataBuah);
      this.setState({ dataHargaBuah: newDataBuah, indexOfForm: newIndex });
    } else {
      this.setState({ dataHargaBuah: newDataBuah });
    }
  }

  render() {
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
            {this.state.dataHargaBuah.map((buah, index) => {
              return (
                <tbody key={index}>
                  <tr>
                    <td>{buah.nama} </td>
                    <td>{buah.harga}</td>
                    <td>{buah.berat / 1000 + " Kg"}</td>
                    <td style={{ textAlign: "center", margin: "0" }}>
                      <button onClick={this.handleEdit} value={index}>
                        Edit
                      </button>
                      &nbsp;
                      <button onClick={this.handleDelete} value={index}>
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

          <form onSubmit={this.handleSubmit}>
            <table>
              <tbody>
                <tr>
                  <th>Nama Buah :</th>
                  <td style={{ textAlign: "center" }}>
                    <input
                      type="text"
                      name="nama"
                      value={this.state.input.nama}
                      onChange={this.handleChange}
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
                      value={this.state.input.harga}
                      onChange={this.handleChange}
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
                      value={this.state.input.berat}
                      onChange={this.handleChange}
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
  }
}

export default TabelBuah;
