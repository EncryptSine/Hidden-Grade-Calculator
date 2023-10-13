function calculateHiddenGrade() {
    const currentAverage = Number(document.querySelector('#current-average').value);
    const gradeElements = document.querySelectorAll('.grade');
    const coefElements = document.querySelectorAll('.coef');

    const results = [];
    let sum = 0;

    gradeElements.forEach((gradeElement, index) => {
        const grade = Number(gradeElement.value);
        const coef = Number(coefElements[index].value);

        sum += grade * coef;

        results.push({ grade: grade, coef: coef, weightedGrade: grade * coef });
    });

    const numberOfGradeElements = Array.from(coefElements).reduce((acc, coefElement) => {
        return acc + Number(coefElement.value);
    }
        , 0);

    const hiddenGrade = (currentAverage * (numberOfGradeElements + 1) - sum).toFixed(2);
    const hiddenGrade25 = (currentAverage * (numberOfGradeElements + 0.25) - sum) / 0.25.toFixed(2);
    const hiddenGrade50 = (currentAverage * (numberOfGradeElements + 0.5) - sum) / 0.5.toFixed(2);
    const hiddenGrade2 = (currentAverage * (numberOfGradeElements + 2) - sum) / 2.0.toFixed(2);

    document.querySelector('#hidden-grade').textContent = hiddenGrade;
    document.querySelector('#hidden-grade-25').textContent = hiddenGrade25.toFixed(2);
    document.querySelector('#hidden-grade-50').textContent = hiddenGrade50.toFixed(2);
    document.querySelector('#hidden-grade-2').textContent = hiddenGrade2.toFixed(2);
}

const form = document.querySelector('form');
form.addEventListener('submit', (event) => {
    event.preventDefault();
    calculateHiddenGrade();
});

const addGradeButton = document.querySelector('#add-grade');
const gradeInputs = document.querySelector('#grade-inputs');
let gradeCount = 2;

addGradeButton.addEventListener('click', () => {
    gradeCount++;
    const newGradeInput = document.createElement('div');
    newGradeInput.innerHTML = `
            <label for="grade${gradeCount}">Note ${gradeCount} :</label>
            <input type="number" class="grade" name="grade${gradeCount}" required step="0.01">
            <label for="coef${gradeCount}">Coef :</label>
            <input type="number" class="coef" name="coef${gradeCount}" required step="0.01">
            <button type="button" class="remove-grade">Retirer</button>
        `;
    gradeInputs.appendChild(newGradeInput);

    const removeGradeButtons = document.querySelectorAll('.remove-grade');
    removeGradeButtons.forEach(button => {
        button.addEventListener('click', () => {
            button.parentElement.remove();
        });
    });
});
