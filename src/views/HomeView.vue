<template>
  <div class="min-h-screen bg-gray-100 p-6">
    <div class="container mx-auto">
      <h1 class="text-3xl font-bold text-center mb-6 uppercase">Peminjaman Barang</h1>
      <BarangForm @tambah-barang="tambahBarang" />
      <BarangList :barang="barang" @kembalikan-barang="kembalikanBarang" />
    </div>
  </div>
</template>

<script>
import BarangForm from './BarangForm.vue';
import BarangList from './BarangList.vue';
import { loadFromLocalStorage, saveToLocalStorage } from '../utils/localStorage';

export default {
  components: {
    BarangForm,
    BarangList
  },
  data() {
    return {
      barang: []
    };
  },
  methods: {
    tambahBarang(barang) {
      this.barang.push(barang);
      saveToLocalStorage(this.barang);
    },
    kembalikanBarang({ index, tanggalPengembalian, waktuPengembalian }) {
      const barang = this.barang[index];
      barang.dikembalikan = true;
      barang.tanggalPengembalian = tanggalPengembalian;
      barang.waktuPengembalian = waktuPengembalian;

      saveToLocalStorage(this.barang);
    },
    downloadCSV() {
      exportToCSV(this.barang);
    },
    downloadPDF() {
      exportToPDF(this.barang);
    }
  },
  mounted() {
    const data = loadFromLocalStorage();
    if (data) {
      this.barang = data;
    }
  }
}
</script>

<style scoped>
/* Tambahkan gaya tambahan di sini jika diperlukan */
</style>
