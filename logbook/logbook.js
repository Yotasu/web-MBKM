

// Function to populate the dropdown with names of students
function populateNamaMahasiswa() {
    // Mengambil data nama mahasiswa dari server menggunakan endpoint findAll
    fetch('http://localhost:8085/regMbkm/findAll') // Ganti URL dengan endpoint findAll
    .then(response => response.json())
      .then(data => {
          var namaMahasiswaSelect = document.getElementById('namaMahasiswa');

          // Loop melalui data dan tambahkan opsi ke dropdown
          data.forEach(function(student) {
              var option = document.createElement('option');
              option.value = student.regMbkmId; // Anda mungkin perlu mengganti ini sesuai dengan data yang diterima dari server
              option.text = student.namaMahasiswa;
              namaMahasiswaSelect.appendChild(option);
          });
      })
         .catch(error => {
             console.error('Error:', error);
         });
}

// Fungsi untuk mengambil data dari URL dan menampilkan dalam tabel
function fetchDataAndDisplay() {
    var tableBody = document.getElementById('logbookTable').getElementsByTagName('tbody')[0];

    // Ganti URL sesuai dengan endpoint yang Anda inginkan
    var url = 'http://localhost:8085/Logbook/findAlls';

    fetch(url)
        .then(response => response.json())
        .then(data => {
            tableBody.innerHTML = ''; // Bersihkan isi tabel sebelum menambahkan data baru

            // Loop melalui data dan tambahkan ke tabel
            data.forEach(logbook => {
                var row = tableBody.insertRow();
                var cellWaktu = row.insertCell(0);
                var cellLogbook = row.insertCell(1);
                var cellNamaMahasiswa = row.insertCell(2);
                var cellAksi = row.insertCell(3);

                // Isi kolom dengan data
                cellWaktu.innerHTML = logbook.createdAt; // Gantilah dengan nama kolom yang benar
                cellLogbook.innerHTML = logbook.logbook; // Gantilah dengan nama kolom yang benar
                cellNamaMahasiswa.innerHTML = logbook.regMbkmId;
                cellAksi.innerHTML = `<button class='btn btn-primary btn-sm edit-button' data-id='${logbook.logbookId}'>Edit</button>
                                      <button class='btn btn-danger btn-sm delete-button' data-id='${logbook.logbookId}'>Delete</button>`;
            });
        })
        .catch(error => console.error('Error:', error));
}

// Menangani klik tombol "Delete" pada tabel
        document.getElementById('logbookTable').addEventListener('click', function(event) {
            if (event.target.classList.contains('delete-button')) {
                var id = event.target.getAttribute('data-id');

                // Konfirmasi pengguna sebelum menghapus
                if (confirm('Apakah Anda yakin ingin menghapus item ini?')) {
                    // Jika pengguna mengonfirmasi, lakukan penghapusan
                    deleteItem(id);
                }
            }
        });

// Fungsi untuk menghapus data berdasarkan ID
        function deleteItem(id) {
            var url = 'http://localhost:8085/logbook/delete/' + id; // Ganti URL sesuai dengan endpoint penghapusan

            fetch(url, {
                method: 'DELETE'
            })
            .then(() => {
                // Item berhasil dihapus, perbarui tampilan tabel
                fetchDataAndDisplay();
            })
            .catch(error => console.error('Error:', error));
        }

// Panggil fungsi untuk mengambil dan menampilkan data saat halaman dimuat
fetchDataAndDisplay();
