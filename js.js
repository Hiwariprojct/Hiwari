        //  Ini adalah kodingan JavaScript
        document.addEventListener('DOMContentLoaded', function() {
            
            //  ini kodingan JavaScript buat memilih elemen-elemen dari halaman HTML, dan disimpen ke variabel biar bisa dimanipulasi nantinya
            const display = document.getElementById('display');
            const statusImage = document.getElementById('statusImage');
            const buttons = document.querySelectorAll('.btn-calc');

            //  ini kode JavaScript yang mendefinisikan 3 variabel konstan
            const imgNormal = 'https://placehold.co/400x100/374151/E5E7EB?text=Kalkulator';
            const imgSuccess = 'https://placehold.co/400x100/16A34A/FFFFFF?text=Sukses!';
            const imgError = 'https://placehold.co/400x100/DC2626/FFFFFF?text=Error!';

            /**
              ini sebuah fungsi (function) JS yang bernama changeImage
             */
            function changeImage(state) {
                if (state === 'success') {
                    statusImage.src = imgSuccess;
                    statusImage.alt = "Perhitungan Sukses";
                } else if (state === 'error') {
                    statusImage.src = imgError;
                    statusImage.alt = "Error Perhitungan";
                } else {
                    //  ini kode JS buat ngereset gambar di halaman web ke kondisi default/normal
                    statusImage.src = imgNormal;
                    statusImage.alt = "Status Kalkulator";
                }
            }

            /**
              ini JS yang namanya function, buat membersihkan layar, atau nge-reset kalkulator ke kondisi awalnya
             */
            function clearDisplay() {
                display.value = '';
                changeImage('normal'); // Memanggil function untuk merubah gambar
            }

            /**
              fungsi JS bernama deleteLastChar, untuk menghapus satu karakter akhir dari teks di elemen display. kalo di keyboard kayak backspace-nya
             */
            function deleteLastChar() {
                display.value = display.value.slice(0, -1);
            }

            /**
              untuk menambahkan teks ke akhir dari apa yang sudah ada di layar
             */
            function appendToDisplay(value) {
                display.value += value;
            }

            /**
              tujuan kode ini buat nanganin kesalahan, kalau user mencoba hitung (=) saat kalkulator masih kosong
             */
            function calculateResult() {
                //  koding ini buat meriksa apakah layar kalkulator masih kosong sebelum nyoba sesuatu
                if (display.value === '') {
                    changeImage('error');
                    display.value = 'Kosong!';
                    //  ini kode 2 perintah yang dipakai bersamaan dalam menangani kesalahan
                    setTimeout(clearDisplay, 1500);
                    return;
                }

                try {
                    //  ini baris kode JS yang menghitung hasil akhir dari ekspresi MTK yang di layar
                    let result = eval(display.value
                        .replace(/%/g, '/100') //  ini metode .replace() dalam JS, digunakan buat nyari dan ganti teks di dalam string
                    ); 
                    
                    //  kode JS buat validasi (ngecek) sebelum menampilkan perhitungan
                    if (isFinite(result)) {
                        display.value = result;
                        changeImage('success'); //  kode ini mengangani kalo hasil hitungan tidak valid
                    } else {
                        throw new Error("Hasil tidak valid");
                    }

                } catch (error) {
                    console.error("Error kalkulasi:", error);
                    display.value = 'Error';
                    changeImage('error'); //  ini blok untuk penangkap kesalahan 
                    setTimeout(clearDisplay, 1500);
                }
            }


            //  koding buat tombol supaya berfungsi
            buttons.forEach(button => {
                button.addEventListener('click', () => {
                    const value = button.getAttribute('data-value');

                    //  penyeleksi kondisi utk menjalankan kode yang berbeda-beda
                    switch(value) {
                        case 'C':
                            //  Bagian kode ini secara spesifik menangani "kasus" (case) jika tombol yang ditekan pengguna adalah tombol 'C' (Tombol Clear)
                            clearDisplay();
                            break;
                        case 'DEL':
                            //  Ini adalah bagian dari switch statement yang menangani "kasus" (case) jika tombol yang ditekan pengguna adalah tombol 'DEL' (Delete/Backspace)
                            deleteLastChar();
                            break;
                        case '=':
                            //  Ini adalah bagian dari switch statement yang menangani "kasus" (case) jika tombol yang ditekan pengguna adalah tombol '=' (tombol "sama dengan")
                            calculateResult();
                            break;
                        default:
                            //  Ini adalah blok default dari switch statement
                            if (statusImage.src === imgSuccess || statusImage.src === imgError) {
                                clearDisplay();
                            }
                            appendToDisplay(value);
                            break;
                    }
                });
            });

            // Ini adalah kode JavaScript yang sangat penting untuk menambahkan fungsionalitas keyboard pada kalkulator.
			// Tanpa kode ini, kalkulator Anda hanya bisa dioperasikan dengan mouse. Kode ini "mendengarkan" tombol yang Anda tekan di keyboard dan memetakannya ke fungsi-fungsi kalkulator yang sesuai
            document.addEventListener('keydown', (e) => {
                const key = e.key;

                if (key >= '0' && key <= '9' || key === '.' || key === '+' || key === '-' || key === '*' || key === '/' || key === '%') {
                    if (statusImage.src === imgSuccess || statusImage.src === imgError) {
                        clearDisplay();
                    }
                    appendToDisplay(key);
                    e.preventDefault();
                } else if (key === 'Enter' || key === '=') {
                    calculateResult();
                    e.preventDefault();
                } else if (key === 'Backspace') {
                    deleteLastChar();
                    e.preventDefault();
                } else if (key === 'Escape' || key.toLowerCase() === 'c') {
                    clearDisplay();
                    e.preventDefault();
                }
            });

        });