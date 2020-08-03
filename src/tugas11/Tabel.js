import React, { Component } from "react";
import "../App.css";

let dataHargaBuah = [
  { nama: "Semangka", harga: 10000, berat: 1000 },
  { nama: "Anggur", harga: 40000, berat: 500 },
  { nama: "Strawberry", harga: 30000, berat: 400 },
  { nama: "Jeruk", harga: 30000, berat: 1000 },
  { nama: "Mangga", harga: 30000, berat: 500 },
];

class TabelBuah extends Component {
  render() {
    return (
      <div>
        <div className="container">
          <h1>Tabel Harga Buah</h1>
          <table>
            <tr>
              <th>Nama</th>
              <th>Harga</th>
              <th>Berat</th>
            </tr>
            {dataHargaBuah.map((buah) => {
              return (
                <tr>
                  <td>{buah.nama} </td>
                  <td>{buah.harga}</td>
                  <td>{buah.berat / 1000 + " Kg"}</td>
                </tr>
              );
            })}
          </table>
        </div>
      </div>
    );
  }
}

export default TabelBuah;
