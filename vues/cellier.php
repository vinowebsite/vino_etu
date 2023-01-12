<section class="containerCatalogue">
    <?php
    foreach ($data as $cle => $bouteille) {
    ?>
        <div class="carteCatalogue" data-quantite="">
            <div>
                <img src="https:<?php echo $bouteille['image'] ?>">
                <p class="nom">Nom : <?php echo $bouteille['nom'] ?></p>
                <p class="quantite">Quantité : <?php echo $bouteille['quantite'] ?></p>
                <p class="pays">Pays : <?php echo $bouteille['pays'] ?></p>
                <p class="type">Type : <?php echo $bouteille['type'] ?></p>
                <p class="millesime">Millesime : <?php echo $bouteille['millesime'] ?></p>
                <p><a href="<?php echo $bouteille['url_saq'] ?>">Voir SAQ</a></p>
                <article class="options" data-id="<?php echo $bouteille['id_bouteille_cellier'] ?>"><br>
                    <button class="btnAjouter">Ajouter</button>
                    <button>Modifier</button>
                    <button class="btnBoire">Boire</button>
                </article>
            </div>
        </div>
    <?php





    }
    ?>



</section>