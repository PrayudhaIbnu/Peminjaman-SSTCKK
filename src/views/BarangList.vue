<template>
  <div class="min-h-screen bg-gray-100">
    <div class="container mx-auto">
      <!-- Alert for deletion confirmation -->
      <!-- <div v-if="showAlertHapus" id="alert-hapus"
        class="p-4 m-4 text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
        role="alert">
        <div class="flex items-center">
          <svg class="flex-shrink-0 w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
            fill="currentColor" viewBox="0 0 20 20">
            <path
              d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          <span class="sr-only">Warning</span>
          <h3 class="text-lg font-medium">Konfirmasi Hapus Data</h3>
        </div>
        <div class="mt-2 mb-4 text-sm">
          Apakah Anda yakin ingin menghapus data ini?
        </div>
        <div class="flex">
          <button @click="confirmHapus" type="button"
            class="text-white bg-red-800 hover:bg-red-900 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xs px-3 py-1.5 me-2 text-center inline-flex items-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
            Hapus
          </button>
          <button @click="dismissAlertHapus" type="button"
            class="text-red-800 bg-transparent border border-red-800 hover:bg-red-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center dark:hover:bg-red-600 dark:border-red-600 dark:text-red-500 dark:hover:text-white dark:focus:ring-red-800"
            aria-label="Close">
            Batal
          </button>
        </div>
      </div> -->

      <!-- Alert for return confirmation -->
      <div v-if="showAlertPengembalian" id="alert-pengembalian"
        class="p-4 m-4 text-yellow-800 border border-yellow-300 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300 dark:border-yellow-800"
        role="alert">
        <div class="flex items-center">
          <svg class="flex-shrink-0 w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
            fill="currentColor" viewBox="0 0 20 20">
            <path
              d="M10 1a9 9 0 0 1 9 9 9 9 0 0 1-9 9 9 9 0 0 1-9-9 9 9 0 0 1 9-9Zm-1 8a1 1 0 0 1 2 0v3a1 1 0 0 1-2 0v-3Zm0-4a1 1 0 0 1 2 0v1a1 1 0 0 1-2 0V5Z" />
          </svg>
          <span class="sr-only">Info</span>
          <h3 class="text-lg font-medium">Konfirmasi Pengembalian Barang</h3>
        </div>
        <div class="mt-2 mb-4 text-sm">
          Pastikan tidak ada kerusakan pada barang!
        </div>
        <div class="flex">
          <button @click="confirmPengembalian" type="button"
            class="text-white bg-yellow-800 hover:bg-yellow-900 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-xs px-3 py-1.5 me-2 text-center inline-flex items-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-yellow-800">
            Kembalikan
          </button>
          <button @click="dismissAlertPengembalian" type="button"
            class="text-yellow-800 bg-transparent border border-yellow-800 hover:bg-yellow-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center dark:hover:bg-green-600 dark:border-green-600 dark:text-green-500 dark:hover:text-white dark:focus:ring-yellow-800"
            aria-label="Close">
            Batal
          </button>
        </div>
      </div>

      <div class="flex justify-end mt-4 space-x-4">
        <button @click="downloadCSV" class="btn btn-success">Download CSV</button>
        <button @click="downloadPDF" class="btn btn-primary">Download PDF</button>
      </div>
      <div v-if="barang.length > 0" class="mt-4 relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-center text-sm bg-white text-gray-500 dark:text-gray-400">
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
            <tr v-for="(item, index) in barang" :key="index">
              <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {{ item.nama }}
              </td>
              <td class="px-6 py-4">{{ item.peminjam }}</td>
              <td class="px-6 py-4">{{ item.tanggal }} - {{ item.waktu }}</td>
              <td class="px-6 py-4">
                {{ item.dikembalikan ? item.tanggalPengembalian + ' - ' + item.waktuPengembalian : '-' }}
              </td>
              <td class="px-6 py-4">
                <span :class="{ 'text-green-600': item.dikembalikan, 'text-red-600': !item.dikembalikan }">
                  {{ item.dikembalikan ? 'Dikembalikan' : 'Belum Dikembalikan' }}
                </span>
              </td>
              <td class="px-6 py-4">
                <button @click="showAlertPengembalianConfirmation(index)" :disabled="barang.dikembalikan"
                  class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-xs px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Kembalikan
                </button>
                <!-- <button @click="showAlertHapusConfirmation(index)"
                  class="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-xs px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                  Hapus
                </button> -->
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else class="text-center bg-white text-gray-500 rounded-lg p-6 m-4">
        Belum ada peminjaman
      </div>
    </div>
  </div>
</template>

<script>
import { supabase } from "../lib/supabase";
import { exportToCSV, exportToPDF } from '../utils/export';

export default {
  data() {
    return {
      barang: [],
      // showAlertHapus: false,
      showAlertPengembalian: false,
      itemToDelete: null,
      itemToReturn: null,
    };
  },
  methods: {
    async fetchBarang() {
      let { data, error } = await supabase
        .from('barang')
        .select('*');

      if (error) {
        console.error('Error fetching data:', error);
      } else {
        console.log('Fetched data:', data); // Debugging
        this.barang = data;
      }
    },
    // showAlertHapusConfirmation(index) {
    //   this.itemToDelete = index;
    //   this.showAlertHapus = true;
    // },
    showAlertPengembalianConfirmation(index) {
      this.itemToReturn = index;
      this.showAlertPengembalian = true;
    },
    // async confirmHapus() {
    //   if (this.itemToDelete !== null) {
    //     const barangId = this.barang[this.itemToDelete].id;
    //     const { error } = await supabase
    //       .from('barang')
    //       .delete()
    //       .eq('id', barangId);

    //     if (!error) {
    //       this.barang.splice(this.itemToDelete, 1);
    //       this.showAlertHapus = false;
    //       this.itemToDelete = null;
    //     } else {
    //       console.error('Error deleting data:', error);
    //     }
    //   }
    // },
    async confirmPengembalian() {
      if (this.itemToReturn !== null) {
        const now = new Date();
        const tanggalPengembalian = now.toISOString().split('T')[0];
        const waktuPengembalian = now.toTimeString().split(' ')[0];
        const barangId = this.barang[this.itemToReturn].id;

        const { error } = await supabase
          .from('barang')
          .update({ dikembalikan: true, tanggalPengembalian, waktuPengembalian })
          .eq('id', barangId);

        if (!error) {
          this.barang[this.itemToReturn].dikembalikan = true;
          this.barang[this.itemToReturn].tanggalPengembalian = tanggalPengembalian;
          this.barang[this.itemToReturn].waktuPengembalian = waktuPengembalian;
          this.showAlertPengembalian = false;
          this.itemToReturn = null;
        } else {
          console.error('Error updating data:', error);
        }
      }
    },
    // dismissAlertHapus() {
    //   this.showAlertHapus = false;
    //   this.itemToDelete = null;
    // },
    dismissAlertPengembalian() {
      this.showAlertPengembalian = false;
      this.itemToReturn = null;
    },
    downloadCSV() {
      exportToCSV(this.barang);
    },
    downloadPDF() {
      exportToPDF(this.barang);
    }
  },
  async mounted() {
    await this.fetchBarang();
  }
}
</script>

<style scoped>
/* Styling adjustments for table elements */
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

/* Button styles */
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
