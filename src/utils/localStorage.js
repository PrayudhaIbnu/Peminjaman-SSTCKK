export function saveToLocalStorage(data) {
    try {
      localStorage.setItem('barangList', JSON.stringify(data));
    } catch (error) {
      console.error('Gagal menyimpan ke local storage:', error);
    }
  }
  
  export function loadFromLocalStorage() {
    try {
      const data = localStorage.getItem('barangList');
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Gagal memuat dari local storage:', error);
      return [];
    }
  }
  