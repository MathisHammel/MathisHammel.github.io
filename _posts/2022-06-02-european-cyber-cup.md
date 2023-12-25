---
layout: post
title:  "Retours sur l'European Cyber Cup&nbsp;: médaille d'or pour mon IA défensive"
date:   2022-06-02 08:32:11 +0200
image:  '/images/blog/european-cyber-cup/header.png'
tags:   [Compétitions, IA, Cybersécurité]
---

Il y a un an, je gagnais pour mon équipe la **médaille d’or** sur l’épreuve de Machine Learning lors de l’European Cyber Cup.

Dans cet article, on va parler de quelques outils fondamentaux d'IA, puis je vous explique comment j'ai obtenu un score parfait sur ce challenge. 

<div class="gallery-box">
  <div class="gallery">
  <img style="height:350px; object-fit:cover" src="/images/blog/european-cyber-cup/1532248695865057284-FUOS64RWUAAeeSc.jpg" draggable="false">
  </div>
</div>

Tout d'abord, le principe du challenge : à partir d'un **très grand volume de logs** sur le réseau d'une entreprise (factice) de 2500 employés, nous devions identifier les **utilisateurs malveillants** en détectant leurs comportements suspects. 

<div class="gallery-box">
  <div class="gallery">
  <img style="height:350px; object-fit:cover" src="/images/blog/european-cyber-cup/1532248699736363008-FUOUXJ-XsAAptYs.png" draggable="false">
  </div>
</div>

Ce genre d'application de l'IA à la cybersécurité est hyper intéressant dans le monde réel, car l'automatisation décuple la performance de traitement et les sources d'information tout en permettant une détection et un traitement des attaques quasi-instantanément.

À ce sujet, j'ai assisté le mois dernier à une conférence de <a href="https://twitter.com/JamesAtack" target="_blank">@JamesAtack</a>, responsable du CERT (centre de gestion des incidents cyber) de la Banque de France, qui expérimente exactement ce genre d'IA de détection sur les systèmes que supervise son équipe ! 

<div class="gallery-box">
  <div class="gallery">
  <img style="height:350px; object-fit:cover" src="/images/blog/european-cyber-cup/1532248703960072192-FUOU0d-WIAAgJsD.png" draggable="false">
  </div>
</div>

Revenons-en à notre épreuve : il s'agit d'une tâche de **classification supervisée**, qui représentent une grande partie des problèmes d'IA actuels (et pour lesquels il existe plein de méthodes de résolution).

Classification supervisée, ça veut dire quoi ?

Dans un problème de classification, on cherche à appliquer des étiquettes et/ou prendre une décision sur la donnée fournie. Quelques exemples:

- Filtrage anti-spam
- Reconnaissance de visages
- Maintenance prédictive et détection d'anomalies
- Analyse de thématiques dans un texte

Lorsque le machine learning est dit "supervisé", c'est quand on dispose de plein d'exemples **déjà étiquetés**, qui permettent à l'algorithme de comprendre et apprendre les patterns qu'il doit extraire.

Ça représente une grande majorité des problématiques actuelles en IA. 

<div class="gallery-box">
  <div class="gallery">
  <img style="height:350px; object-fit:cover" src="/images/blog/european-cyber-cup/1532248710045900803-FUOV_gDXsAEXDHV.png" draggable="false">
  </div>
</div>

Alors c'est vrai qu'on a du mal à se représenter le contraire, un algorithme "non supervisé" : si on ne lui explicite pas sa mission de classification, comment peut-il deviner les règles à appliquer ?

En fait, on a un exemple très simple parmi tant d'autres : le **clustering**. 

<div class="gallery-box">
  <div class="gallery">
<video style="height:350px; object-fit:cover" autoplay loop>  <source src="/images/blog/european-cyber-cup/1532248717457334272-FUOkFb6X0AQshN_.mp4" type="video/mp4"></video>  </div>
</div>

Sur l'épreuve d'IA de l'EC2, chaque utilisateur était étiqueté (inoffensif ou malveillant), ce qui nous permettait donc un apprentissage supervisé.

Le roi de cette discipline, vous le connaissez sûrement, c'est le **réseau de neurones**. 

<div class="gallery-box">
  <div class="gallery">
  <img style="height:350px; object-fit:cover" src="/images/blog/european-cyber-cup/1532248722012360704-FUOWrZTXwAAJsGS.jpg" draggable="false">
  </div>
</div>

Un réseau de neurones, c'est quoi ? Perso j'ai longtemps cru que c'était une puce hardware ultra complexe qui permet d'imiter le cerveau humain, mais en fait c'est BEAUCOUP plus simple que ça : un réseau de neurones, c'est **un enchaînement d'additions et de multiplications**. 

<div class="gallery-box">
  <div class="gallery">
  <img style="height:350px; object-fit:cover" src="/images/blog/european-cyber-cup/1532248725493628930-FUOYQJHWAAA0RGl.jpg" draggable="false">
  </div>
</div>

Ça s'appelle ainsi car c'est une modélisation du fonctionnement du cerveau animal, dont les impulsions électriques entre les neurones utilisent des principes similaires à ces opérations mathématiques et sont capables d'apprendre en modifiant les variables du système.

Je ne vais pas entrer dans plus de détails, mais si ça vous intéresse d'en apprendre davantage je ne peux que vous conseiller l'excellente série de vidéos créées par <a href="https://twitter.com/3blue1brown" target="_blank">@3blue1brown</a> sur le sujet : [https://www.youtube.com/playlist...](https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi) 

<div class="gallery-box">
  <div class="gallery">
  <img style="height:350px; object-fit:cover" src="/images/blog/european-cyber-cup/1532248730337959937-FUOYhpfX0AAHEdT.jpg" draggable="false">
  </div>
</div>

En revanche, dans le cadre de l'European Cyber Cup, les réseaux de neurones ne sont pas les plus adaptés. Pour apprendre correctement, il leur faut énormément de données d'entraînement, ou alors un modèle ridiculement petit qu'on peut finalement remplacer par quelque chose de plus efficace.

Et justement, parmi ces modèles simples et puissants, il y en a un que j'apprécie en particulier. Vous avez déjà entendu parler des **arbres de décision** ?

Voici par exemple un arbre de décision qui détermine à quel âge vous avez le droit de passer le permis : 

<div class="gallery-box">
  <div class="gallery">
  <img style="height:350px; object-fit:cover" src="/images/blog/european-cyber-cup/1532248735668809729-FUOYzuGXwAI_dup.jpg" draggable="false">
  </div>
</div>

Ces arbres sont simplement une modélisation d'un processus de décision, à la base ils n'ont rien à voir avec le machine learning.

On commence au noeud tout en haut, on évalue l'expression qu'il contient, on emprunte le chemin qui correspond au résultat et ainsi de suite.

Les arbres de décision sont super faciles à implémenter sous forme de programme informatique, on peut tout coder **avec des if/else imbriqués** ! 

<div class="gallery-box">
  <div class="gallery">
  <img style="height:350px; object-fit:cover" src="/images/blog/european-cyber-cup/1532248741008351232-FUOZB9rWUAA9reZ.jpg" draggable="false">
  </div>
</div>

Le lien avec le machine learning, c'est qu'il existe des algorithmes qui peuvent les générer en s'appuyant sur un ensemble de décisions existantes.

Une fois l'apprentissage terminé, on peut donc utiliser l'arbre pour prendre une décision sur une donnée jamais vue auparavant.

On pouvait parfaitement utiliser cet algorithme pour le challenge de détection de l'European Cyber Cup.

L'apprentissage a besoin de données qui sont organisées et bien formatées. Impossible donc de lui filer les 60GB de logs fournis, il va falloir lui prémâcher le traitement.

Pour entraîner un arbre de décision efficacement ici, on va calculer pour chaque utilisateur plusieurs caractéristiques telles que :

- Nombre de connexions nocturnes
- Écart-type sur le nombre d'emails journaliers
- Niveau hiérarchique

On appelle ça du "**feature engineering**". 

<div class="gallery-box">
  <div class="gallery">
  <img style="height:350px; object-fit:cover" src="/images/blog/european-cyber-cup/1532248746993541122-FUOdrCcXsAEcRDG.jpg" draggable="false">
  </div>
</div>

J'ai déterminé au total un ensemble de 41 valeurs "intéressantes" sur lequel serait basée la classification.

Ensuite, l'algorithme se charge de calculer un arbre de décision qui fait correspondre à chaque utilisateur sa classification réelle (inoffensif/malveillant).

Ce processus d'apprentissage est assez compliqué et pourrait faire l'objet d'un article à part entière, mais en résumé l'algorithme va essayer de trouver des **critères de découpes** successives qui vont séparer au mieux les données par catégorie. 

<div class="gallery-box">
  <div class="gallery">
  <img style="height:350px; object-fit:cover" src="/images/blog/european-cyber-cup/1532248751938621441-FUOeqGiWQAEhAhj.png" draggable="false">
  </div>
</div>

Comme pour la plupart des tâches de machine learning, on n'a pas vraiment besoin d'implémenter l'algorithme car de nombreux packages le font déjà pour nous (et de manière optimisée). Notre vraie mission de data scientist, c'est le paramétrage du modèle et le feature engineering.

Le calcul des 41 features prend environ 3 minutes avec 300 lignes de Python (dont quelques calculs tricky non détaillés ici).

Pour l'apprentissage, toujours en Python, j'utilise le package **Scikit-learn** qui prend à peine 10 lignes et s'exécute en moins d'un millième de seconde ! 

<div class="gallery-box">
  <div class="gallery">
  <img style="height:350px; object-fit:cover" src="/images/blog/european-cyber-cup/1532248756393062400-FUOgNkvWQAA06TB.jpg" draggable="false">
  </div>
</div>

La performance du modèle est déjà très correcte : le score (basé sur la mesure F1, très utilisé en machine learning) avoisine les **70%**.

Mais avec une astuce très simple, on peut en réalité faire largement mieux.

En vérité, les arbres de décision sont peu utilisés tels quels en IA, à cause de leur taux d'erreur élevé.

Pour un même ensemble de données, on aura **plein de configurations** possibles d'arbres que l'algorithme pourra générer, sans savoir laquelle est la plus judicieuse. 

<div class="gallery-box">
  <div class="gallery">
  <img style="height:350px; object-fit:cover" src="/images/blog/european-cyber-cup/1532248761132621824-FUOhUc4XEAIr-i7.jpg" draggable="false">
  </div>
</div>

À cause de leur simplicité, les arbres de décision ont du mal à généraliser et comprendre tous les cas particuliers du jeu de données d'apprentissage, surtout quand celui-ci est petit comme dans notre cas avec seulement 2500 exemples.

Ce grand nombre de configurations possibles est en réalité une force : en prenant **un grand nombre d'arbres** (plusieurs milliers) entraînés sur les mêmes données, on se rend compte que la décision collective des arbres sera bien meilleure que n'importe quel arbre individuel. 

<div class="gallery-box">
  <div class="gallery">
  <img style="height:350px; object-fit:cover" src="/images/blog/european-cyber-cup/1532249602103058432-FUOkQ9rWIAAeo5d.jpg" draggable="false">
  </div>
</div>

Ce type de classificateur s'appelle une **random forest**, et on peut le mettre en place en changeant deux lignes de code puisque les données d'entraînement sont rigoureusement les mêmes. 

<div class="gallery-box">
  <div class="gallery">
  <img style="height:350px; object-fit:cover" src="/images/blog/european-cyber-cup/1532249605416570880-FUOkiySWIAIuQ5p.jpg" draggable="false">
  </div>
</div>

Je pensais pouvoir atteindre un score de 80-90% avec cette méthode, et ensuite devoir ajouter/modifier des features pour l'optimiser.

Finalement ça n'a pas été nécessaire, le classificateur a obtenu du premier coup le **score parfait** de 100% sur le dataset de validation !

Le sujet de cette première édition était vraiment cool, avec une thématique réaliste et qui a su aborder un domaine d'actualité entre la cyber et l'IA. C'est à nouveau <a href="https://twitter.com/Quantmetry" target="_blank">@Quantmetry</a> qui organise cette année, j'ai vraiment hâte de découvrir le sujet 😊 

<div class="gallery-box">
  <div class="gallery">
  <img style="height:350px; object-fit:cover" src="/images/blog/european-cyber-cup/1532249613536833536-FUOkqSBWYAAuJyz.jpg" draggable="false">
  <img style="height:350px; object-fit:cover" src="/images/blog/european-cyber-cup/1532249613536833536-FUOkq4NWAAErvJz.jpg" draggable="false">
  </div>
</div>
