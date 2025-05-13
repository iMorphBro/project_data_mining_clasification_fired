const form = document.getElementById('predictForm');
const modal = document.getElementById('resultModal');
const resultText = document.getElementById('resultText');
const resultIcon = document.getElementById('resultIcon');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => data[key] = parseFloat(value));

    try {
        const response = await fetch('/predict', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        resultText.textContent = `Tingkat Keparahan: ${result.label}`;

        // pilih ikon sesuai label
        let iconPath = '';
        if (result.label === 'Rendah') iconPath = '/static/rendah.png';
        else if (result.label === 'Sedang') iconPath = '/static/sedang.png';
        else if (result.label === 'Tinggi') iconPath = '/static/tinggi.png';

        resultIcon.src = iconPath;

        modal.classList.remove('hidden');
    } catch (error) {
        alert('Gagal memproses prediksi.');
        console.error(error);
    }
});

function closeModal() {
    modal.classList.add('hidden');
}