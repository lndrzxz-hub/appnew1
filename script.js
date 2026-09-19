document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('eligibilityForm');
    const nameInput = document.getElementById('name');
    const ageInput = document.getElementById('age');
    const heightInput = document.getElementById('height');

    const nameError = document.getElementById('nameError');
    const ageError = document.getElementById('ageError');
    const heightError = document.getElementById('heightError');

    const popupOverlay = document.getElementById('popupOverlay');
    const popupContainer = document.getElementById('popupContainer');
    const modalIcon = document.getElementById('modalIcon');
    const modalStatusTitle = document.getElementById('modalStatusTitle');
    const modalMessage = document.getElementById('modalMessage');
    const modalSummary = document.getElementById('modalSummary');
    const closePopupBtn = document.getElementById('closePopupBtn');

    // Remove alertas ao interagir nos campos
    [nameInput, ageInput, heightInput].forEach(input => {
        input.addEventListener('input', () => {
            input.classList.remove('invalid');
            nameError.classList.add('hidden');
            ageError.classList.add('hidden');
            heightError.classList.add('hidden');
        });
    });

    // Evento do formulário
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = nameInput.value.trim();
        const age = parseFloat(ageInput.value);
        const height = parseFloat(heightInput.value);

        let isValid = true;

        if (!name) {
            nameInput.classList.add('invalid');
            nameError.classList.remove('hidden');
            isValid = false;
        }

        if (isNaN(age) || age <= 0) {
            ageInput.classList.add('invalid');
            ageError.classList.remove('hidden');
            isValid = false;
        }

        if (isNaN(height) || height <= 0) {
            heightInput.classList.add('invalid');
            heightError.classList.remove('hidden');
            isValid = false;
        }

        if (!isValid) return;

        // Critério: Altura >= 1.70 e Idade >= 18 - outra alteração
        const isEligible = (height >= 1.70) && (age >= 18);

        openPopup(name, age, height, isEligible);
    });

    function openPopup(name, age, height, isEligible) {
        const formattedHeight = height.toFixed(2).replace('.', ',');
        modalSummary.textContent = `CANDIDATO: ${name} | IDADE: ${age} anos | ALTURA: ${formattedHeight}m`;

        if (isEligible) {
            popupContainer.className = "popup-container glass-modal success";
            modalIcon.innerHTML = "&#10003;";
            modalStatusTitle.className = "neon-text-green";
            modalStatusTitle.textContent = "CANDIDATO APTO";
            modalMessage.textContent = "Parabéns! Você pode prosseguir no processo para a vaga!";
        } else {
            popupContainer.className = "popup-container glass-modal error";
            modalIcon.innerHTML = "&#10007;";
            modalStatusTitle.className = "neon-text-magenta";
            modalStatusTitle.textContent = "REQUISITOS NÃO ATINGIDOS";
            modalMessage.textContent = "Infelizmente você não é apto à vaga";
        }

        popupOverlay.classList.remove('hidden');
    }

    // Fechar popup via botão OK
    closePopupBtn.addEventListener('click', () => {
        popupOverlay.classList.add('hidden');
    });

    // Fechar ao clicar fora do modal
    popupOverlay.addEventListener('click', (e) => {
        if (e.target === popupOverlay) {
            popupOverlay.classList.add('hidden');
        }
    });
});