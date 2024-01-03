---
layout: post
title:  "Droite au Coeur&nbsp;: la pire faille de sécurité au monde"
date:   2023-08-01 15:23:42 +0200
image:  '/images/blog/droite-au-coeur/header.jpg'
tags:   [Cybersécurité]
---

La vulnérabilité que j'ai trouvée dans **Droite au Coeur**, site de rencontre entre personnes de droite, a été corrigée. Je peux donc légalement vous expliquer la pire faille de sécurité du monde. [https://twitter.com/CoeurDroite/...](https://twitter.com/CoeurDroite/status/1685724225053544448)

<blockquote class="twitter-tweet tw-align-center" data-conversation="none" data-dnt="true" data-theme="dark">
  <a href="https://twitter.com/CoeurDroite/status/1685724225053544448"></a>
</blockquote>

L'interface de Droite au Coeur, comme beaucoup de sites web depuis ~2010, est un site **dynamique**.

Cela signifie que votre navigateur va d'abord télécharger le code qui gère l'affichage de la page, mais sans télécharger le contenu.

Pendant quelques secondes, la page ressemble en gros à ça : 

<div class="gallery-box">
  <div class="gallery">
  <img src="/images/blog/droite-au-coeur/1686367101735563264-F2cfoRUXwAApJdR.jpg" draggable="false">
  </div>
</div>

C'est ce squelette de page qui va ensuite faire d'autres requêtes pour récupérer le contenu, ici les profils de dating.

Pour ça, l'interface va utiliser une **API** : c'est un programme hébergé côté serveur, qui va récupérer et formater les données qu'on lui demande. 

<div class="gallery-box">
  <div class="gallery">
  <img src="/images/blog/droite-au-coeur/1686367104646467584-F2ck8TqWYAA_tEv.jpg" draggable="false">
  </div>
</div>

L'avantage par rapport à une page statique (où tout le contenu est pré-affiché), c'est une navigation **plus fluide** : pas besoin de rafraîchir entièrement la page à chaque fois qu'on change un filtre de recherche ou qu'on atteint le bas de la page.

Quand on crée un site web dynamique, la partie la plus vulnérable est l'API. Il existe plein d'attaques en fonction du type de serveur et de la manière dont il est codé : injections SQL, RCE, XSRF, ...

Mais la faille la plus élémentaire, c'est quand l'API est **configurée n'importe comment** et qu'il fait tout le boulot à la place du hacker 😬

Ici, absolument aucune mesure offensive n'est nécessaire puisque le serveur est simplement trop bavard...

[https://twitter.com/MathisHammel...](https://twitter.com/MathisHammel/status/1685304981803483136)

<blockquote class="twitter-tweet tw-align-center" data-conversation="none" data-dnt="true" data-theme="dark">
  <a href="https://twitter.com/MathisHammel/status/1685304981803483136"></a>
</blockquote>

Chez Droite au Coeur, l'API renvoie toutes les données perso de tous les utilisateurs, et c'est l'interface (sur votre ordinateur donc) qui se charge de filtrer lesquelles sont effectivement affichées.

Pour les récupérer, il suffit donc d'**intercepter** ce que reçoit votre ordi.

C'est très facile à faire si vous utilisez Chrome/Firefox, en utilisant les outils pour développeurs qui sont intégrés.

Touche F12 &gt; onglet "réseau" &gt; choisissez la requête à examiner (search ou msearch dans notre cas) &gt; onglet "réponse". 

<div class="gallery-box">
  <div class="gallery">
  <img src="/images/blog/droite-au-coeur/1686367128587530242-F2ct9WEb0AAGey0.jpg" draggable="false">
  </div>
</div>

Vous pouvez d'ailleurs constater que le champ "email" est vide sur la capture ci-dessus, ce qui indique que la fuite majeure a été réparée.

J'étais obligé d'attendre ça pour publier la faille en détail (même si elle est archi triviale) pour être réglo vis-à-vis du code pénal, art. 323-3-1.

Merci d'ailleurs pour les nombreux conseils juridiques non-sollicités et souvent incorrects, mais je suis très bien accompagné de ce côté-là. Avec des adversaires comme ça, on ne prend pas de risque 😉

Merci d'avoir lu cet article, et faites attention à vos données !

