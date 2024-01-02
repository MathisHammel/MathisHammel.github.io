---
layout: post
title:  "Comment l'équipe de Zemmour a essayé de manipuler l'élection 2022"
date:   2022-04-08 19:58:46 +0200
image:  '/images/blog/manipulation-politique-zemmour/header.png'
tags:   [Cybersécurité, Algo]
---

Voici une enquête aue j'ai menée sur les manipulations politiques du système d'aide au vote mis en place par les équipes d'Eric Zemmour à quelques jours de la présidentielle.

Attention, c'est pas beau à voir. 

<div class="gallery-box">
  <div class="gallery">
  <img src="/images/blog/manipulation-politique-zemmour/1512490147635474434-FP1v-fKX0AQMsVp.jpg" draggable="false">
  </div>
</div>

Le site **mon-candidat.‍fr** a été mis en ligne en début de semaine, et propose de déterminer votre candidat idéal en seulement 10 questions.

Aucun lien manifeste avec un parti politique n'est affiché, mais il s'agit bien d'un site appartenant au parti Reconquête de Zemmour.

Cette affiliation semble être **volontairement dissimulée**, que ce soit dans le questionnaire ou dans le démarchage de masse effectué pour rediriger des électeurs sur le site, comme on peut le voir sur ce SMS reçu hier par <a href="https://twitter.com/MrsSensha" target="_blank">@MrsSensha</a> : 

<div class="gallery-box">
  <div class="gallery">
  <img src="/images/blog/manipulation-politique-zemmour/1512490151980769280-FP1TnIEXEAgVDLi.jpg" draggable="false">
  </div>
</div>

Mais on peut assez facilement confirmer que c'est bien le parti Reconquête qui se cache derrière le site :

- enregistrements DNS
- code source référence à "moncandidat-ez"
- et bien sûr, la magnifique page de mentions légales

<div class="gallery-box">
  <div class="gallery">
  <img style="height:250px; object-fit:cover" src="/images/blog/manipulation-politique-zemmour/1512490156674240523-FP1WTQTXIAQEsaT.png" draggable="false">
  <img style="height:250px; object-fit:cover" src="/images/blog/manipulation-politique-zemmour/1512490156674240523-FP1Y_H2WUAgKC95.png" draggable="false">
</div>
  <div class="gallery" style="padding-top:10px">
  <img style="height:250px; object-fit:cover" src="/images/blog/manipulation-politique-zemmour/1512490156674240523-FP1ZXlBWUAALh1S.jpg" draggable="false">
  </div>
</div>

Pour celles et ceux qui me connaissent un peu, vous savez que je fais beaucoup d'algorithmique. Alors qu'en est-il de l'algorithme qui se cache derrière ce système de recommandation assez douteux ?

On imagine bien que c'est **malhonnête et biaisé**, mais là vous êtes pas prêts. 

<div class="gallery-box">
  <div class="gallery">
  <img src="/images/blog/manipulation-politique-zemmour/1512490161183109125-FP1w8MtWQAkYJ1p.png" draggable="false">
  </div>
</div>

Le site est construit de manière très simple, ce qui facilite le reverse-engineering : **tout est calculé dans le navigateur**, on a donc accès au code source de l'algorithme. 

<div class="gallery-box">
  <div class="gallery">
  <img src="/images/blog/manipulation-politique-zemmour/1512490171220078600-FP1gSp2WUAsqynK.png" draggable="false">
  </div>
</div>

Première surprise : parmi les 12 candidat/es à la présidentielle, **seuls 5 sont présents** dans le code source de l'application !

Il s'agit de Macron, Roussel, Pécresse, Jadot, et bien évidemment Zemmour.

Le fonctionnement de l'algo de recommandation est assez simple : chacune des 10 propositions est reliée à un candidat, et un vote "pour" sur une proposition rapporte 1 point au candidat correspondant. Un vote "contre" ne change pas le classement.

5 candidats pour 10 propositions, ça fait bien 2 propositions par personne non ? 

<div class="gallery-box">
  <div class="gallery">
  <img src="/images/blog/manipulation-politique-zemmour/1512490180753739781-FP1hjUNWUAMI9JK.jpg" draggable="false">
  </div>
</div>

En réalité, Macron et Pécresse sont aussi écartés du vote car aucune proposition ne leur est reliée. La répartition est la suivante :

- Jadot : 2
- Roussel : 2
- Zemmour : 6

L'image affichée en page d'accueil est donc assez ironique, **ni Arthaud ni Macron ne pouvant apparaître**. 

<div class="gallery-box">
  <div class="gallery">
  <img src="/images/blog/manipulation-politique-zemmour/1512490185254215683-FP1jcNYXwAYwlFP.png" draggable="false">
  </div>
</div>

Et bien sûr, une totale neutralité dans les sujets choisis... Petit exemple avec l'une des deux propositions reliées à Fabien Roussel : 

<div class="gallery-box">
  <div class="gallery">
  <img src="/images/blog/manipulation-politique-zemmour/1512490190111129601-FP1irJ9XEAkkys1.jpg" draggable="false">
  </div>
</div>

Mais comme si le fait d'avoir **60% des propositions en faveur de son candidat** ne suffisait pas, il faut pousser la manipulation encore un peu plus loin : dans les (rares) cas où Jadot et Roussel arrivent ex-aequo avec Zemmour, celui-ci remporte quand même ! 

<div class="gallery-box">
  <div class="gallery">
  <img src="/images/blog/manipulation-politique-zemmour/1512490196952129539-FP1ktL8XIAEE878.jpg" draggable="false">
  </div>
</div>

Maintenant, calculons la **probabilité** que chaque candidat soit recommandé. On va considérer que vous répondez de manière aléatoire 50/50 à chaque question.

Cette hypothèse est clairement irréaliste vu l'écart ridicule entre les questions pro/anti Zemmour, mais difficile de faire mieux. 

<div class="gallery-box">
  <div class="gallery">
  <img src="/images/blog/manipulation-politique-zemmour/1512490205357477894-FP1nt4bWYA0x2tR.png" draggable="false">
  <img src="/images/blog/manipulation-politique-zemmour/1512490205357477894-FP1nzblXEAc-f7L.png" draggable="false">
  </div>
</div>

Pour 10 propositions avec 2 choix chacune, on se retrouve donc avec **1024 configurations** de vote différentes.

On peut donc très facilement simuler tous les cas possibles pour obtenir les probabilités sur chaque candidat.

Le verdict tombe : sur ce site de conseils de vote à l'apparence neutre mais en réalité développé par le Reconquête, les utilisateurs ont **83% de chances** de se voir recommander Eric Zemmour, et 9 des 11 autres candidat/es ne figurent même pas dans l'algorithme du site... 

<div class="gallery-box">
  <div class="gallery">
  <img src="/images/blog/manipulation-politique-zemmour/1512490212731113479-FP1quLeX0AQvR9Z.jpg" draggable="false">
  </div>
</div>

Je passerai aussi sur le fait que le site est hébergé par NationBuilder🇺🇸 avec un nom de domaine acheté chez Google🇺🇸, un transit de données via Cloudflare🇺🇸 et des trackers Google Analytics🇺🇸

Beaucoup de drapeaux 🇺🇸 pour un gars qui tient tant à la souveraineté numérique, non ? 

<div class="gallery-box">
  <div class="gallery">
  <img src="/images/blog/manipulation-politique-zemmour/1512490218070454282-FP1tjXWWYAM_5WH.png" draggable="false">
  </div>
</div>

En somme, des méthodes **malhonnêtes et manipulatrices** qui sont bien à l'image du personnage et du reste de sa campagne.

Ses électeurs seront aux urnes dimanche, j'espère que vous aussi.

Si vous avez aimé cette mini enquête, je vous invite à lire [cet autre article](/blog/faille-elyze) sur une grosse faille de sécurité que j'avais découverte sur l'appli Elyze.
