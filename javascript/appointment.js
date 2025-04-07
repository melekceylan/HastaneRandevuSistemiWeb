document.addEventListener('DOMContentLoaded', function () {
    const tarihSecici = document.getElementById('tarihSecici');
    const bolumSelect = document.getElementById('bolum');
    const doktorSelect = document.getElementById('doktor');
    const saatlerDiv = document.getElementById('saatler');
    const saatButonlariDiv = document.getElementById('saatButonlari');
    const secilenSaatInput = document.getElementById('secilenSaat');
    const submitButton = document.getElementById('submitButton');

    const doktorlar = {
        "anestezi": [
            { id: 1, ad: "Dr. Ayşe Yılmaz", saatler: ["09:00", "11:00", "14:00", "16:00"] },
            { id: 2, ad: "Dr. Mehmet Demir", saatler: ["10:00", "13:00", "15:00", "17:00"] }
        ],
        "beyin_sinir": [
            { id: 5, ad: "Prof. Dr. Ali Can", saatler: ["09:00", "12:00", "15:00", "17:00"] },
            { id: 6, ad: "Uzm. Dr. Elif Kaya", saatler: ["10:00", "13:00", "16:00", "18:00"] }
        ],
        "cocuk": [
            { id: 9, ad: "Op. Dr. Fatma Türk", saatler: ["09:15", "11:15", "14:15", "16:15"] },
            { id: 10, ad: "Uzm. Dr. Deniz Aksoy", saatler: ["10:15", "13:15", "15:15", "17:15"] }
        ],
        "genel": [
            { id: 13, ad: "Prof. Dr. Serkan Öztürk", saatler: ["09:30", "11:30", "14:30", "16:30"] },
            { id: 14, ad: "Uzm. Dr. Zeynep Aksoy", saatler: ["10:30", "13:30", "15:30", "17:30"] }
        ],
            "gogus": [
            { id: 17, ad: "Op. Dr. Canan Demirci", saatler: ["09:45", "11:45", "14:45", "16:45"] },
            { id: 18, ad: "Uzm. Dr. Pelin Kaya", saatler: ["10:45", "13:45", "15:45", "17:45"] }
        ],
        "goz": [
            { id: 21, ad: "Op. Dr. Deniz Soyer", saatler: ["09:00", "11:00", "14:00", "16:00"] },
            { id: 22, ad: "Op. Dr. Berk Özkan", saatler: ["10:00", "13:00", "15:00", "17:00"] }
        ],
        "kadin_dogum": [
            { id: 25, ad: "Doç. Dr. Gülşen Arslan", saatler: ["09:15", "11:15", "14:15", "16:15"] },
            { id: 26, ad: "Uzm. Dr. Ayten Yücel", saatler: ["10:15", "13:15", "15:15", "17:15"] }
        ],
        "kalp_damar": [
            { id: 29, ad: "Prof. Dr. Murat Kaya", saatler: ["09:30", "11:30", "14:30", "16:30"] },
            { id: 30, ad: "Op. Dr. Selim Erdem", saatler: ["10:30", "13:30", "15:30", "17:30"] }
        ],
        "kulak_burun_bogaz": [
            { id: 33, ad: "Op. Dr. Özgür Demir", saatler: ["09:45", "11:45", "14:45", "16:45"] },
            { id: 34, ad: "Uzm. Dr. Pınar Can", saatler: ["10:45", "13:45", "15:45", "17:45"] }
        ],
        "obezite": [
            { id: 37, ad: "Doç. Dr. Hasan Çelik", saatler: ["09:00", "12:00", "15:00", "17:00"] },
            { id: 38, ad: "Uzm. Dr. Ayşe Kaya", saatler: ["10:00", "13:00", "16:00", "18:00"] }
        ],
        "organ_nakli": [
            { id: 41, ad: "Prof. Dr. Veli Akın", saatler: ["09:15", "11:15", "14:15", "16:15"] },
            { id: 42, ad: "Uzm. Dr. Elif Demirci", saatler: ["10:15", "13:15", "15:15", "17:15"] }
        ],
        "ortopedi": [
            { id: 45, ad: "Op. Dr. Tarık Yılmaz", saatler: ["09:30", "11:30", "14:30", "16:30"] },
            { id: 46, ad: "Uzm. Dr. Seda Demirci", saatler: ["10:30", "13:30", "15:30", "17:30"] }
        ]
    };
    bolumSelect.addEventListener('change', () => {
        const bolum = bolumSelect.value;
        doktorSelect.innerHTML = '<option value="">Seçiniz</option>';
        doktorSelect.disabled = !bolum;

        if (bolum && doktorlar[bolum]) {
            doktorlar[bolum].forEach(doktor => {
                const option = document.createElement('option');
                option.value = doktor.id;
                option.textContent = doktor.ad;
                doktorSelect.appendChild(option);
            });
        }
    });

    doktorSelect.addEventListener('change', () => {
        const doktorId = doktorSelect.value;
        saatlerDiv.style.display = doktorId ? 'block' : 'none';
        saatButonlariDiv.innerHTML = '';

        if (doktorId) {
            const selectedDoctor = Object.values(doktorlar).flat().find(d => d.id == doktorId);
            if (selectedDoctor) {
                selectedDoctor.saatler.forEach(saat => {
                    const button = document.createElement('button');
                    button.type = 'button';
                    button.textContent = saat;
                    button.addEventListener('click', () => {
                        secilenSaatInput.value = saat;
                        document.querySelectorAll('#saatButonlari button').forEach(b => b.classList.remove('selected'));
                        button.classList.add('selected');
                        submitButton.disabled = false;
                    });
                    saatButonlariDiv.appendChild(button);
                });
            }
        }
    });

    document.getElementById('randevuForm').addEventListener('submit', function (e) {
        e.preventDefault();
        const secilenTarih = tarihSecici.value;
        const secilenBolum = bolumSelect.options[bolumSelect.selectedIndex].text;
        const secilenDoktor = doktorSelect.options[doktorSelect.selectedIndex].text;
        const secilenSaat = secilenSaatInput.value;

        alert(`Randevunuz oluşturuldu!\nTarih: ${secilenTarih}\nBölüm: ${secilenBolum}\nDoktor: ${secilenDoktor}\nSaat: ${secilenSaat}`);
    });
});
