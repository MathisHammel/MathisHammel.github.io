---
layout: post
title:  "Une IA piratée avec un tweet !"
date:   2022-09-16 17:56:57 +0200
image:  '/images/blog/piratage-ia-tweet/header.png'
tags:   [IA, Cybersécurité]
---

Une intelligence artificielle piratée avec un tweet ???

Remoteli est un bot Twitter censé vous aider à trouver du travail en remote, mais... on a réussi à lui faire raconter n'importe quoi, grâce à une toute nouvelle méthode d'**injection de requête** ! Explications.

Remoteli est donc censé répondre automatiquement aux tweets contenant les mots "remote work" et "remote jobs", en s'appuyant sur une IA pour générer ses réponses.

L'IA en question est le célèbre GPT-3, développé par la société OpenAI (qui est également à l'origine de DALL·E 2). 

<div class="gallery-box">
  <div class="gallery">
  <img style="height:350px; object-fit:cover" src="/images/blog/piratage-ia-tweet/1570803945655906312-FcyX6olXwAMb1ah.jpg" draggable="false">
  </div>
</div>

GPT-3 est capable générer des textes en langage naturel très réaliste pour répondre à n'importe quelle requête.

Pour enseigner à GPT-3 la manière répondre, on va lui donner plusieurs exemples de questions/réponses qui respectent le format attendu. 

<div class="gallery-box">
  <div class="gallery">
  <img style="height:350px; object-fit:cover" src="/images/blog/piratage-ia-tweet/1570803951032999937-FcyM9fKXoAE2XW-.jpg" draggable="false">
  </div>
</div>

Pour communiquer avec GPT-3, on utilise une API sur laquelle on envoie cette série d'exemples, suivie de la question à laquelle il doit répondre.

Par exemple sur cette requête, GPT-3 nous dira "La réponse est xxx" (je vous laisse faire le calcul chez vous, sans calculette 😜) 

<div class="gallery-box">
  <div class="gallery">
  <img style="height:350px; object-fit:cover" src="/images/blog/piratage-ia-tweet/1570803956254912515-FcyOfYFXgAACWni.jpg" draggable="false">
  </div>
</div>

Au passage, ce réseau de neurones est archi puissant : en lui donnant seulement 3 exemples de code source en JavaScript, on est capable de lui faire écrire une appli qui répond à un cahier des charges simple 😱 

<div class="gallery-box">
  <div class="gallery">
<video style="height:350px; object-fit:cover" controls>  <source src="/images/blog/piratage-ia-tweet/1570803986403557376-wVhngSSBQoF4FDZI.mp4" type="video/mp4"></video>  </div>
</div>

Cependant, cet apprentissage peut être **détourné** si la dernière question est contrôlée par l'utilisateur.

Prenons un exemple où GPT-3 serait intégré à une interface où n'importe qui peut poser des questions de maths. 

<div class="gallery-box">
  <div class="gallery">
  <img style="height:350px; object-fit:cover" src="/images/blog/piratage-ia-tweet/1570803992221061120-FcyRiUdXEAABRPo.jpg" draggable="false">
  </div>
</div>

Dans ce cas, l'appli va concaténer la chaîne de caractères en blanc avec la question de l'utilisateur, et envoyer le tout à GPT-3.

Mais l'IA n'a **aucun moyen de différencier** ce qui a été écrit par le dev de ce qui provient de l'utilisateur.

Et l'utilisateur peut donc exploiter cette vulnérabilité en envoyant un faux exemple d'entraînement empoisonné. GPT-3 pense que ce troisième exemple fait partie de l'entraînement, et risque donc de répondre "LOL" à la dernière requête ! 

<div class="gallery-box">
  <div class="gallery">
  <img style="height:350px; object-fit:cover" src="/images/blog/piratage-ia-tweet/1570803999242358786-FcyVEVdXgAE9fP7.jpg" draggable="false">
  </div>
</div>

Cette technique d'injection a été découverte en début de semaine par l'expert Riley Goodside.

Il n'aura donc fallu que 3 jours pour que certains petits malins de Twitter ne trouvent sa première victime, qui n'était autre que le bot Remoteli 😅 

<div class="gallery-box">
  <div class="gallery">
  <img style="height:350px; object-fit:cover" src="/images/blog/piratage-ia-tweet/1570804005101772806-FcyZDiWWAAUVMTn.jpg" draggable="false">
  </div>
</div>

Des attaques similaires existent déjà dans le développement web : on retrouve exactement le même principe qu'une injection SQL ou d'une faille XSS.

Voilà donc une nouvelle leçon apprise par les expert·es en intelligence artificielle aujourd'hui : **never trust user input** !

Merci d'avoir suivi cet article 🥰 Pour découvrir un autre cas de manipulation d'une IA, je vous invite à lire [cet autre article](/blog/dall-e-2-triche) que j'avais écrit à propos de l'inclusivité chez OpenAI et des dérives éthiques.


