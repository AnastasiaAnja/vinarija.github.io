document.addEventListener("DOMContentLoaded", function () {
  const forma = document.getElementById("kontaktForma");
  if (forma) {
    const statusBox = document.getElementById("statusPoruka");

    forma.addEventListener("submit", function (e) {
      e.preventDefault();

      let greske = 0;

      document
        .querySelectorAll(".error-msg-ict")
        .forEach((span) => (span.textContent = ""));

      let ime = document.getElementById("ime").value.trim();
      let email = document.getElementById("email").value.trim();

      let reIme = /^[A-Z][a-z]{2,14}(\s[A-Z][a-z]{2,14})*$/;
      let reEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

      if (!reIme.test(ime)) {
        document.getElementById("greskaIme").textContent = "Ime nije ispravno.";
        greske++;
      }

      if (!reEmail.test(email)) {
        document.getElementById("greskaEmail").textContent =
          "Email nije ispravan.";
        greske++;
      }

      let datumUnos = document.getElementById("datum").value;
      let greskaDatum = document.getElementById("greskaDatum");

      if (!datumUnos) {
        greskaDatum.textContent = "Morate izabrati datum posete.";
        greske++;
      } else {
        let danas = new Date();
        danas.setHours(0, 0, 0, 0);

        let izabraniDatum = new Date(datumUnos);
        if (izabraniDatum < danas) {
          greskaDatum.textContent = "Datum ne može biti u prošlosti.";
          greske++;
        }
      }

      statusBox.style.display = "block";
      if (greske === 0) {
        statusBox.style.backgroundColor = "#dff0d8";
        statusBox.textContent = "Uspešno ste popunili formu!";
        forma.reset();
      } else {
        statusBox.style.backgroundColor = "#f2dede";
        statusBox.textContent = "Forma sadrži greške (" + greske + ").";
      }
    });

    document.querySelectorAll(".expander-header").forEach((header) => {
      header.addEventListener("click", function () {
        const item = this.parentElement;
        document.querySelectorAll(".expander-item").forEach((el) => {
          if (el !== item) el.classList.remove("active");
        });
        item.classList.toggle("active");
      });
    });
  }
  const buttons = document.querySelectorAll(".btn-filter");
  const wines = document.querySelectorAll(".wine-item");

  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      buttons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");

      const filterValue = this.dataset.filter;

      wines.forEach((wine) => {
        wine.style.display =
          filterValue === "sve" || wine.dataset.type === filterValue
            ? "block"
            : "none";
      });
    });
  });

  const mojiHobiji = [
    "Šetnja sa moja 4 psa 🐾",
    "Čitanje književnih klasika 📚",
    "Ples i scenski pokret 💃",
    "Druženje sa dragim ljudima 🍷",
    "Dizajniranje web stranica 💻",
  ];

  const listaKontejner = document.getElementById("dinamicka-lista-hobija");

  if (listaKontejner) {
    mojiHobiji.forEach((hobiTekst) => {
      const noviLi = document.createElement("li");

      noviLi.textContent = hobiTekst;

      noviLi.classList.add("hobi-item");

      listaKontejner.appendChild(noviLi);
    });
  }
  const btnNewsletter = document.getElementById("btnNewsletter");
  if (btnNewsletter) {
    const emailInput = document.getElementById("newsletterEmail");
    const statusPoruka = document.getElementById("newsletterStatus");

    btnNewsletter.addEventListener("click", function () {
      let emailVrednost = emailInput.value.trim();

      let reEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

      if (reEmail.test(emailVrednost)) {
        statusPoruka.textContent = "Uspešno ste se prijavili na newsletter!";
        statusPoruka.style.color = "#3c763d";

        emailInput.value = "";
        emailInput.style.borderColor = "#ddd";
      } else {
        statusPoruka.textContent = "Molimo unesite ispravnu email adresu.";
        statusPoruka.style.color = "#a84442";
        emailInput.style.borderColor = "#a84442";
      }

      setTimeout(() => {
        statusPoruka.textContent = "";
      }, 4000);
    });
  }
});
function selectPackage(value) {
  const select = document.getElementById("degustationSelect");
  select.value = value;
  select.style.border = "2px solid #a87f97";

  document
    .getElementById("kontaktForma")
    .scrollIntoView({ behavior: "smooth" });
  setTimeout(() => document.getElementById("ime").focus(), 800);
}
