<template>
  <div class="min-h-screen bg-gray-100">
    <div class="container mx-auto">
      <div class="flex justify-end mt-4 space-x-4">
        <button @click="downloadCSV" class="btn btn-success">Download CSV</button>
        <button @click="downloadPDF" class="btn btn-primary">Download PDF</button>
      </div>
      <div class="mt-4 relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-center text-sm text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-center text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
            <tr v-for="(barang, index) in barang" :key="index"
              class="odd:bg-white even:bg-gray-50 border-b dark:border-gray-700">
              <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {{ barang.nama }}
              </td>
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
              <td class="px-6 py-4">
                <button @click="kembalikanBarang(index)" :disabled="barang.dikembalikan"
                  class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
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
import { exportToCSV, exportToPDF } from '../utils/export';

export default {
  data() {
    return {
      barang: []
    };
  },
  methods: {
    kembalikanBarang(index) {
      const now = new Date();
      const tanggalPengembalian = now.toISOString().split('T')[0];
      const waktuPengembalian = now.toTimeString().split(' ')[0];

      this.barang[index].dikembalikan = true;
      this.barang[index].tanggalPengembalian = tanggalPengembalian;
      this.barang[index].waktuPengembalian = waktuPengembalian;

      this.simpanKeLocalStorage();
    },
    simpanKeLocalStorage() {
      localStorage.setItem('barangList', JSON.stringify(this.barang));
    },
    muatDariLocalStorage() {
      const data = localStorage.getItem('barangList');
      if (data) {
        this.barang = JSON.parse(data);
      }
    },
    downloadCSV() {
      exportToCSV(this.barang);
    },
    downloadPDF() {
      exportToPDF(this.barang);
    }
  },
  mounted() {
    this.muatDariLocalStorage();
  }
}
</script>

<style scoped>
.table-auto {
  border-collapse: collapse;
}

.table-auto th,
.table-auto td {
  border: 1px solid #ddd;
  padding: 8px;
}

.table-auto th {
  background-color: #f9f9f9;
  font-weight: bold;
}

.table-auto td {
  text-align: left;
}

.btn {
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
}

.btn-success {
  background-color: #10b981;
  /* Green-500 */
  color: white;
}

.btn-success:hover {
  background-color: #059669;
  /* Green-600 */
}

.btn-primary {
  background-color: #3b82f6;
  /* Blue-500 */
  color: white;
}

.btn-primary:hover {
  background-color: #2563eb;
  /* Blue-600 */
}

.btn-danger {
  background-color: #ef4444;
  /* Red-500 */
  color: white;
}

.btn-danger:hover {
  background-color: #dc2626;
  /* Red-600 */
}
</style>
