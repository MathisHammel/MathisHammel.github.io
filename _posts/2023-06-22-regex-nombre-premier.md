---
layout: post
title:  "Cette regex détecte les nombres premiers !"
date:   2023-06-22 18:08:50 +0200
image:  '/images/blog/regex-nombre-premier/header.png'
tags:   [Algo]
---

Mini-article pour vous expliquer cette formule magique capable de détecter si un nombre est premier ⤵️ [https://twitter.com/fermatslibra...](https://twitter.com/fermatslibrary/status/1671867903069626370)

<blockquote class="twitter-tweet tw-align-center" data-conversation="none" data-dnt="true" data-theme="dark">
  <a href="https://twitter.com/fermatslibrary/status/1671867903069626370"></a>
</blockquote>

Cette chaîne de caractères assez cryptique est une **expression régulière** (ou regex).

C'est une manière de décrire des motifs de caractères pour qu'un ordinateur puisse les détecter dans un texte.

Commençons par un exemple plus simple : 

<div class="gallery-box">
  <div class="gallery">
  <img src="/images/blog/regex-nombre-premier/1671913145487556610-FzPS5umWIAIGzyl.jpg" draggable="false">
  </div>
</div>

La sous-partie en jaune ci-dessous nous indique qu'il faut chercher un motif de la forme suivante :

- Un chiffre (caractère entre 0 et 9)
- Un autre chiffre
- Éventuellement un point ou un espace (le point d'interrogation indique que le dernier groupe est optionnel) 

<div class="gallery-box">
  <div class="gallery">
  <img src="/images/blog/regex-nombre-premier/1671913148943679493-FzPTAwNWcFEpnzb.jpg" draggable="false">
  </div>
</div>

En mettant ce groupe entre parenthèses et en ajoutant un {5} à la suite, ça indique qu'on recherche une répétition de ce motif **5 fois d'affilée**. 

<div class="gallery-box">
  <div class="gallery">
  <img src="/images/blog/regex-nombre-premier/1671913153016352776-FzO99BkaEA0iZ78.jpg" draggable="false">
  </div>
</div>

Il nous reste quelques caractères à comprendre :

Le ^ indique que le motif doit commencer au début du texte dans lequel on cherche, et le $ indique qu'il se termine à la fin du texte.

Les slashs sont une manière d'indiquer qu'il s'agit d'une regex.

Cette expression régulière va donc nous permettre de vérifier si une chaîne de caractères respecte le format donné, à savoir **5 ensembles de 2 chiffres potentiellement séparés par des espaces et/ou points**.

On a donc créé un vérificateur de numéros de téléphone ! 

<div class="gallery-box">
  <div class="gallery">
  <img src="/images/blog/regex-nombre-premier/1671913159228104705-FzPEYkWakAkHTGx.jpg" draggable="false">
  </div>
</div>

Revenons à la regex capable de détecter des nombres premiers : quel est son fonctionnement ?

Ici encore, on va la découper en sous-parties pour y voir plus clair. 

<div class="gallery-box">
  <div class="gallery">
  <img src="/images/blog/regex-nombre-premier/1671913163393040390-FzPEe6eaEAAAGnt.jpg" draggable="false">
  </div>
</div>

Pour que cette expression fonctionne correctement sur un nombre N, il faut convertir celui-ci en **notation unaire**, soit N fois le caractère "1".

Pour savoir si 12 est un nombre premier (spoiler : non), il faudra donc exécuter la regex sur la chaîne 111111111111.

<div class="gallery-box">
  <div class="gallery">
  <img src="/images/blog/regex-nombre-premier/1671913181189484545-FzPFDLAaUAErCIN.jpg" draggable="false">
  </div>
</div>

Ici, on a deux motifs séparés par un caractère `|` qui indique que notre texte doit correspondre à la sous-expression de gauche ou celle de droite.

<div class="gallery-box">
  <div class="gallery">
  <img src="/images/blog/regex-nombre-premier/1671913196964179972-FzPG58maUAE4uq0.jpg" draggable="false">
  </div>
</div>

**La sous-expression de gauche** est toute simple. On va rechercher le motif suivant dans le texte :

- `^` : Début du texte
- `1?` : Rien ou un caractère 1
- `$` : Fin du texte

En gros, on va matcher uniquement si le texte est une chaîne vide (N=0) ou un seul caractère 1 (N=1).

<div class="gallery-box">
  <div class="gallery">
  <img src="/images/blog/regex-nombre-premier/1671913200793649155-FzPIViIakAE4H_d.jpg" draggable="false">
  </div>
</div>

**L'autre moitié de l'expression** est moins triviale. On va devoir introduire 2 nouveaux concepts.

Le caractère + indique qu'on cherche **au moins une répétition** du caractère qui le précède.

La partie ci-dessous indique qu'on cherche un 1 suivi d'au moins un autre 1 (donc 11, 111, 1111, etc.) 

<div class="gallery-box">
  <div class="gallery">
  <img src="/images/blog/regex-nombre-premier/1671913229243621378-FzPJ8OhaMAAld_n.jpg" draggable="false">
  </div>
</div>

On peut ignorer le point d'interrogation qui suit ce motif 11+, c'est une optimisation qui permet d'améliorer la performance de la recherche. (ici, le duo "+?" indique que si plusieurs matchs valides existent, le moteur de regex doit renvoyer le plus petit d'entre eux.)

Pour finir, on a \1+ : au moins une répétition du premier **groupe capturé**.

<div class="gallery-box">
  <div class="gallery">
  <img src="/images/blog/regex-nombre-premier/1671913247568543747-FzPLIC5aQAAC85a.jpg" draggable="false">
  </div>
</div>

Le premier groupe capturé, c'est l'expression entre parenthèses : si la valeur matchée par le motif 11+? était par exemple 1111, alors \1+ devra correspondre à 1111, 11111111, 11111111111, ... 

Le motif de droite nous indique donc qu'il faut un motif d'au moins 2 caractères "1", qui se répète au moins 2 fois.

<div class="gallery-box">
  <div class="gallery">
  <img src="/images/blog/regex-nombre-premier/1671913251309846530-FzPPBqyagAAj7Y_.jpg" draggable="false">
  </div>
</div>

Ce motif correspond à un nombre N qui admet au moins un diviseur autre que 1 et N 😁 

Pour conclure, les seuls nombres validés par notre expression régulière sont ceux qui ne sont pas premiers ! 

<div class="gallery-box">
  <div class="gallery">
  <img src="/images/blog/regex-nombre-premier/1671913269022408705-FzPUP49XwBQ65PU.jpg" draggable="false">
  </div>
</div>

J'espère que ce mini-thread improvisé vous a plu 😁

Quelques ressources complémentaires :
- Si vous voulez expérimenter avec les regex, je recommande fortement le site Regexr‍.com : [https://regexr.com/7ft33](https://regexr.com/7ft33)
- Et pour faire les jolis visuels de code dans mes threads, j'utilise [http://carbon.now.sh](http://carbon.now.sh) 😊
- Une autre excellente recommandation pour apprendre les expressions régulières, c'est [http://RegexCrossword.com](http://RegexCrossword.com) ! 

<div class="gallery-box">
  <div class="gallery">
  <img src="/images/blog/regex-nombre-premier/1671915949602099200-FzPWn6pWIAUmWi6.png" draggable="false">
  </div>
</div>

