---
layout: post
title:  "J'ai trouvé une faille critique dans l'appli Elyze"
date:   2022-01-15 17:46:37 +0100
image:  '/images/blog/faille-elyze/header.png'
tags:   [Cybersécurité]
---

Hier soir, j'ai découvert un problème de sécurité sur l'app Elyze (numéro 1 des stores en France cette semaine) qui m'a permis d'apparaître comme candidat à la présidentielle sur le téléphone de plusieurs centaines de milliers de français.

<div class="gallery-box">
  <div class="gallery">
  <img style="height:350px; object-fit:cover" src="/images/blog/faille-elyze/1482393799456436228-FJJu4thWYAQyEvi.jpg" draggable="false">
  </div>
</div>

Ça fait plusieurs jours que l'appli est sous le feu des critiques car le code n'est pas open source et **plusieurs bugs** y ont été relevés :

- En cas d'ex aequo, l'application favorise Emmanuel Macron
- Parfois, l'ordre affiché ne correspond pas au pourcentage 

<div class="gallery-box">
  <div class="gallery">
  <img style="height:350px; object-fit:cover" src="/images/blog/faille-elyze/1482393804170801152-FJJxxSEXEAYW42y.jpg" draggable="false">
  <img style="height:350px; object-fit:cover" src="/images/blog/faille-elyze/1482393804170801152-FJJyGbZXEAUjoaS.png" draggable="false">
  </div>
</div>

Convaincu que ces problèmes ne proviennent pas d'une intention malveillante des créateurs de l'appli, j'ai décidé d'utiliser mes compétences en reverse engineering pour trouver l'origine des bugs et en faire un article.

Après avoir chargé l'appli dans mon outil de décompilation Android (j'utilise **JADX**), je vois que le cœur de l'application est quasiment vide alors que je devrais y trouver un paquet de fichiers Java. 

<div class="gallery-box">
  <div class="gallery">
  <img style="height:350px; object-fit:cover" src="/images/blog/faille-elyze/1482393810390896645-FJJ0JriXEActYq4.png" draggable="false">
  </div>
</div>

En fait, comme plein d'applis récentes, Elyze est codé avec React Native, un framework JavaScript qui permet de publier la même appli sur Android et iOS sans avoir à la coder deux fois dans les langages respectifs de ces plateformes.

Tout le code de l'appli se retrouve dans un unique fichier de 9 MB. Pour prendre moins de place le code est minifié, c'est à dire que la plupart des variables ont des noms très courts et les retours à la ligne sont retirés.

Autrement dit, c'est **illisible**. 

<div class="gallery-box">
  <div class="gallery">
  <img style="height:350px; object-fit:cover" src="/images/blog/faille-elyze/1482393816187523073-FJJ1618WUAE5zP0.png" draggable="false">
  </div>
</div>

Dites vous aussi que 9 MB peut sembler assez peu, mais ici on travaille avec du texte : si le code devait être imprimé sur papier, ça prendrait 3000 pages !

Evidemment, seule une toute petite fraction est écrite par la team Elyze, le reste sert au fonctionnement de React Native.

En faisant des recherches, on tombe rapidement sur la liste qui nous permet de trouver le bug mettant toujours Macron en premier sur les ex-aequo : comme JavaScript utilise un algorithme de tri stable, en cas d'ex-aequo c'est l'ordre original dans la liste qui est retenu. 

<div class="gallery-box">
  <div class="gallery">
  <img style="height:350px; object-fit:cover" src="/images/blog/faille-elyze/1482393822365634566-FJJ4GSVXEAcpdth.png" draggable="false">
  <img style="height:350px; object-fit:cover" src="/images/blog/faille-elyze/1482393822365634566-FJJ4uiJXwAEV0GO.png" draggable="false">
  </div>
</div>

L'autre bug m'a tenu éveillé pendant de longues heures, et le code illisible combiné à mon allergie au JavaScript ne m'a pas permis de comprendre ce comportement inattendu.

Mais dans mes recherches, j'ai plusieurs fois été attiré par quelque chose du coin de l'oeil.

Pour échanger des données avec le serveur, Elyze utilise principalement une interface **GraphQL** avec une base de données qui semble contenir toutes les infos sur les propositions des candidats ainsi que les données utilisateur. 

<div class="gallery-box">
  <div class="gallery">
  <img style="height:350px; object-fit:cover" src="/images/blog/faille-elyze/1482393828304867333-FJJ6etZXIAkOzsM.png" draggable="false">
  </div>
</div>

L'URL de la base de données se trouve aussi quelque part dans le code, avec un **jeton d'authentification** qui est le même pour tout le monde.

Avec l'outil GraphQLmap de l'ami <a href="https://twitter.com/pentest_swissky" target="_blank">@pentest_swissky</a>, je récupère en deux commandes la structure de la base de données : 

<div class="gallery-box">
  <div class="gallery">
  <img style="height:350px; object-fit:cover" src="/images/blog/faille-elyze/1482393832469811205-FJJ7AUWWUAEceLJ.png" draggable="false">
  <img style="height:350px; object-fit:cover" src="/images/blog/faille-elyze/1482393832469811205-FJJ7Gh1XIAEoR6-.png" draggable="false">
  </div>
</div>

Avoir un accès direct à GraphQL n'est pas une faille en soi : si les permissions sont bien configurées, on ne peut effectuer que des actions que l'appli pourrait exécuter.

Mais le souci justement, c'est que les permissions étaient mal configurées. Tout ce qui touchait aux candidats était autorisé en lecture **et en écriture**, notamment la fonction permettant d'ajouter ou de modifier une proposition... 

<div class="gallery-box">
  <div class="gallery">
  <img style="height:350px; object-fit:cover" src="/images/blog/faille-elyze/1482393838878658561-FJJ9VZ5WQAMvsGY.png" draggable="false">
  <img style="height:350px; object-fit:cover" src="/images/blog/faille-elyze/1482393838878658561-FJJ9fooXwAMXYBL.jpg" draggable="false">
  </div>
</div>

Les développeurs ont été réactifs pour rectifier ça (merci à <a href="https://twitter.com/GuillaumeRozier" target="_blank">@GuillaumeRozier</a> et son carnet d'adresses immense) et j'ai passé une partie de la nuit à les aider, il n'y a pas eu à ma connaissance d'autre exploitation de cette vulnérabilité à des fins de manipulation politique.

Heureusement, les autres parties de la base de données n'ont pas été affectées : ça aurait été vraiment terrible d'avoir une fuite des données utilisateur (date de naissance, code postal, intentions de vote en 2017 et 2022, résultat de chaque swipe sur l'app) 

<div class="gallery-box">
  <div class="gallery">
  <img style="height:350px; object-fit:cover" src="/images/blog/faille-elyze/1482393845560233984-FJKB0ubXMAUVepV.jpg" draggable="false">
  </div>
</div>

On peut d'ailleurs se demander si l'engagement de confidentialité est bien respecté : à mon avis, la date de naissance et le code postal permettent assez facilement d'identifier une personne directement... 

<div class="gallery-box">
  <div class="gallery">
  <img style="height:350px; object-fit:cover" src="/images/blog/faille-elyze/1482393850765357069-FJJ-w-rXIAAJ8J1.png" draggable="false">
  </div>
</div>

En résumé, le chemin d'attaque était relativement simple à exploiter : 

- récupération du fichier .apk
- extraction du bundle.js
- récupération de l'endpoint GraphQL et de la clé API 
- identification de la faiblesse de configuration

En tout, j'en ai eu pour environ 3 heures.

Pour conclure, je pense que les développeurs d'Elyze devraient rendre l'application open source. On voit bien que la sécurité par l'obscurité n'empêche absolument pas les attaques, et la transparence algorithmique est nécessaire dans un contexte d'élections.

UPDATE : Le créateur d'Elyze, qui s'est toujours revendiqué apartisan, vient de rejoindre le cabinet de la porte-parole du gouvernement. (Info Mediapart)

