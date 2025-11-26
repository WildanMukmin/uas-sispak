// Knowledge Base
const penyakit = [
  {
    kode: "P01",
    nama: "GERD",
    gejala: ["Ga", "Gb", "Gc"],
    total: 3,
    solusi:
      "Minum susu, konsumsi jahe, makan dalam porsi kecil secara perlahan, jangan tidur setelah makan, angkat kepala saat tidur, berhentilah merokok.",
  },
  {
    kode: "P02",
    nama: "Gastric Cancer",
    gejala: ["Gd", "Ga", "Ge", "Gb", "Gf"],
    total: 5,
    solusi:
      "Berhenti merokok, lakukan kemoterapi, lakukan radioterapi, berolahraga secara teratur, hindari makanan yang memicu kanker, konsumsi makanan yang kaya serat",
  },
  {
    kode: "P03",
    nama: "Advanced Cancer",
    gejala: ["Gg", "Gh", "Gi", "Gj", "Go"],
    total: 5,
    solusi:
      "Lakukan kemoterapi, lakukan radioterapi, konsumsi makanan tinggi serat, berolahraga secara teratur, minimal 30 menit per hari, hindari makanan yang memicu kanker, hentikan merokok dan minum alkohol, dan untuk lebih pasti, disarankan untuk melakukan pemeriksaan langsung oleh dokter.",
  },
  {
    kode: "P04",
    nama: "Acute Ulcer",
    gejala: ["Gb", "Gn", "Gj", "Gk", "Gd", "Ga"],
    total: 6,
    solusi:
      "Gunakan obat-obatan untuk mengurangi dan menghambat produksi asam lambung, misalnya obat famotidine (Pepcid) dan cimetidine (Tagamet), batasi atau hindari konsumsi kafein, hindari makanan pedas, goreng, dan asam, kurangi stres, makan dalam porsi kecil tetapi sering, hindari obat-obatan yang dapat mengiritasi lapisan lambung, seperti NSAIDs atau aspirin.",
  },
  {
    kode: "P05",
    nama: "Chronic Ulcer",
    gejala: ["Gl", "Gm", "Gb", "Gd", "Ga", "Gk", "Gj"],
    total: 7,
    solusi:
      "Tidur secara teratur, hindari makanan pedas, berlemak, dan asam, makan secara teratur, tidur secara teratur, jangan terlalu banyak berpikir, hindari kopi, teh, dan alkohol, lakukan detoksifikasi secara teratur 1 hari setiap minggu, lakukan terapi relaksasi untuk menghindari stres, konsumsi obat-obatan yang mengandung antagonis H2 seperti ranitidine, famotidine, dan cimetidine.",
  },
];

const gejalaLabels = {
  Ga: "Nyeri pada Ulu Hati",
  Gb: "Mual/Muntah",
  Gc: "Panas di Dada",
  Gd: "Perut Kembung Sering Sendawa",
  Ge: "Cepat Kenyang Saat Makan",
  Gf: "Asam Lambung Naik",
  Gg: "Anemia/Kurang Darah",
  Gh: "Muntah Darah",
  Gi: "Sakit Kuning",
  Gj: "Penurunan Berat Badan",
  Gk: "Warna Kotoran Berubah Hitam",
  Gl: "Perasaan Penuh pada Perut Bagian Atas",
  Gm: "Berkurangnya Nafsu Makan",
  Gn: "Kesulitan Bernafas",
  Go: "Nyeri Perut Bagian Atas",
};

document
  .getElementById("diagnosisForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const checkedGejala = Array.from(
      document.querySelectorAll('input[name="gejala[]"]:checked')
    ).map((cb) => cb.value);

    if (checkedGejala.length === 0) {
      alert("Silakan pilih minimal satu gejala!");
      return;
    }

    const hasil = diagnosa(checkedGejala);
    tampilkanHasil(hasil, checkedGejala);
  });

function diagnosa(gejalaInput) {
  let hasilDiagnosa = [];

  penyakit.forEach((p) => {
    const cocok = p.gejala.filter((g) => gejalaInput.includes(g)).length;
    const persentase = (cocok / p.total) * 100;

    if (cocok > 0) {
      hasilDiagnosa.push({
        kode: p.kode,
        nama: p.nama,
        cocok: cocok,
        total: p.total,
        persentase: persentase.toFixed(2),
        solusi: p.solusi,
        gejalaMatched: p.gejala.filter((g) => gejalaInput.includes(g)),
      });
    }
  });

  hasilDiagnosa.sort((a, b) => b.persentase - a.persentase);
  return hasilDiagnosa;
}

function tampilkanHasil(hasil, gejalaInput) {
  const resultSection = document.getElementById("resultSection");
  const resultContent = document.getElementById("resultContent");

  if (hasil.length === 0) {
    resultContent.innerHTML = `
                    <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                        <p class="text-yellow-700">Tidak ditemukan penyakit yang cocok dengan gejala yang dipilih.</p>
                    </div>
                `;
  } else {
    let html = `
                    <div class="mb-4 bg-blue-50 border-l-4 border-blue-400 p-4">
                        <h3 class="font-semibold text-blue-900 mb-2">Gejala yang Dipilih:</h3>
                        <ul class="list-disc list-inside text-blue-800">
                            ${gejalaInput
                              .map((g) => `<li>${gejalaLabels[g]}</li>`)
                              .join("")}
                        </ul>
                    </div>
                `;

    hasil.forEach((h, index) => {
      const bgColor =
        index === 0
          ? "bg-green-50 border-green-400"
          : "bg-gray-50 border-gray-300";
      html += `
                        <div class="mb-4 border-l-4 ${bgColor} p-4 rounded">
                            ${
                              index === 0
                                ? '<div class="text-green-700 font-bold mb-2">🎯 Diagnosis Paling Cocok</div>'
                                : ""
                            }
                            <h3 class="text-lg font-bold text-gray-800 mb-2">${
                              h.nama
                            } (${h.kode})</h3>
                            <div class="mb-2">
                                <div class="flex justify-between mb-1">
                                    <span class="text-sm font-medium text-gray-700">Tingkat Kesesuaian</span>
                                    <span class="text-sm font-medium text-gray-700">${
                                      h.persentase
                                    }%</span>
                                </div>
                                <div class="w-full bg-gray-200 rounded-full h-2.5">
                                    <div class="bg-indigo-600 h-2.5 rounded-full" style="width: ${
                                      h.persentase
                                    }%"></div>
                                </div>
                                <p class="text-sm text-gray-600 mt-1">${
                                  h.cocok
                                } dari ${h.total} gejala cocok</p>
                            </div>
                            <div class="mt-3">
                                <h4 class="font-semibold text-gray-700 mb-1">Gejala yang Cocok:</h4>
                                <ul class="list-disc list-inside text-gray-600 text-sm">
                                    ${h.gejalaMatched
                                      .map((g) => `<li>${gejalaLabels[g]}</li>`)
                                      .join("")}
                                </ul>
                            </div>
                            <div class="mt-3 p-3 bg-white rounded">
                                <h4 class="font-semibold text-gray-700 mb-1">Solusi & Saran:</h4>
                                <p class="text-gray-600 text-sm">${h.solusi}</p>
                            </div>
                        </div>
                    `;
    });

    html += `
                    <div class="mt-4 bg-red-50 border-l-4 border-red-400 p-4">
                        <p class="text-red-700 text-sm"><strong>Catatan:</strong> Hasil diagnosis ini bersifat sementara. Untuk diagnosis yang lebih akurat, silakan konsultasikan dengan dokter.</p>
                    </div>
                `;

    resultContent.innerHTML = html;
  }

  resultSection.classList.remove("hidden");
  resultSection.scrollIntoView({ behavior: "smooth" });
}

function resetForm() {
  document.getElementById("diagnosisForm").reset();
  document.getElementById("resultSection").classList.add("hidden");
}
