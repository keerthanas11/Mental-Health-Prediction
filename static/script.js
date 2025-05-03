let currentStep = 0;
let formGroups, progressBar;

function showStep(step) {
    for (let i = 0; i < formGroups.length; i++) {
        formGroups[i].classList.remove('active');
    }
    formGroups[step].classList.add('active');

    const input = formGroups[step].querySelector('input');
    if (input) input.focus();

    document.getElementById("prevBtn").disabled = step === 0;
    document.getElementById("nextBtn").style.display = step === formGroups.length - 1 ? 'none' : 'inline-block';
    document.getElementById("submitBtn").style.display = step === formGroups.length - 1 ? 'inline-block' : 'none';

    updateProgress(step);
}

function updateProgress(currentIndex) {
    const progress = ((currentIndex + 1) / formGroups.length) * 100;
    progressBar.style.width = `${progress}%`;  // ✅ Fixed template literal
}

function nextStep() {
    const currentInput = formGroups[currentStep].querySelector('input');
    const value = parseFloat(currentInput.value);
    const min = parseFloat(currentInput.min);
    const max = parseFloat(currentInput.max);

    if (
        isNaN(value) ||
        !Number.isInteger(value) ||
        value < min ||
        value > max
    ) {
        alert(`Please enter an integer value between ${min} and ${max}.`); // ✅ Fixed template literal
        currentInput.focus();
        return;
    }

    if (currentStep < formGroups.length - 1) {
        currentStep++;
        showStep(currentStep);
    }
}

function prevStep() {
    if (currentStep > 0) {
        currentStep--;
        showStep(currentStep);
    }
}

window.onload = function () {
    formGroups = document.querySelectorAll('.form-group');
    progressBar = document.getElementById('progressBar');
    showStep(currentStep);
};
