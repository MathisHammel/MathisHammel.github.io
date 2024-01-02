---
layout: post
title:  "J'ai découvert un réseau d'entreprises fictives sur LinkedIn"
date:   2023-05-29 16:45:34 +0200
image:  '/images/blog/reseau-entreprises-fictives/header.png'
tags:   [IA, Cybersécurité]
---

Voici comment j'ai découvert un réseau d'entreprises fictives sur LinkedIn qui administre **des centaines de faux profils**.

La semaine dernière, j'ai reçu une invitation LinkedIn de ce profil qui m'a tout de suite paru suspect.

<div class="gallery-box">
  <div class="gallery">
  <img src="/images/blog/reseau-entreprises-fictives/1663194877671120896-FxTMpmTWAAAwi_G.jpg" draggable="false">
  </div>
</div>

Pas de chance pour Richard, j'ai beaucoup travaillé sur les **faux visages** générés par intelligence artificielle et je sais les reconnaître en un coup d'oeil.

L'indicateur le plus évident, c'est la position des yeux : certaines IA vont toujours les placer au même endroit. 

<div class="gallery-box">
  <div class="gallery">
  <img src="/images/blog/reseau-entreprises-fictives/1663194881290911751-FxTZt0eWIAEBwRM.jpg" draggable="false">
  </div>
</div>

Par curiosité, je vais jeter un oeil à la page de Digitize, l'entreprise pour laquelle travaille Richard.

Et là, énorme surprise : parmi les 43 employés de l'entreprise, la quasi-totalité présente une photo de profil qui semble **générée par une IA** ! 

<div class="gallery-box">
  <div class="gallery">
  <img src="/images/blog/reseau-entreprises-fictives/1663194884671524866-FxTM-3eWAAEgUXn.jpg" draggable="false">
  </div>
</div>

Même si vous avez encore un doute, je vous donnerai une preuve irréfutable un peu plus bas dans ce thread.

Mais pour le moment, regardez un peu ce beau trombinoscope : 

<div class="gallery-box">
  <div class="gallery">
  <img src="/images/blog/reseau-entreprises-fictives/1663194888026857473-FxTNcEYWYAALpXt.jpg" draggable="false">
  </div>
</div>

En creusant un peu, on se rend compte que ce n'est pas seulement les comptes qui sont fictifs, mais carrément l'entreprise elle-même.

Il suffit d'aller voir son site internet pour s'en rendre compte : aucun lien ne fonctionne, et les clients semblent même inventés. 

<div class="gallery-box">
  <div class="gallery">
  <img src="/images/blog/reseau-entreprises-fictives/1663194893538263045-FxTNjzgXsAIihGW.png" draggable="false">
  </div>
</div>

Dans les (faux) articles de la page d'accueil, on voit d'ailleurs qu'ils ont publié un article... en 2025 😅 

<div class="gallery-box">
  <div class="gallery">
  <img src="/images/blog/reseau-entreprises-fictives/1663194897455644672-FxTNy-7XgAEdQKY.jpg" draggable="false">
  </div>
</div>

Revenons aux profils LinkedIn. J'ai envie de connaître la date de création de tous ces comptes, pour deux raisons :

- Confirmer qu'ils ont été créés au même moment pour alimenter un réseau de bots
- Découvrir la date de mise en activité de ce réseau

Malheureusement, LinkedIn ne donne pas la date de création d'un compte.

Mais il existe une magouille permettant de récupérer l'identifiant d'un compte dans la base de données de LinkedIn, en allant fouiller le code HTML de la page : 

<div class="gallery-box">
  <div class="gallery">
  <img src="/images/blog/reseau-entreprises-fictives/1663194903151558665-FxTOR3IWcAUlqNk.jpg" draggable="false">
  </div>
</div>

Comme cet identifiant est séquentiel, **deux comptes créés le même jour auront des numéros très proches**.

Pour éviter de faire ce scraping manuellement sur tous les comptes, on peut automatiser ça très facilement avec Python. 

<div class="gallery-box">
  <div class="gallery">
  <img src="/images/blog/reseau-entreprises-fictives/1663194907123523586-FxTOZm2X0AM2Uj_.jpg" draggable="false">
  </div>
</div>

Les résultats sont sans appel : la plupart des profils ont été créés récemment et de manière très groupée. 

<div class="gallery-box">
  <div class="gallery">
  <img src="/images/blog/reseau-entreprises-fictives/1663194912140013570-FxTPtHQXgAIy60E.jpg" draggable="false">
  </div>
</div>

Pour vous donner une référence, voici la comparaison avec mes collègues de CodinGame.

En demandant à des personnes qui ont créé leur compte récemment, j'ai aussi pu placer deux identifiants de référence pour dater précisément la création de ces faux profils. 

<div class="gallery-box">
  <div class="gallery">
  <img src="/images/blog/reseau-entreprises-fictives/1663194916501987329-FxTRAZkWwAEg3D7.jpg" draggable="false">
  </div>
</div>

Je vous avais aussi promis une preuve incontestable que les photos de profil sont générées par une intelligence artificielle.

Pour ça, je dois d'abord vous expliquer quelques bases techniques sur les IA génératives.

Ici, il est question d'un réseau de neurones appelé **StyleGAN2**, qui apprend à générer des images à partir d'un grand nombre d'images d'entraînement.

StyleGAN2 a été rendu célèbre grâce au site **ThisPersonDoesNotExist** qui génère un nouveau visage à chaque refresh de la page. 

<div class="gallery-box">
  <div class="gallery">
  <img src="/images/blog/reseau-entreprises-fictives/1663194923217084417-FxTRY4OXoAsIn-y.jpg" draggable="false">
  </div>
</div>

ThisPersonDoesNotExist a cessé de fonctionner en février 2023, mais il était massivement utilisé pour créer des fausses photo de profil, notamment pour des comptes d'arnaques ou des bots d'influence politique.

Mais qu'est-ce qui explique que les visages générés par StyleGAN2 ont toujours les yeux au même endroit ?

En fait, il s'agit d'une propriété de la banque d'images qui a servi à l'entraîner.

Pour entraîner StyleGAN2, ses créateurs (des ingénieurs NVIDIA) ont utilisé le dataset **FFHQ**, qui contient 70 000 photos libres de droit récupérées sur Flickr.

Les photos originales sont croppées pour ne garder que le visage. 

<div class="gallery-box">
  <div class="gallery">
  <img src="/images/blog/reseau-entreprises-fictives/1663194934843719685-FxTXqwlWcAAo7bp.jpg" draggable="false">
  <img src="/images/blog/reseau-entreprises-fictives/1663194934843719685-FxTXyCgWIAAGAVk.jpg" draggable="false">
  </div>
</div>

Et cette transformation sur des photos de vraies personnes place les yeux **sur le même emplacement à chaque fois**. Du coup, quand StyleGAN2 va essayer de reproduire le dataset FFHQ, il va aussi placer les yeux à cet endroit !

Voici quelques images du dataset d'entraînement : 

<div class="gallery-box">
  <div class="gallery">
  <img src="/images/blog/reseau-entreprises-fictives/1663194939512041477-FxTXTtjWAAImqan.jpg" draggable="false">
  </div>
</div>

Maintenant, parlons du site ThisPersonDoesNotExist. Je vous disais qu'un nouveau visage était généré à chaque rafraîchissement de la page, mais ce n'est pas exactement le cas.

Pour économiser de la puissance de calcul, le site a mis en place une technique intéressante.

En fait, le serveur produit une nouvelle image chaque seconde, qui est distribuée à tous les utilisateurs faisant une requête dans ce laps de temps.

Les images ne sont donc pas uniques, si deux personnes font une requête dans la même seconde **elles recevront le même visage** !

Je me suis rendu compte de ça en 2021, et j'ai décidé de créer un outil qui télécharge **toutes** les images produites par ThisPersonDoesNotExist pour les mettre dans une base de données de reconnaissance faciale, qui me permet donc de déterminer si une photo provient du site.

Parmi les employés de Digitize, on trouve un certain Alan Harris. 

<div class="gallery-box">
  <div class="gallery">
  <img src="/images/blog/reseau-entreprises-fictives/1663194949553119232-FxTYHFlXsAAnPRm.png" draggable="false">
  </div>
</div>

Et en passant sa photo dans l'outil, on trouve une correspondance parfaite téléchargée sur ThisPersonDoesNotExist le 13 février 😁

On peut donc affirmer avec certitude que Digitize utilise des photos de profil générées par une IA.

Parmi les autres indices intéressants, on trouve aussi des employés avec des noms très similaires mais sans aucun lien sur la photo ou le titre de poste.

Encore une faute d'OPSEC qui montre que ce réseau de bots est administré par des amateurs. 

<div class="gallery-box">
  <div class="gallery">
  <img style="height:250px; object-fit:cover" src="/images/blog/reseau-entreprises-fictives/1663194955580338176-FxTZLZbWwAE9ngp.jpg" draggable="false">
  <img style="height:250px; object-fit:cover" src="/images/blog/reseau-entreprises-fictives/1663194955580338176-FxTZLy-WcAAsGJA.jpg" draggable="false">
</div>
  <div class="gallery" style="padding-top:10px">
  <img style="height:250px; object-fit:cover" src="/images/blog/reseau-entreprises-fictives/1663194955580338176-FxTZMP1WcAAwqff.png" draggable="false">
  <img style="height:250px; object-fit:cover" src="/images/blog/reseau-entreprises-fictives/1663194955580338176-FxTZMqTXsAgxfAY.jpg" draggable="false">
  </div>
</div>

Le réseau ne s'arrête d'ailleurs pas là.

Plusieurs éléments nous ont permis de confirmer un lien avec au moins deux autres entreprises fictives sur LinkedIn, totalisant une centaine de faux profils et environ **250 000 personnes concernées**.

Si vous êtes dans le réseau LinkedIn de l'un de ces faux comptes, je vous recommande de les retirer au plus vite.

Les liens des 3 entreprises fictives sont dispo dans le tweet ci-dessous, vérifiez que vous n'avez aucun contact parmi celles-ci.

- [SourceTech](https://www.linkedin.com/company/sourcetechrecruitment/)
- [Digitize Consulting Services](https://www.linkedin.com/company/digitize-consulting-services/)
- [Digitize IT Recruitment](https://www.linkedin.com/company/digitize-it-recruitment/)

Une question subsiste : quels sont les intérêts d'administrer un tel réseau fictif sur LinkedIn ?

Plusieurs hypothèses sont valides :

#### 1. Un scraping massif de données personnelles.

C'est un grand classique des attaques sur les réseaux sociaux. On se souviendra de l'entreprise Cambridge Analytica qui avait collecté les données de 87 millions d'utilisateurs Facebook, notamment pour appuyer la campagne Trump. 

<div class="gallery-box">
  <div class="gallery">
  <img src="/images/blog/reseau-entreprises-fictives/1663196024016457729-FxTbYI1XoAA6ekX.png" draggable="false">
  </div>
</div>

#### 2. Des pratiques commerciales douteuses.

Nombreuses sont les entreprises qui automatisent les prises de contact sur LinkedIn pour trouver des clients potentiels. Pas impossible que Digitize soit le résultat d'une équipe de commerciaux malhonnêtes (pléonasme 😇)

#### 3. Autre chose ?

Il y a plein d'autres utilités à avoir un réseau de plusieurs centaines de milliers de contacts.

Par exemple, en mars 2023, Google a révélé qu'un service de renseignement nord-coréen utilisait un réseau de faux recruteurs sur LinkedIn pour cibler des victimes. 

<div class="gallery-box">
  <div class="gallery">
  <img src="/images/blog/reseau-entreprises-fictives/1663196029611659266-FxTblrIWIAEejbs.png" draggable="false">
  </div>
</div>

Cette dernière hypothèse me semble peu probable (surtout vu l'amateurisme de la démarche), mais ça servira de piqûre de rappel : faites attention avant d'accepter une demande Linkedin venant de quelqu'un que vous ne connaissez pas !

Merci d'avoir lu cet article !

Je remercie grandement Anso de l'association <a href="https://twitter.com/OpenFacto" target="_blank">@OpenFacto</a>, ainsi que les étudiants de <a href="https://twitter.com/Guardia_School" target="_blank">@Guardia_School</a> (Bl1nk_, <a href="https://twitter.com/LouNuX_" target="_blank">@LouNuX_</a>, Percya et Shai) qui ont travaillé avec moi sur cette enquête ❤️

Et pour en apprendre davantage sur StyleGAN2 et mon outil de détection de photos générées sur ThisPersonDoesNotExist, je vous renvoie vers cette conférence de 35 minutes que j'ai présentée l'an dernier sur le sujet : [https://www.youtube.com/watch?v=...](https://www.youtube.com/watch?v=ZR_NET9mxVU)

