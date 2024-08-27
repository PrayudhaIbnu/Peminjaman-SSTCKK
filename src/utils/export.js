import jsPDF from 'jspdf';

export function exportToCSV(barang) {
  let csvContent = "data:text/csv;charset=utf-8,";
  csvContent += "Nama Barang,Peminjam,Tanggal Peminjaman,Tanggal Pengembalian,Status\n";
  
  barang.forEach((item) => {
    const status = item.dikembalikan ? 'Dikembalikan' : 'Belum Dikembalikan';
    const tanggalPengembalian = item.dikembalikan ? item.tanggalPengembalian + " - " + item.waktuPengembalian : '-';
    const row = `${item.nama},${item.peminjam},${item.tanggal} - ${item.waktu},${tanggalPengembalian},${status}`;
    csvContent += row + "\n";
  });

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "barang_list.csv");
  document.body.appendChild(link); // Diperlukan untuk Firefox
  link.click();
  document.body.removeChild(link); // Menghapus link setelah digunakan
}

export function exportToPDF(barang) {
  const doc = new jsPDF();
  let yOffset = 10;

  doc.setFontSize(16);
  doc.text("Daftar Barang Peminjaman", 10, yOffset);
  yOffset += 10;

  barang.forEach((item, index) => {
    const status = item.dikembalikan ? 'Dikembalikan' : 'Belum Dikembalikan';
    const tanggalPengembalian = item.dikembalikan ? item.tanggalPengembalian + " - " + item.waktuPengembalian : '-';

    doc.setFontSize(12);
    doc.text(`No: ${index + 1}`, 10, yOffset);
    doc.text(`Nama Barang: ${item.nama}`, 10, yOffset + 6);
    doc.text(`Peminjam: ${item.peminjam}`, 10, yOffset + 12);
    doc.text(`Tanggal Peminjaman: ${item.tanggal} - ${item.waktu}`, 10, yOffset + 18);
    doc.text(`Tanggal Pengembalian: ${tanggalPengembalian}`, 10, yOffset + 24);
    doc.text(`Status: ${status}`, 10, yOffset + 30);

    yOffset += 40;

    if (yOffset > 270) {
      doc.addPage();
      yOffset = 10;
    }
  });

  doc.save("barang_list.pdf");
}
