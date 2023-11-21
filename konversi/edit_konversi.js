// Function to populate the dropdown with names of students
    function populateMahasiswa() {
        // Mengambil data nama mahasiswa dari server menggunakan endpoint findAll
        fetch('http://localhost:8085/persetujuanMbkm/findAll') // Ganti URL dengan endpoint findAll
            .then(response => response.json())
            .then(data => {
                var inputKonversiSelect = document.getElementById('inputKonversi');

                // Loop melalui data dan tambahkan opsi ke dropdown
                data.forEach(function(student) {
                    var option = document.createElement('option');
                    option.value = student.persetujuanMbkmId; // Anda mungkin perlu mengganti ini sesuai dengan data yang diterima dari server
                    option.text = student.inputKonversi;
                    inputKonversiSelect.appendChild(option);
                });
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
