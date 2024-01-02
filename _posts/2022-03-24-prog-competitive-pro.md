---
layout: post
title:  "La programmation compétitive ne fera pas de vous un·e dev utile"
date:   2022-03-24 16:24:32 +0100
image:  '/images/blog/prog-competitive-pro/header.png'
tags:   [Algo, Compétitions]
---

Les pros de la programmation compétitive ne font paradoxalement pas toujours de bons développeurs et de bonnes développeuses. Mais pourquoi ?

Je vous explique. 

<div class="gallery-box">
  <div class="gallery">
  <img src="/images/blog/prog-competitive-pro/1507015516354846736-FOn-oBPUYBIbqev.jpg" draggable="false">
  </div>
</div>

Une compétition de code, c'est généralement une dizaine de problèmes à résoudre en solo sur une durée de 2 à 6 heures.

Pour chaque exo, le code est évalué sur un ensemble de tests cachés qui vérifient que notre solution est correcte et performante. 

<div class="gallery-box">
  <div class="gallery">
  <img src="/images/blog/prog-competitive-pro/1507015523413868559-FOn-oaxVsBcOyT8.jpg" draggable="false">
  </div>
</div>

Une fois que tous les tests sont au vert, on archive son code source dans un dossier où il ne sera probablement **plus jamais consulté**, et on passe au problème suivant. Le but est de faire ça un maximum de fois dans le temps imparti. 

<div class="gallery-box">
  <div class="gallery">
  <img src="/images/blog/prog-competitive-pro/1507015530409910272-FOn-oz5VcBY1bt-.png" draggable="false">
  </div>
</div>

Mais les attentes du monde de l'entreprise sont largement différentes : un projet de dev, ça s'étale sur **plusieurs mois/années**, on est plusieurs à bosser dessus et la composition de l'équipe peut être amenée à évoluer avec le temps. 

<div class="gallery-box">
  <div class="gallery">
  <img src="/images/blog/prog-competitive-pro/1507015542149812225-FOn-pdLVsAAb2Wi.jpg" draggable="false">
  </div>
</div>

Du coup, le focus y est centré sur la **lisibilité** : à quoi bon avoir un code ultra-performant si les autres mettent 10 minutes à en comprendre la moindre ligne ?

Surtout que dans la plupart des cas, ce code optimisé n'aura même pas de différence visible sur le temps d'exécution...

En résumant les priorités de ces deux mondes, on se rend vite compte du décalage :

Concours d'algo :

1. correct
2. performant
3. écrit rapidement

Entreprise :

1. correct
2. lisible
3. performant (si besoin)

Prenons par exemple le problème où on cherche dans une liste de nombres le k-ième plus petit élément. Voici deux implémentations qui donnent le même résultat : 

<div class="gallery-box">
  <div class="gallery">
  <img src="/images/blog/prog-competitive-pro/1507015558771793933-FOn-qODVsAoNaIv.jpg" draggable="false">
  <img src="/images/blog/prog-competitive-pro/1507015558771793933-FOn-qdUVcAE9CdD.jpg" draggable="false">
  </div>
</div>

Le gain de performance du code de droite correspond à un facteur log(n)/log(k) sur le temps d'exécution, soit une accélération de 15-20x dans le cas spécifique où le tableau contient plusieurs millions d'éléments et que la valeur k est très petite.

En compétition de code on peut facilement trouver une utilité à cet algo, mais dans la "vraie vie" il faut vraiment avoir un **bel alignement des astres** pour que les 12 millisecondes de temps de calcul économisé puissent compenser le sacrifice en lisibilité de votre code. 

<div class="gallery-box">
  <div class="gallery">
  <img src="/images/blog/prog-competitive-pro/1507015568003526677-FOn-rBjVkA4g1Rn.jpg" draggable="false">
  </div>
</div>

Donc oui, quand on identifie au travail un problème qui a une solution optimale élégante, c'est super tentant de sortir un algo du futur assorti d'une structure de données publiée dans un papier de recherche le mois dernier, mais paradoxalement c'est contre-productif. 

<div class="gallery-box">
  <div class="gallery">
  <img src="/images/blog/prog-competitive-pro/1507015575859449857-FOn-rb-VUAgKphD.jpg" draggable="false">
  </div>
</div>

Alors à quoi ça sert de faire de la programmation compétitive, si ça fait de nous des développeurs/es inutiles ?

Déjà, c'est un jeu avant tout. **On n'est pas obligé de trouver une justification productiviste à tous ses loisirs** 😇

Mais il y a aussi des avantages réels :

👉 Une excellente **maîtrise du langage**. 90% de mes connaissances avancées en Python, je les ai découvertes en lisant le code de quelqu'un d'autre sur un exo que j'avais aussi résolu. (pour ça, Clash of Code = ❤️) 

<div class="gallery-box">
  <div class="gallery">
  <img src="/images/blog/prog-competitive-pro/1507015589256065033-FOn-sJ1VEA835x7.jpg" draggable="false">
  </div>
</div>

👉 Même si c'est une démarche qui doit pas être systématique, on a quand même parfois besoin de **performance**.

<div class="gallery-box">
  <div class="gallery">
  <img src="/images/blog/prog-competitive-pro/1507015596017274897-FOn-spHVIA4Ujkl.jpg" draggable="false">
  </div>
</div>

Et dans ces 3% de cas, c'est très pratique d'avoir des bases en algo. Quand on dit "premature optimization is the root of all evil", le mot "premature" est important ! 

👉 Avec ce format où on se force à coder très rapidement, on gagne aussi une grande **aisance avec la programmation et le debugging**. Quand le projet prend du retard ou qu'on a un incident de prod à réparer dans l'heure, je vous assure que ça fait du bien d'être entraîné ! 

<div class="gallery-box">
  <div class="gallery">
<video autoplay loop>  <source src="/images/blog/prog-competitive-pro/1507015614497390597-FOn-s-iVQAkElaG.mp4" type="video/mp4"></video>  </div>
</div>

Pour conclure : à quelques exceptions près (recherche, hardware, low-level, ...) l'algorithmique de performance devrait donc vous servir d'**arme secrète** plutôt que d'outil principal de travail.

N'oubliez pas : quand on a un marteau, tous les problèmes ressemblent à des clous 😉 

<div class="gallery-box">
  <div class="gallery">
  <img src="/images/blog/prog-competitive-pro/1507015627499737096-FOn-uUmUcAIx_-6.jpg" draggable="false">
  <img src="/images/blog/prog-competitive-pro/1507015627499737096-FOn-ufqVUAIKfPp.jpg" draggable="false">
  </div>
</div>

N'hésitez pas à critiquer mon point de vue, à la base il devait faire seulement 3 tweets mais je me suis laissé emporter 😅

Et si y'a des pros de l'algo dans la salle, j'espère ne pas vous avoir trop énervé en présentant un code sub-optimal pour le problème du k-th smallest 😇😈
