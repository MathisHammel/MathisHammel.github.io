---
layout: post
title:  "A/B testing&nbsp;: envoyer 12 000 emails pour comprendre une communauté"
date:   2022-05-27 08:20:59 +0200
image:  '/images/blog/emailing-ab-testing/header.png'
tags:   [Algo]
---

Aujourd'hui, je vous explique comment j'ai utilisé la puissance de la **méthode scientifique** pour hacker mon métier.

Je vous propose un retour d'expérience sur une expérience que menée sur plus de 12 000 personnes pour mettre en évidence l'efficacité de certains biais cognitifs. 

Avant de commencer, un peu de contexte : chez CodinGame je suis Tech Evangelist, un rôle à mi-chemin entre le dev et le marketing où je crée des contenus pour donner de la visibilité à nos activités.

Chaque mois j'organise une session de talks "Brown Bag Lunch" (BBL). 

<div class="gallery-box">
  <div class="gallery">
  <img style="height:350px; object-fit:cover" src="/images/blog/emailing-ab-testing/1530071557539876864-FTvggj6X0AAtUzC.jpg" draggable="false">
  </div>
</div>

Ces talks étaient initialement des événements purement internes, dont l'objectif était d'alimenter un espace libre de partage technique chaque mois, pour la vingtaine de passionné·es que compte notre équipe de dev.

Notre CEO m'a donné carte blanche totale sur le contenu, donc je me suis fait plaisir : injections SQL, machine learning, et même un après-midi sur le crochetage et la sécurité physique qui a donné lieu à ce genre de curiosité sur le parking de la boîte : 

<div class="gallery-box">
  <div class="gallery">
<video style="height:350px; object-fit:cover" controls>  <source src="/images/blog/emailing-ab-testing/1530071610312605699-jvDezxU8UdNbXjZf.mp4" type="video/mp4"></video>  </div>
</div>

Comme ces BBLs plaisaient bien, on a décidé d'essayer de les ouvrir au public. Ça implique un nouveau format (distanciel, anglais, durée courte) mais la préoccupation principale restait surtout de faire venir du monde.

C'est ce challenge qui va nous intéresser aujourd'hui.

J'ai récupéré le compte de CodinGame sur Meetup‍.com, qui nous avait servi à organiser avant le Covid quelques events de Clash of Code chez des partenaires. Avec 500 personnes dans le groupe, je pensais pouvoir récupérer une petite centaine d'inscrits facilement, mais... 

<div class="gallery-box">
  <div class="gallery">
  <img style="height:350px; object-fit:cover" src="/images/blog/emailing-ab-testing/1530071618009157634-FTvhHCCXEAErlSc.png" draggable="false">
  </div>
</div>

En rétrospective, c'était assez prévisible : les membres existants du groupe Meetup étaient là pour un contenu différent, et une majorité ont sûrement un compte devenu inactif depuis le temps.

Heureusement, on a d'autres canaux de communication et on s'est tournés vers des publications sur les réseaux sociaux.

Le BBL a péniblement atteint 50 inscrit·es, et on savait qu'il était possible de faire mieux.

Quelques stats sur l'annonce du premier BBL via les réseaux sociaux de l'entreprise :

- Facebook (83k abonnés) : 9 likes, 13 clics
- Twitter (12k abonnés) : 9 likes, 49 clics
- LinkedIn (8k abonnés) : 9 likes, 11 clics

Je vous laisse en tirer vos propres conclusions ;)

Mais quand on est CodinGame, on a un atout que beaucoup d'autres n'ont pas : une communauté de **3 millions de personnes** 😁

Comme le premier BBL avait une conférence sur la théorie des graphes, on a envoyé un email à 4700 devs ayant validé au moins un exo difficile dans ce domaine. 

<div class="gallery-box">
  <div class="gallery">
  <img style="height:350px; object-fit:cover" src="/images/blog/emailing-ab-testing/1530071628847136771-FTvj0cVWYAAxJ9l.png" draggable="false">
  </div>
</div>

Résultat des courses, énorme succès : 200 inscrit·es supplémentaires !

Donc on constate bien que c'est pas indispensable d'avoir 83k sur Facebook, le plus important est de choisir les bons canaux et de parler aux bonnes personnes.

Notez aussi cette ouverture de génie trouvée par <a href="https://twitter.com/thibaud_jobert" target="_blank">@thibaud_jobert</a> :

"Savais-tu que **seulement 0.7%** des CodinGamers réussissent à résoudre un puzzle sur les graphes de niveau difficile ou expert ? Et que tu es l'un(e) d'eux ?"

Avouez que ça donne envie de cliquer non ? 

<div class="gallery-box">
  <div class="gallery">
  <img style="height:350px; object-fit:cover" src="/images/blog/emailing-ab-testing/1530071635700621312-FTvkMT1WYAEGPtO.jpg" draggable="false">
  </div>
</div>

C'est justement l'hypothèse que j'ai eu envie de tester : à quel point la formulation de l'intro est-elle importante dans l'efficacité d'une communication ?

Ou alors, est-ce que ce serait plutôt le ciblage du bon segment de notre communauté qui explique ce succès ?

On a plein de manières de tester ça :

- Renvoyer le même email aux mêmes personnes pour le prochain event, en changeant l'intro
- Faire deux posts simultanés sur les réseaux sociaux et voir lequel fonctionne le mieux
- Demander aux participant·es ce qui les a incité à cliquer

Mais toutes ces méthodes sont bourrées de **biais méthodologiques** qui peuvent fausser l'étude !

Je vous laisse faire l'exercice d'en dresser la liste pour les 3 propositions ci-dessus, on peut en trouver facilement une dizaine.

On peut évidemment tenter d'estimer l'incertitude associée à chacun de ces biais, ce qui nous permettrait d'avoir une marge d'erreur sur le résultat.

Or bien souvent, on va se retrouver avec des intervalles bien plus grands que ce qu'on cherche à mesurer... 

<div class="gallery-box">
  <div class="gallery">
  <img style="height:350px; object-fit:cover" src="/images/blog/emailing-ab-testing/1530071646521917440-FTvkxjpX0AA-qLS.png" draggable="false">
  </div>
</div>

Ce qu'on va viser pendant la conception d'une expérience scientifique, c'est contrôler au maximum l'environnement du test.

Car c'est finalement la maîtrise de toutes les variables qui va nous permettre d'avoir le résultat **le moins bruité possible**.

Pour mener cette expérience qui se veut la plus rigoureuse possible, j'ai donc décidé d'utiliser un outil que vous connaissez peut-être, très courant en marketing : le **A/B testing**.

Le principe est simple : on présente aléatoirement à chaque utilisateur **une version ou l'autre** d'une interface, et on mesure l'impact (taux d'engagement, valeur moyenne de l'achat, ...) de chaque version.

Un exemple assez connu est le bouton en page d'accueil de Netflix : 

<div class="gallery-box">
  <div class="gallery">
  <img style="height:350px; object-fit:cover" src="/images/blog/emailing-ab-testing/1530071656827338752-FTvlA6bXEAAm2en.jpg" draggable="false">
  </div>
</div>

Dans notre petite expérience scientifique, on doit donc composer deux versions de l'email : la variante 1 avec une intro assez **neutre**, et la 2 avec un opening bien **clickbait** comme le mois dernier. 

<div class="gallery-box">
  <div class="gallery">
  <img style="height:350px; object-fit:cover" src="/images/blog/emailing-ab-testing/1530071659666890752-FTvl2-gWAAABi2x.jpg" draggable="false">
  </div>
</div>

Je voulais aussi voir à quel point le ciblage des destinataires compte. Au prochain BBL, les gars de <a href="https://twitter.com/Squadracer" target="_blank">@Squadracer</a> viennent parler de compétitions de taille de code en Ruby, je me suis dit que ça pourrait intéresser davantage les experts de ce langage donc j'ai créé 3 groupes:

- Groupe A : 20% aléatoires des comptes de niveau 10+ sur CodinGame. Pas de ciblage, c'est le groupe de contrôle
- Groupe B : Tous les devs ayant validé à 100% au moins un Clash of Code en Ruby
- Groupe C : Tous les devs ayant indiqué Ruby comme expertise sur leur profil 

<div class="gallery-box">
  <div class="gallery">
  <img style="height:350px; object-fit:cover" src="/images/blog/emailing-ab-testing/1530071663584415744-FTvmYwkWIAEoWuN.jpg" draggable="false">
  </div>
</div>

Le recouvrement entre ces 3 populations est très faible, mais souvenez-vous que chaque groupe représente une minuscule partie de la communauté CodinGame et des usages bien distints !

En cas d'appartenance d'un utilisateur à plusieurs groupes, on lui attribue par priorité C&gt;B&gt;A.

Ca nous fait donc **6 groupes** disjoints (3 groupes x 2 variantes d'email), auxquels on va retirer A2 car le groupe de contrôle n'est pas concerné par la variante Ruby.

On va s'intéresser au nombre de clics sur le lien car c'est super facile à mesurer (via Bitly par exemple).

J'ai créé **5 liens de tracking**, crafté mes 3 requêtes SQL sur la base de CodinGame et codé un script Python qui formate les données pour notre outil de mailing.

Les 12 445 emails ont été envoyés il y a pile une semaine et le nombre de clics plafonne, donc étudions les résultats !

Commençons par l'importance du tracking. On doit ici garder seulement les groupes A1, B1 et C1 pour éviter que le score du groupe de contrôle A ne soit biaisé par l'absence de groupe A2.

Les résultats sont sans appel : le fait de choisir correctement la cible marketing nous permet de gagner +52.7% de performance sur le taux d'engagement, avec exactement le même contenu dans l'email ! 

<div class="gallery-box">
  <div class="gallery">
  <img style="height:350px; object-fit:cover" src="/images/blog/emailing-ab-testing/1530073011503738881-FTvoZaEWIAA1CvN.jpg" draggable="false">
  </div>
</div>

Vous pouvez aussi remarquer que le groupe C a des performances plus basses que le contrôle. Ma théorie est que les comptes de cette catégorie ont en moyenne moins utilisé CodinGame que les deux autres groupes, car il suffit d'avoir rempli son profil pour pouvoir en faire partie.

On va maintenant passer au second résultat de cette expérience, celui que l'on attend tous : est-ce que le sentiment d'appartenance à un groupe privilégié fonctionne vraiment pour inciter les gens à cliquer ?

Les deux variants d'email avaient donc exactement le même contenu, à l'exception de la première phrase :

1 - We hope you are doing well.

2 - We have identified **0.3%** of our community as **Ruby** experts, and **you're one of them**!

La formulation de cet email n'a d'ailleurs pas manqué d'attirer l'attention d'une partie de la communauté.

Ni celle de l'un des 3 conférenciers qui présentera le BBL en question 😅 

<div class="gallery-box">
  <div class="gallery">
  <img style="height:350px; object-fit:cover" src="/images/blog/emailing-ab-testing/1530073020596899840-FTvou0kXwAEihkG.png" draggable="false">
  <img style="height:350px; object-fit:cover" src="/images/blog/emailing-ab-testing/1530073020596899840-FTvozd0WQAUXShb.png" draggable="false">
  </div>
</div>

Ici encore, le résultat est bluffant : en changeant une seule phrase dans tout l'email, on arrive à augmenter le taux de clics sur le lien de **plus de 50%** ! 

<div class="gallery-box">
  <div class="gallery">
  <img style="height:350px; object-fit:cover" src="/images/blog/emailing-ab-testing/1530073025428738048-FTvo6J0X0AAfLK2.jpg" draggable="false">
  </div>
</div>

Pour finir, on va se convaincre que c'est pas un coup de chance et que nos résultats sont significatifs. Pour ça, il faut une **p-value** (en gros, la probabilité que ce résultat se produise par chance) inférieure à un seuil qu'on fixe généralement à 5%. 

<div class="gallery-box">
  <div class="gallery">
  <img style="height:350px; object-fit:cover" src="/images/blog/emailing-ab-testing/1530073030294216704-FTvo-i9XwAAMjWX.jpg" draggable="false">
  </div>
</div>

On sait que les pourcentages calculés sont seulement des estimations du taux d'engagement : à moins d'envoyer une infinité d'emails, impossible de connaître la valeur exacte. En revanche, on peut calculer des intervalles de confiance et vérifier qu'ils ne se recouvrent pas.

Avec la méthode Clopper-Pearson, on peut calculer ces deux intervalles de confiance à 95% :

- Groupe B1+C1 : entre 2.73% et 3.92%

- Groupe B2+C2 : entre 4.40% et 5.86%

Les intervalles ne se recouvrent pas, on a donc un résultat fort avec une p-value largement inférieure à 1% 😁 

<div class="gallery-box">
  <div class="gallery">
<video style="height:350px; object-fit:cover" autoplay loop>  <source src="/images/blog/emailing-ab-testing/1530073040436056064-FTvpUV5WQAAVldD.mp4" type="video/mp4"></video>  </div>
</div>

Pour conclure sur ces deux expériences scientifiques : en combinant une bonne formulation des contenus avec un targeting adapté, on a donc pu passer le taux de clics de 2.45% à 5.81%, soit une efficacité **augmentée de +137%** sans effort !

Merci d'avoir lu cet article en entier 😊

Je pense qu'on a tout à gagner en partageant ce genre de retour d'expérience terrain, et j'espère sincèrement que ça saura apporter des idées et des données de référence à d'autres qui souhaitent se lancer ou approfondir ces recherches.

Un immense merci à <a href="https://twitter.com/Reelwens" target="_blank">@Reelwens</a> pour son aide sur le design des deux visuels (malgré les 6h de jetlag alors qu'il vient de me rejoindre à New York), Simon est dispo pour des missions freelance donc n'hésitez pas à le contacter si vous avez aimé son boulot !

