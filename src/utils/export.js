import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

// Fungsi untuk mengunduh file CSV
export function exportToCSV(data) {
  const csvData = data.map(item => ({
    Nama: item.nama,
    Peminjam: item.peminjam,
    TanggalPeminjaman: item.tanggal + ' - ' + item.waktu,
    TanggalPengembalian: item.dikembalikan ? item.tanggalPengembalian + ' - ' + item.waktuPengembalian : '-',
    Status: item.dikembalikan ? 'Dikembalikan' : 'Belum Dikembalikan'
  }));
  
  const csvContent = "data:text/csv;charset=utf-8,"
    + Object.keys(csvData[0]).join(",") + "\n"
    + csvData.map(row => Object.values(row).join(",")).join("\n");

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "barang_data.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Fungsi untuk mengunduh file PDF
export function exportToPDF(data) {
  const doc = new jsPDF();
  doc.text("Daftar Barang", 10, 10);

  const tableColumn = ["Nama Barang", "Peminjam", "Tanggal Peminjaman", "Tanggal Pengembalian", "Status"];
  const tableRows = data.map(item => [
    item.nama,
    item.peminjam,
    item.tanggal + ' - ' + item.waktu,
    item.dikembalikan ? item.tanggalPengembalian + ' - ' + item.waktuPengembalian : '-',
    item.dikembalikan ? 'Dikembalikan' : 'Belum Dikembalikan'
  ]);

  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 20
  });

  doc.save('barang_data.pdf');
}
