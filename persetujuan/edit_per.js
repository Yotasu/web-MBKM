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