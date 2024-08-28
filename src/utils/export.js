import jsPDF from 'jspdf';
export function exportToCSV(barang) {
  let csvContent = "data:text/csv;charset=utf-8,";
  csvContent += "Nama Barang,Peminjam,Tanggal Peminjaman,Tanggal Pengembalian,Status\n";
  
  barang.forEach((item) => {
    const status = item.dikembalikan ? 'Dikembalikan' : 'Belum Dikembalikan';
    const tanggalPengembalian = item.dikembalikan 
      ? `${item.tanggalPengembalian} - ${item.waktuPengembalian}` 
      : '-';
      
    // Menyusun baris CSV dengan escaping karakter yang diperlukan
    const row = [
      item.nama,
      item.peminjam,
      `${item.tanggal} - ${item.waktu}`,
      tanggalPengembalian,
      status
    ].map(field => `"${field.replace(/"/g, '""')}"`).join(',');

    csvContent += row + "\n";
  });

  // Membuat URI yang di-encode
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "barang_list.csv");
  
  // Menambahkan link ke DOM, klik, dan menghapus link
  document.body.appendChild(link); // Diperlukan untuk Firefox
  link.click();
  document.body.removeChild(link); // Menghapus link setelah digunakan
}



export function exportToPDF(barang) {
  const doc = new jsPDF('l', 'mm', 'a4');
  let yOffset = 20;
  const xOffset = 10;
  const rowHeight = 10;
  const columnWidths = [15, 50, 30, 50, 50, 30];

  // Menambahkan judul
  doc.setFontSize(16);
  doc.text("Daftar Barang Peminjaman", xOffset, yOffset);
  yOffset += 10;
  
  // Menambahkan header tabel
  doc.setFontSize(12);
  doc.text("No", xOffset, yOffset);
  doc.text("Nama Barang", xOffset + columnWidths[0], yOffset);
  doc.text("Peminjam", xOffset + columnWidths[0] + columnWidths[1], yOffset);
  doc.text("Tanggal Peminjaman", xOffset + columnWidths[0] + columnWidths[1] + columnWidths[2], yOffset);
  doc.text("Tanggal Pengembalian", xOffset + columnWidths[0] + columnWidths[1] + columnWidths[2] + columnWidths[3], yOffset);
  doc.text("Status", xOffset + columnWidths[0] + columnWidths[1] + columnWidths[2] + columnWidths[3] + columnWidths[4], yOffset);

  // Menambahkan garis horizontal untuk header
  doc.setDrawColor(0);
  doc.line(xOffset, yOffset + 2, xOffset + columnWidths.reduce((a, b) => a + b, 0), yOffset + 2);
  yOffset += rowHeight;

  // Menambahkan data tabel
  barang.forEach((item, index) => {
    const status = item.dikembalikan ? 'Dikembalikan' : 'Belum Dikembalikan';
    const tanggalPengembalian = item.dikembalikan ? `${item.tanggalPengembalian} - ${item.waktuPengembalian}` : '-';

    doc.text((index + 1).toString(), xOffset, yOffset);
    doc.text(item.nama, xOffset + columnWidths[0], yOffset);
    doc.text(item.peminjam, xOffset + columnWidths[0] + columnWidths[1], yOffset);
    doc.text(`${item.tanggal} - ${item.waktu}`, xOffset + columnWidths[0] + columnWidths[1] + columnWidths[2], yOffset);
    doc.text(tanggalPengembalian, xOffset + columnWidths[0] + columnWidths[1] + columnWidths[2] + columnWidths[3], yOffset);
    doc.text(status, xOffset + columnWidths[0] + columnWidths[1] + columnWidths[2] + columnWidths[3] + columnWidths[4], yOffset);

    yOffset += rowHeight;

    // Tambah halaman baru jika yOffset melebihi batas halaman
    if (yOffset > 270) {
      doc.addPage();
      yOffset = 20;
      doc.text("Daftar Barang Peminjaman", xOffset, yOffset);
      yOffset += 10;
    }
  });

  // Menyimpan PDF
  doc.save("barang_list.pdf");
}
