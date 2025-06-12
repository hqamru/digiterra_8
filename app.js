const app = Vue.createApp({
data() {
  return {
    username: "",
    password: "",
    isLoggedIn: localStorage.getItem("isLoggedIn") === "true",
    page: "home",
    errorMessage: "",
    nama: localStorage.getItem("nama") || "",
    kelas: localStorage.getItem("kelas") || "",
    users: [
      { username: "budi", password: "12345", nama: "Budi Santoso", kelas: "10 IPS 1" },
      { username: "siti", password: "abcde", nama: "Siti Aminah", kelas: "10 IPS 2" }
    ],
	tahunSoal: null,
      soalTahun: [],
      currentIndex: 0,
      skor: 0,
      selesai: false,

      // Tambahan untuk menu Materi
      materiSection: null,       // kelas10, kelas11, kelas12, osn
      subMateri: null,           // hakikatGeografi, dst.
      subMateriContent: null     // HTML isi konten
    };
  },
  computed: {
    currentSoal() {
      return this.soalTahun[this.currentIndex];
    }
  },
  methods: {
login() {
  const user = this.users.find(u => u.username === this.username && u.password === this.password);
  if (user) {
    this.isLoggedIn = true;
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("username", this.username);
    localStorage.setItem("nama", user.nama);
    localStorage.setItem("kelas", user.kelas);
    this.nama = user.nama;
    this.kelas = user.kelas;
    this.errorMessage = "";
    this.page = "home";
  } else {
    this.errorMessage = "Nama pengguna atau sandi salah";
  }
},
    logout() {
      this.isLoggedIn = false;
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("username");
      this.resetSoal();
      this.page = "home";
      this.materiSection = null;
      this.subMateri = null;
      this.subMateriContent = null;
    },
    pilihSoalTahun(tahun) {
      this.tahunSoal = tahun;
      this.selesai = false;
      this.skor = 0;
      this.currentIndex = 0;
      if (tahun === 2019) {
        this.soalTahun = [
          {
            id: 1,
            pertanyaan: "Apa yang dimaksud dengan geosfer?",
            pilihan: ["Atmosfer", "Lapisan bumi", "Lingkungan hidup", "Keseluruhan lapisan bumi", "Tanah"],
            jawaban: "Keseluruhan lapisan bumi"
          },
          {
            id: 2,
            pertanyaan: "Manakah berikut ini yang termasuk ke dalam hidrosfer?",
            pilihan: ["Tanah", "Gunung", "Laut", "Awan", "Batuan"],
            jawaban: "Laut"
          }
        ];
      } else {
        this.soalTahun = [];
      }
    },
    jawab(pilihan) {
      if (pilihan === this.currentSoal.jawaban) {
        this.skor++;
      }
      this.currentIndex++;
      if (this.currentIndex >= this.soalTahun.length) {
        this.selesai = true;
      }
    },
    resetSoal() {
      this.currentIndex = 0;
      this.skor = 0;
      this.selesai = false;
    },

    // =============================
    // Tambahan untuk menu Materi:
    // =============================
toggleSubMateri(key) {
  if (this.subMateri === key) {
    this.subMateri = null;
    this.subSubMateri = null; // reset juga sub-sub menu
    this.subMateriContent = null;
  } else {
    this.subMateri = key;
    this.subSubMateri = null;
    this.subMateriContent = null;
  }
},

toggleSubSubMateri(key) {
  if (this.subSubMateri === key) {
    this.subSubMateri = null;
    this.subMateriContent = null;
  } else {
    this.subSubMateri = key;
    this.subMateriContent = null;
  }
},
    // =============================
    // Materi Definisi Geografi:
    // =============================

loadSubMateriContent(key) {
  if (key === 'definisiGeografi') {
    // Ganti isi manual dengan embed Google Docs
this.subMateriContent = `
  <div class="w-full border rounded overflow-hidden" style="height: 70vh;">
<iframe src="https://docs.google.com/document/d/e/2PACX-1vTkp9zMSWtqDvfDBVrDTscxgRgjPqTw3bdZzgNCRAi75l68lR6S94E3ZYmeT7dlQb3zZg8LGgccvXvm/pub?embedded=true" 
      class="w-full h-full border-0"	
      frameborder="0"
      allowfullscreen>
    </iframe>
  </div>
`;
    // =============================
    // Penutup Kode Materi
    // =============================

  } else {
    this.subMateriContent = `<p>Materi "<strong>${key}</strong>" masih dalam pengembangan.</p>`;
  }
}
  },
  mounted() {
    this.username = localStorage.getItem("username") || "";
  }
});

app.mount('#app');
