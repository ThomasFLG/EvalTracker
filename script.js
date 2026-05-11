const form = document.getElementById("evaluationForm");
const liste = document.getElementById("liste");

let evaluations =
    JSON.parse(localStorage.getItem("evaluations")) || [];

function sauvegarder() {
    localStorage.setItem(
        "evaluations",
        JSON.stringify(evaluations)
    );
}

function afficherEvaluations() {

    liste.innerHTML = "";

    evaluations.forEach((evalObj, index) => {

        const maintenant = new Date();
        const dateEval = new Date(evalObj.date);

        const diff = dateEval - maintenant;

        let texteCompteRebours;

        if (diff <= 0) {
            texteCompteRebours = "Évaluation passée";
        } else {

            const jours =
                Math.floor(diff / (1000 * 60 * 60 * 24));

            const heures =
                Math.floor(
                    (diff / (1000 * 60 * 60)) % 24
                );

            texteCompteRebours =
                `${jours} jours et ${heures} heures`;
        }

        const div = document.createElement("div");

        div.className = "card";

        div.innerHTML = `
            <h2>${evalObj.nom}</h2>
            <p>Date : ${dateEval.toLocaleString()}</p>
            <p>Temps restant : ${texteCompteRebours}</p>
        `;

        liste.appendChild(div);
    });
}

form.addEventListener("submit", function(e) {

    e.preventDefault();

    const nom = document.getElementById("nom").value;
    const date = document.getElementById("date").value;

    evaluations.push({
        nom: nom,
        date: date
    });

    sauvegarder();

    afficherEvaluations();

    form.reset();
});

afficherEvaluations();

setInterval(afficherEvaluations, 3600000);
