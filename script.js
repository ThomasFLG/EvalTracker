const filtresDiv =
    document.getElementById("filtres");

let tagsSelectionnes = [];
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

function tempsRestant(date) {

    const maintenant = new Date();
    const diff = new Date(date) - maintenant;

    if (diff <= 0) {
        return "Terminée";
    }

    const jours =
        Math.floor(diff / (1000 * 60 * 60 * 24));

    const heures =
        Math.floor(
            (diff / (1000 * 60 * 60)) % 24
        );

    return `${jours}j ${heures}h`;
}

function afficherEvaluations() {

    liste.innerHTML = "";

    evaluations.sort((a, b) =>
        new Date(a.date) - new Date(b.date)
    );

    evaluations.forEach((evalObj, index) => {

        const div = document.createElement("div");

        div.className = "card";

        div.style.background = evalObj.couleur;

        div.innerHTML = `
            <h2>${evalObj.nom}</h2>

            <p>
                ${new Date(evalObj.date)
                    .toLocaleString()}
            </p>

            <p>
                ⏳ ${tempsRestant(evalObj.date)}
            </p>

            <div class="actions">

                <button onclick="modifier(${index})">
                    Modifier
                </button>

                <button onclick="supprimer(${index})">
                    Supprimer
                </button>

            </div>
        `;

        liste.appendChild(div);
    });

    sauvegarder();
}

form.addEventListener("submit", function(e) {

    e.preventDefault();

    evaluations.push({
        nom:
            document.getElementById("nom").value,

        date:
            document.getElementById("date").value,

        couleur:
            document.getElementById("couleur").value
    });

    afficherEvaluations();

    form.reset();
});

function supprimer(index) {

    evaluations.splice(index, 1);

    afficherEvaluations();
}

function modifier(index) {

    const evalObj = evaluations[index];

    const nouveauNom =
        prompt(
            "Nom :",
            evalObj.nom
        );

    if (nouveauNom === null) return;

    const nouvelleDate =
        prompt(
            "Date (AAAA-MM-JJTHH:MM)",
            evalObj.date
        );

    if (nouvelleDate === null) return;

    evalObj.nom = nouveauNom;
    evalObj.date = nouvelleDate;

    afficherEvaluations();
}

afficherEvaluations();

setInterval(
    afficherEvaluations,
    3600000
);
