const regionesChilenas = {
    "Región de Valparaíso": ["Valparaíso", "Viña del Mar", "San Antonio", "Quillota"],
    "Región Metropolitana": ["Santiago", "Providencia", "Maipú", "Puente Alto", "Las Condes"],
    "Región del Biobío": ["Concepción", "Talcahuano", "Los Ángeles", "Chillán"]
};

document.addEventListener('DOMContentLoaded', function() {
    const selectRegion = document.getElementById('region');
    const selectComuna = document.getElementById('comuna');

    if (!selectRegion || !selectComuna) return;

    for (let region in regionesChilenas) {
        let opt = document.createElement('option');
        opt.value = region;
        opt.innerText = region;
        selectRegion.appendChild(opt);
    }

    selectRegion.addEventListener('change', function() {
        selectComuna.innerHTML = '<option value="">Seleccione Comuna</option>';
        const listaComunas = regionesChilenas[this.value] || [];
        listaComunas.forEach(comuna => {
            let opt = document.createElement('option');
            opt.value = comuna;
            opt.innerText = comuna;
            selectComuna.appendChild(opt);
        });
    });
});