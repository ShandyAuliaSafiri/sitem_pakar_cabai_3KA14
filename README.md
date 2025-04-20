# Sistem Pakar Diagnosa Penyakit Tanaman Cabai

Sistem pakar sederhana untuk mendiagnosa penyakit pada tanaman cabai menggunakan metode _forward chaining_. Sistem ini dibuat dengan HTML, CSS, dan JavaScript tanpa menggunakan database.

## Cara Penggunaan

1. Buka file `index.html` di browser
2. Pada halaman utama, Anda dapat:
   - Klik langsung pada bagian tanaman cabai (daun, buah, atau akar) untuk melihat gejala spesifik pada bagian tersebut
   - Atau klik tombol "Pilih Gejala Manual" untuk melihat semua gejala
3. Centang gejala-gejala yang terlihat pada tanaman cabai
4. Gunakan tombol filter atau klik pada ilustrasi kecil tanaman untuk memfilter gejala berdasarkan bagian tanaman
5. Klik tombol "Diagnosa" untuk melihat hasil
6. Lihat hasil diagnosa beserta solusi pengendaliannya dan visualisasi tanaman yang terinfeksi
7. Untuk melakukan diagnosa ulang, klik tombol "Diagnosa Ulang"

## Metode Forward Chaining

Metode _forward chaining_ (penalaran maju) yang diimplementasikan dalam sistem ini bekerja dengan cara:

1. Pengguna memilih gejala-gejala yang terlihat pada tanaman cabai
2. Sistem akan mencocokkan gejala yang dipilih dengan aturan (rule) yang ada dalam basis pengetahuan
3. Jika semua kondisi dalam suatu aturan terpenuhi, maka sistem akan memberikan kesimpulan penyakit dari aturan tersebut
4. Jika tidak ada aturan yang terpenuhi sempurna, sistem akan memberikan diagnosa dengan tingkat kepercayaan tertentu berdasarkan kemiripan gejala yang dipilih

## Basis Pengetahuan

Sistem ini menggunakan basis pengetahuan dari tabel-tabel berikut:

1. Tabel Penyakit (P)

   - P1: Layu Fusarium (Fusarium Oxysporum. Sp)
   - P2: Penyakit Busuk Buah Antraknosa (Collectrotichum gloecospoiroides)
   - P3: Penyakit Busuk Akar (Phytophthora capsici)

2. Tabel Gejala (G)

   - G1: Daun mengalami kelayuan
   - G2: Daun menguning dan menjalar ke ranting
   - G3: Warna jaringan akar dan batang menjadi coklat
   - G4: Muncul bercak pada buah yang agak mengkilap
   - G5: Seluruh buah keriput dan menguning
   - G6: Warna ulit buah seperti jerami padi
   - G7: Tanaman tiba-tiba layu tanpa sebab jelas
   - G8: Akar terlihat busuk dan berwarna kehitaman
   - G9: Daun tetap hijau tapi menggulung dan cepat rontok

3. Tabel Aturan (Rules)
   - Rule 1: Jika G1, G2, G3 maka P1
   - Rule 2: Jika G4, G5, G6 maka P2
   - Rule 3: Jika G7, G8, G9 maka P3

## Fitur

- Antarmuka pengguna interaktif dengan ilustrasi tanaman cabai
- Kemampuan memilih bagian tanaman yang terinfeksi secara visual
- Filter gejala berdasarkan bagian tanaman (daun, buah, akar)
- Visualisasi tanaman yang terinfeksi pada hasil diagnosis
- Implementasi metode forward chaining
- Perhitungan tingkat kepercayaan untuk diagnosa tidak sempurna
- Tampilan hasil diagnosa dengan solusi pengendalian penyakit
- Tidak memerlukan database (semua data disimpan dalam file JavaScript)
- Desain responsif untuk berbagai ukuran layar

## Struktur Proyek

- `index.html` - File HTML utama
- `style.css` - File CSS untuk styling
- `script.js` - File JavaScript untuk logika sistem pakar
