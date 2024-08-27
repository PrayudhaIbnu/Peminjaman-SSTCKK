<template>
  <div class="min-h-screen bg-gray-100 p-6">
    <div class="container mx-auto">
      <h1 class="text-3xl font-bold text-center mb-6">Aplikasi Peminjaman Barang</h1>
      <BarangForm @tambah-barang="tambahBarang" />
      <BarangList :barang="barang" @kembalikan-barang="kembalikanBarang" />
    </div>
  </div>
</template>

<script>
import { db } from '@/firebase.js';
import BarangForm from './BarangForm.vue';
import BarangList from './BarangList.vue';

export default {
  components: {
    BarangForm,
    BarangList
  },
  data() {
    return {
      barang: [] // Menyimpan daftar barang di sini
    };
  },
  methods: {
    async tambahBarang(barang) {
      await db.collection('barang').add(barang);
      this.muatDariFirestore();
    },
    async kembalikanBarang({ index, tanggalPengembalian, waktuPengembalian }) {
      const doc = await db.collection('barang').where('id', '==', this.barang[index].id).get();
      doc.forEach(async (doc) => {
        await db.collection('barang').doc(doc.id).update({
          dikembalikan: true,
          tanggalPengembalian,
          waktuPengembalian
        });
      });
      this.muatDariFirestore();
    },
    async muatDariFirestore() {
      const snapshot = await db.collection('barang').get();
      this.barang = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
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
