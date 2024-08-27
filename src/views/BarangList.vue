<template>
  <div class="min-h-screen bg-gray-100">
    <div class="container mx-auto">
      <div class="flex justify-end mt-4 space-x-4">
        <button @click="downloadCSV" class="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600">
          Download CSV
        </button>
        <button @click="downloadPDF" class="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600">
          Download PDF
        </button>
      </div>
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-4">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">Nama Barang</th>
              <th scope="col" class="px-6 py-3">Peminjam</th>
              <th scope="col" class="px-6 py-3">Tanggal Peminjaman</th>
              <th scope="col" class="px-6 py-3">Tanggal Pengembalian</th>
              <th scope="col" class="px-6 py-3">Status</th>
              <th scope="col" class="px-6 py-3">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(barang, index) in barang" :key="barang.id" class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
              <td class="px-6 py-4">{{ barang.nama }}</td>
              <td class="px-6 py-4">{{ barang.peminjam }}</td>
              <td class="px-6 py-4">{{ barang.tanggal }} - {{ barang.waktu }}</td>
              <td class="px-6 py-4">
                {{ barang.dikembalikan ? barang.tanggalPengembalian + ' - ' + barang.waktuPengembalian : '-' }}
              </td>
              <td class="px-6 py-4">
                <span :class="{ 'text-green-600': barang.dikembalikan, 'text-red-600': !barang.dikembalikan }">
                  {{ barang.dikembalikan ? 'Dikembalikan' : 'Belum Dikembalikan' }}
                </span>
              </td>
              <td class="px-6 py-4 text-right">
                <button @click="kembalikanBarang(index)" :disabled="barang.dikembalikan"
                  class="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed">
                  Kembalikan
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '@/firebase';
import jsPDF from 'jspdf';

export default {
  data() {
    return {
      barang: []
    };
  },
  methods: {
    async muatDariFirestore() {
      try {
        const barangRef = collection(db, 'barang');
        const snapshot = await getDocs(barangRef);
        this.barang = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      } catch (error) {
        console.error("Error fetching documents: ", error);
      }
    },
    async kembalikanBarang(index) {
      try {
        const now = new Date();
        const tanggalPengembalian = now.toISOString().split('T')[0];
        const waktuPengembalian = now.toTimeString().split(' ')[0];

        const barangRef = doc(db, 'barang', this.barang[index].id);
        await updateDoc(barangRef, {
          dikembalikan: true,
          tanggalPengembalian,
          waktuPengembalian
        });
        this.muatDariFirestore();
      } catch (error) {
        console.error("Error updating document: ", error);
      }
    },
    downloadCSV() {
      let csvContent = "data:text/csv;charset=utf-8,";

      // Tambahkan Header CSV
      csvContent += "Nama Barang,Peminjam,Tanggal Peminjaman,Tanggal Pengembalian,Status\n";

      // Tambahkan data barang ke CSV
      this.barang.forEach((barang) => {
        const status = barang.dikembalikan ? 'Dikembalikan' : 'Belum Dikembalikan';
        const tanggalPengembalian = barang.dikembalikan ? barang.tanggalPengembalian + " - " + barang.waktuPengembalian : '-';
        const row = `${barang.nama},${barang.peminjam},${barang.tanggal} - ${barang.waktu},${tanggalPengembalian},${status}`;
        csvContent += row + "\n";
      });

      // Download CSV
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "barang_list.csv");
      document.body.appendChild(link); // Diperlukan untuk Firefox
      link.click();
      document.body.removeChild(link); // Menghapus link setelah digunakan
    },
    downloadPDF() {
      const doc = new jsPDF();
      let yOffset = 10;

      // Tambahkan Judul ke PDF
      doc.setFontSize(16);
      doc.text("Daftar Barang", 10, yOffset);
      yOffset += 10;

      // Tambahkan Header PDF
      doc.setFontSize(12);
      doc.text("Nama Barang", 10, yOffset);
      doc.text("Peminjam", 60, yOffset);
      doc.text("Tanggal Peminjaman", 110, yOffset);
      doc.text("Tanggal Pengembalian", 160, yOffset);
      doc.text("Status", 210, yOffset);
      yOffset += 10;

      // Tambahkan data barang ke PDF
      this.barang.forEach((barang) => {
        const status = barang.dikembalikan ? 'Dikembalikan' : 'Belum Dikembalikan';
        const tanggalPengembalian = barang.dikembalikan ? barang.tanggalPengembalian + " - " + barang.waktuPengembalian : '-';
        
        doc.text(barang.nama, 10, yOffset);
        doc.text(barang.peminjam, 60, yOffset);
        doc.text(`${barang.tanggal} - ${barang.waktu}`, 110, yOffset);
        doc.text(tanggalPengembalian, 160, yOffset);
        doc.text(status, 210, yOffset);
        yOffset += 10;
      });

      // Download PDF
      doc.save('barang_list.pdf');
    }
  },
  mounted() {
    this.muatDariFirestore();
  }
}
</script>

<style scoped>
/* Tambahkan gaya tambahan di sini jika diperlukan */
</style>
