// Data penyakit
const diseases = {
  P1: {
    id: "P1",
    name: "Layu Fusarium (Fusarium Oxysporum. Sp)",
    type: "Daun",
    solution:
      "Cabut dan musnahkan tanaman yang terinfeksi. Gunakan agen hayati seperti Trichoderma spp. dan Gliocladium spp. bersama pupuk dasar. Fungisida digunakan jika benar-benar diperlukan.",
    affectedParts: ["daun", "batang"],
  },
  P2: {
    id: "P2",
    name: "Penyakit Busuk Buah Antraknosa (Collectrotichum gloecospoiroides)",
    type: "Buah",
    solution:
      "Pencegahan dilakukan dengan membersihkan lahan dan membuang tanaman atau buah yang terinfeksi. Gunakan benih tahan penyakit karena patogen dapat menular lewat benih. Terapkan rotasi tanaman dan sanitasi rutin seperti memotong serta memusnahkan bagian yang sakit. Fungisida digunakan hanya jika diperlukan, sesuai dosis. Alat semprot harus disterilkan sebelum dipakai agar tidak menyebarkan penyakit.",
    affectedParts: ["buah"],
  },
  P3: {
    id: "P3",
    name: "Penyakit Busuk Akar (Phytophthora capsici)",
    type: "Akar",
    solution:
      "Meningkatkan drainase lahan untuk mencegah genangan air. Gunakan varietas tahan dan lakukan rotasi tanaman. Aplikasi fungisida berbahan aktif metalaksil atau fosetil-aluminium secara preventif pada musim hujan. Hindari penyiraman berlebih, dan cabut serta musnahkan tanaman yang telah terinfeksi.",
    affectedParts: ["akar", "daun"],
  },
};

// Data gejala
const symptoms = {
  G1: "Daun mengalami kelayuan.",
  G2: "Daun menguning dan menjalar ke ranting",
  G3: "Warna jaringan akar dan batang menjadi coklat.",
  G4: "Muncul bercak pada buah yang agak mengkilap",
  G5: "Seluruh buah keriput dan menguning",
  G6: "Warna ulit buah seperti jerami padi",
  G7: "Tanaman tiba-tiba layu tanpa sebab jelas.",
  G8: "Akar terlihat busuk dan berwarna kehitaman.",
  G9: "Daun tetap hijau tapi menggulung dan cepat rontok.",
};

// Kategori gejala
const symptomCategories = {
  G1: "daun",
  G2: "daun",
  G3: "daun",
  G4: "buah",
  G5: "buah",
  G6: "buah",
  G7: "akar",
  G8: "akar",
  G9: "akar",
};

// Aturan forward chaining
const rules = [
  {
    condition: ["G1", "G2", "G3"],
    result: "P1",
  },
  {
    condition: ["G4", "G5", "G6"],
    result: "P2",
  },
  {
    condition: ["G7", "G8", "G9"],
    result: "P3",
  },
];

// Elements dari halaman utama
const startDiagnosisBtn = document.getElementById("start-diagnosis");
const backToIntroBtn = document.getElementById("back-to-intro");
const backToDiagnosisBtn = document.getElementById("back-to-diagnosis");
const diagnoseBtn = document.getElementById("diagnose-button");
const restartBtn = document.getElementById("restart-button");
const introSection = document.getElementById("intro-section");
const diagnosisSection = document.getElementById("diagnosis-section");
const resultSection = document.getElementById("result-section");

// Elemen ilustrasi tanaman
const plantAreas = document.querySelectorAll(".plant-area");
const filterButtons = document.querySelectorAll(".filter-btn");
const smallPlantAreas = document.querySelectorAll(".plant-area-small");

// Event listeners untuk navigasi
startDiagnosisBtn.addEventListener("click", startDiagnosis);
backToIntroBtn.addEventListener("click", backToIntro);
backToDiagnosisBtn.addEventListener("click", backToDiagnosis);
diagnoseBtn.addEventListener("click", diagnoseDisease);
restartBtn.addEventListener("click", restartDiagnosis);

// Event listeners untuk ilustrasi tanaman
plantAreas.forEach((area) => {
  area.addEventListener("click", () => {
    const areaType = area.getAttribute("data-area");
    startDiagnosis();
    filterSymptoms(areaType);
  });
});

// Event listeners untuk tombol filter
filterButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const filter = e.target.getAttribute("data-filter");

    // Mengubah tombol aktif
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    e.target.classList.add("active");

    filterSymptoms(filter);
  });
});

// Event listeners untuk area tanaman kecil
smallPlantAreas.forEach((area) => {
  area.addEventListener("click", () => {
    const filter = area.getAttribute("data-filter");

    // Mengubah tombol aktif
    filterButtons.forEach((btn) => {
      if (btn.getAttribute("data-filter") === filter) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });

    filterSymptoms(filter);
  });
});

// Functions
function startDiagnosis() {
  introSection.classList.add("hidden");
  diagnosisSection.classList.remove("hidden");
  resultSection.classList.add("hidden");
}

function backToIntro() {
  introSection.classList.remove("hidden");
  diagnosisSection.classList.add("hidden");
  resultSection.classList.add("hidden");
}

function backToDiagnosis() {
  introSection.classList.add("hidden");
  diagnosisSection.classList.remove("hidden");
  resultSection.classList.add("hidden");
}

function filterSymptoms(filter) {
  const symptomItems = document.querySelectorAll(".symptom-item");

  symptomItems.forEach((item) => {
    const category = item.getAttribute("data-category");

    if (filter === "semua" || filter === category) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
}

function diagnoseDisease() {
  const selectedSymptoms = getSelectedSymptoms();

  if (selectedSymptoms.length === 0) {
    alert("Silakan pilih minimal satu gejala!");
    return;
  }

  const diagnosis = forwardChaining(selectedSymptoms);
  showResult(diagnosis, selectedSymptoms);
}

function getSelectedSymptoms() {
  const checkboxes = document.querySelectorAll(
    'input[name="symptoms"]:checked'
  );
  return Array.from(checkboxes).map((checkbox) => checkbox.value);
}

function forwardChaining(selectedSymptoms) {
  // Implementasi metode forward chaining
  for (const rule of rules) {
    // Cek apakah semua gejala dalam rule termasuk dalam gejala yang dipilih
    const isRuleSatisfied = rule.condition.every((symptom) =>
      selectedSymptoms.includes(symptom)
    );

    // Jika rule terpenuhi, kembalikan hasil penyakit
    if (isRuleSatisfied) {
      return diseases[rule.result];
    }
  }

  // Jika tidak ada rule yang terpenuhi sepenuhnya, cari yang paling banyak terpenuhi
  let bestMatchRule = null;
  let highestMatchCount = 0;

  for (const rule of rules) {
    const matchCount = rule.condition.filter((symptom) =>
      selectedSymptoms.includes(symptom)
    ).length;

    if (matchCount > highestMatchCount) {
      highestMatchCount = matchCount;
      bestMatchRule = rule;
    }
  }

  // Jika ada partial match, return penyakit dengan kemungkinan tertinggi
  if (bestMatchRule && highestMatchCount > 0) {
    const confidence =
      (highestMatchCount / bestMatchRule.condition.length) * 100;
    const disease = { ...diseases[bestMatchRule.result] };
    disease.confidence = confidence.toFixed(2);
    return disease;
  }

  // Jika tidak ada match sama sekali
  return null;
}

// Fungsi untuk menampilkan tingkat kepercayaan
function updateConfidenceDisplay(confidence) {
  const confidenceInfo = document.getElementById("confidence-info");
  const confidenceBar = document.getElementById("confidence-bar");
  const confidenceValue = document.getElementById("confidence-value");

  if (confidence) {
    // Tampilkan elemen tingkat kepercayaan
    confidenceInfo.style.display = "block";

    // Update progress bar
    confidenceBar.style.width = `${confidence}%`;
    confidenceValue.textContent = `${confidence}%`;

    // Tambahkan kelas untuk warna yang berbeda berdasarkan tingkat kepercayaan
    if (confidence < 40) {
      confidenceBar.style.background =
        "linear-gradient(to right, #ff9800, #f57c00)";
    } else if (confidence < 70) {
      confidenceBar.style.background =
        "linear-gradient(to right, #ffc107, #ffb300)";
    } else {
      confidenceBar.style.background =
        "linear-gradient(to right, #8bc34a, #4caf50)";
    }
  } else {
    // Sembunyikan elemen tingkat kepercayaan jika tidak ada data
    confidenceInfo.style.display = "none";
  }
}

function showResult(diagnosis, selectedSymptoms) {
  diagnosisSection.classList.add("hidden");
  resultSection.classList.remove("hidden");

  const diseaseName = document.getElementById("disease-name");
  const diseaseType = document.getElementById("disease-type");
  const symptomsList = document.getElementById("symptoms-list");
  const solutionText = document.getElementById("solution-text");
  const confidenceInfo = document.getElementById("confidence-info");

  // Clear previous results
  symptomsList.innerHTML = "";

  // Reset visual diagnosis
  resetVisualDiagnosis();

  if (diagnosis) {
    diseaseName.textContent = diagnosis.name;

    if (diagnosis.confidence) {
      diseaseType.textContent = `Jenis: ${diagnosis.type}`;

      // Update tampilan tingkat kepercayaan
      updateConfidenceDisplay(parseFloat(diagnosis.confidence));
    } else {
      diseaseType.textContent = `Jenis: ${diagnosis.type}`;
      // Sembunyikan elemen tingkat kepercayaan untuk diagnosa dengan kepercayaan 100%
      confidenceInfo.style.display = "none";
    }

    solutionText.textContent = diagnosis.solution;

    // Display selected symptoms
    selectedSymptoms.forEach((symptomCode) => {
      const li = document.createElement("li");
      li.textContent = `${symptomCode}: ${symptoms[symptomCode]}`;
      // Highlight gejala yang sesuai dengan penyakit terdiagnosa
      if (
        rules
          .find((rule) => rule.result === diagnosis.id)
          ?.condition.includes(symptomCode)
      ) {
        li.classList.add("matched-symptom");
      }
      symptomsList.appendChild(li);
    });

    // Visual diagnosis
    visualizeDiagnosis(diagnosis, selectedSymptoms);
  } else {
    diseaseName.textContent = "Tidak dapat mendiagnosa";
    diseaseType.textContent =
      "Kombinasi gejala tidak cocok dengan penyakit manapun dalam basis pengetahuan";
    solutionText.textContent =
      "Silakan konsultasikan dengan ahli tanaman atau pilih gejala yang berbeda.";
    confidenceInfo.style.display = "none";

    // Display selected symptoms
    selectedSymptoms.forEach((symptomCode) => {
      const li = document.createElement("li");
      li.textContent = `${symptomCode}: ${symptoms[symptomCode]}`;
      symptomsList.appendChild(li);
    });
  }
}

function visualizeDiagnosis(diagnosis, selectedSymptoms) {
  if (!diagnosis) return;

  // Selectors for different parts of the result plant
  const resultRootArea = document.getElementById("result-root-area");
  const resultLeafArea = document.getElementById("result-leaf-area");
  const resultFruitArea = document.getElementById("result-fruit-area");

  // Visual changes based on affected parts
  if (diagnosis.affectedParts.includes("akar")) {
    resultRootArea.classList.add("affected-part");
    resultRootArea.querySelector("path").setAttribute("stroke", "#8B4513");
  }

  if (diagnosis.affectedParts.includes("daun")) {
    resultLeafArea.classList.add("affected-part");
    resultLeafArea.querySelectorAll("path").forEach((path) => {
      path.setAttribute("fill", "#A5D6A7");
    });
  }

  if (diagnosis.affectedParts.includes("buah")) {
    resultFruitArea.classList.add("affected-part");
    resultFruitArea.querySelectorAll("path").forEach((path) => {
      path.setAttribute("fill", "#EF9A9A");
    });
  }
}

function resetVisualDiagnosis() {
  // Reset all visuals to default
  const resultRootArea = document.getElementById("result-root-area");
  const resultLeafArea = document.getElementById("result-leaf-area");
  const resultFruitArea = document.getElementById("result-fruit-area");

  resultRootArea.classList.remove("affected-part");
  resultLeafArea.classList.remove("affected-part");
  resultFruitArea.classList.remove("affected-part");

  resultRootArea.querySelector("path").setAttribute("stroke", "#795548");

  resultLeafArea.querySelectorAll("path").forEach((path) => {
    path.setAttribute("fill", "#4CAF50");
  });

  resultFruitArea.querySelectorAll("path").forEach((path) => {
    path.setAttribute("fill", "#F44336");
  });
}

function restartDiagnosis() {
  // Reset all checkboxes
  document.querySelectorAll('input[name="symptoms"]').forEach((checkbox) => {
    checkbox.checked = false;
  });

  // Go back to diagnosis section
  diagnosisSection.classList.remove("hidden");
  resultSection.classList.add("hidden");

  // Reset filter to "semua"
  filterButtons.forEach((btn) => {
    if (btn.getAttribute("data-filter") === "semua") {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });

  filterSymptoms("semua");
}
