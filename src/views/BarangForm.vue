<template>
  <div class="max-w-screen mx-auto p-4 border rounded-lg bg-white shadow-md">
    <form @submit.prevent="submitForm">
      <div class="mb-5">
        <label for="nama" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama Barang</label>
        <input v-model="nama" id="nama" type="text" placeholder="Nama Barang" required
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
      </div>

      <div class="mb-5">
        <label for="peminjam" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Peminjam</label>
        <input v-model="peminjam" id="peminjam" type="text" placeholder="Peminjam" required
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
      </div>

      <div class="mb-5">
        <label for="tanggal" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tanggal
          Peminjaman</label>
        <input v-model="tanggal" id="tanggal" type="date" required
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
      </div>

      <div class="mb-5">
        <label for="waktu" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Waktu Peminjaman</label>
        <input v-model="waktu" id="waktu" type="time" required
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
      </div>

      <button type="submit"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        Pinjam Barang
      </button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nama: '',
      peminjam: '',
      tanggal: '',
      waktu: ''
    };
  },
  methods: {
    submitForm() {
      // Emit event to parent component with form data
      this.$emit('tambah-barang', {
        nama: this.nama,
        peminjam: this.peminjam,
        tanggal: this.tanggal,
        waktu: this.waktu
      });

      // Clear the form
      this.nama = '';
      this.peminjam = '';
      this.tanggal = '';
      this.waktu = '';
    }
  }
}
</script>

<style scoped>
/* Styling adjustments for form elements */
input[type="text"],
input[type="date"],
input[type="time"] {
  border: 1px solid #ddd;
  padding: 8px;
  border-radius: 4px;
}

button {
  background-color: #1d4ed8;
  /* Blue-700 */
  border: none;
  color: white;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #2563eb;
  /* Blue-800 */
}
</style>
