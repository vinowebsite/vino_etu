/**
 * @file Script contenant les fonctions de base
 * @author Jonathan Martel (jmartel@cmaisonneuve.qc.ca)
 * @version 0.1
 * @update 2019-01-21
 * @license Creative Commons BY-NC 3.0 (Licence Creative Commons Attribution - Pas d’utilisation commerciale 3.0 non transposé)
 * @license http://creativecommons.org/licenses/by-nc/3.0/deed.fr
 *
 */

//const BaseURL = "https://jmartel.webdev.cmaisonneuve.qc.ca/n61/vino/";
const BaseURL = "http://localhost:81/vino_etu/"/* document.baseURI */;
console.log(BaseURL);
window.addEventListener('load', function () {
  document.querySelectorAll(".btnBoire").forEach(function (element) {
    // console.log(element);
    element.addEventListener("click", function (evt) {
      let id = evt.target.parentElement.dataset.id;
      let requete = new Request(BaseURL + "index.php?requete=boireBouteilleCellier", { method: 'POST', body: '{"id": ' + id + '}' });

      fetch(requete)
        .then(response => {
          if (response.status === 200) {
            return response.json();
          } else {
            throw new Error('Erreur');
          }
        })
        .then(data => {
          // recharger la page: reference: https://stackoverflow.com/questions/3715047/how-to-reload-a-page-using-javascript
          location.reload();
          console.debug(data);
        }).catch(error => {
          console.error(error);
        });
    })

  });

  //modifier

  document.querySelectorAll(".btnModifier").forEach(function (element) {
    element.addEventListener("click", function (evt) {
      let id = evt.target.parentElement.dataset.id;
      console.log(id);
      //redirect to a the detail of product page
      window.location.href = BaseURL + "index.php?requete=pageModifier&id=" + id;

    })

  });

  if (document.querySelector(".btnModifierBouteille")) {

    document.querySelector(".btnModifierBouteille").addEventListener("click", function (evt) {
      evt.preventDefault();
      let id = document.querySelector("[name='id']").value;
      let nom = document.querySelector("[name='nom']").value;
      let pays = document.querySelector("[name='pays']").value;
      let type = document.querySelector("[name='type']").value;

      let requete = new Request("http://localhost/Vino/vino_etu/" + "index.php?requete=modifierBouteilleCellier", {
        method: 'POST',
        body: '{"id": ' + id + ', "nom": "' + nom + '", "pays": "' + pays + '", "type": "' + type + '"}'
      });

      fetch(requete)
        .then(response => {
          if (response.status === 200) {
            console.log(response);
            return response;
          } else {
            throw new Error('Erreur');
          }
        })
        .then(data => {
          // location.reload();
        }).catch(error => {
          console.error(error);
        });
    });
  }
  //fin modifier

  document.querySelectorAll(".btnAjouter").forEach(function (element) {
    element.addEventListener("click", function (evt) {
      let id = evt.target.parentElement.dataset.id;
      let requete = new Request(BaseURL + "index.php?requete=ajouterBouteilleCellier", { method: 'POST', body: '{"id": ' + id + '}' });

      fetch(requete)
        .then(response => {
          if (response.status === 200) {
            return response.json();
          } else {
            throw new Error('Erreur');
          }
        })
        .then(data => {
          // recharger la page: reference: https://stackoverflow.com/questions/3715047/how-to-reload-a-page-using-javascript
          location.reload();
          console.debug(data);
        }).catch(error => {
          console.error(error);
        });
    })
  });

  let inputNomBouteille = document.querySelector("[name='nom_bouteille']");
  let liste = document.querySelector('.listeAutoComplete');

  if (inputNomBouteille) {
    inputNomBouteille.addEventListener("keyup", function (evt) {
      console.log(evt);
      let nom = inputNomBouteille.value;
      liste.innerHTML = "";
      if (nom) {
        let requete = new Request(BaseURL + "index.php?requete=autocompleteBouteille", { method: 'POST', body: '{"nom": "' + nom + '"}' });
        fetch(requete)
          .then(response => {
            if (response.status === 200) {
              return response.json();
            } else {
              throw new Error('Erreur');
            }
          })
          .then(response => {
            console.log(response);

            response.forEach(function (element) {
              liste.innerHTML += "<li data-id='" + element.id + "'>" + element.nom + "</li>";
            })
          }).catch(error => {
            console.error(error);
          });
      }
    });

    let bouteille = {
      nom: document.querySelector(".nom_bouteille"),
      millesime: document.querySelector("[name='millesime']"),
      quantite: document.querySelector("[name='quantite']"),
      date_achat: document.querySelector("[name='date_achat']"),
      prix: document.querySelector("[name='prix']"),
      garde_jusqua: document.querySelector("[name='garde_jusqua']"),
      notes: document.querySelector("[name='notes']"),
    };


    liste.addEventListener("click", function (evt) {
      console.dir(evt.target)
      if (evt.target.tagName == "LI") {
        bouteille.nom.dataset.id = evt.target.dataset.id;
        bouteille.nom.innerHTML = evt.target.innerHTML;

        liste.innerHTML = "";
        inputNomBouteille.value = "";

      }
    });

    let btnAjouter = document.querySelector("[name='ajouterBouteilleCellier']");
    if (btnAjouter) {
      btnAjouter.addEventListener("click", function (evt) {
        var param = {
          "id_bouteille": bouteille.nom.dataset.id,
          "date_achat": bouteille.date_achat.value,
          "garde_jusqua": bouteille.garde_jusqua.value,
          "notes": bouteille.date_achat.value,
          "prix": bouteille.prix.value,
          "quantite": bouteille.quantite.value,
          "millesime": bouteille.millesime.value,
        };
        let requete = new Request(BaseURL + "index.php?requete=ajouterNouvelleBouteilleCellier", { method: 'POST', body: JSON.stringify(param) });
        fetch(requete)
          .then(response => {
            if (response.status === 200) {
              return response.json();
            } else {
              throw new Error('Erreur');
            }
          })
          .then(response => {
            location.href = BaseURL;
          }).catch(error => {
            console.error(error);
          });
      });
    }
  }
});