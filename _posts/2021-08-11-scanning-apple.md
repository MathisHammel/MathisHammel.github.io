---
layout: post
title:  "Comment Apple prévoit de détecter des photos illégales sur votre iPhone"
date:   2021-08-11 20:22:40 +0200
image:  '/images/blog/scanning-apple/header.png'
tags:   [Algo, IA, Cybersécurité, Cryptographie]
---

Cette semaine, Apple a annoncé une nouvelle feature dans iOS 15 qui scannera l'album photo des utilisateurs d'iCloud à la recherche de contenus pédo-pornographiques.

J'ai étudié le protocole cryptographique sous-jacent, et je vous propose un article de vulgarisation. 

<div class="gallery-box">
  <div class="gallery">
  <img src="/images/blog/scanning-apple/1425523073806110720-E8hbOeNWQAQ-J41.png" draggable="false">
  <img src="/images/blog/scanning-apple/1425523073806110720-E8hbiZwWUAQ9RPg.png" draggable="false">
  </div>
</div>

Je me suis paluché la publication scientifique d'Apple, 32 pages de notation mathématique assez touffue que je vais me charger de simplifier. Première surprise, le papier est co-écrit par **Dan Boneh**, une pointure en cryptographie (membre émérite de l'IACR, prix Gödel, ...) 

<div class="gallery-box">
  <div class="gallery">
  <img src="/images/blog/scanning-apple/1425523078579331081-E8hcpp3WYAAQeUJ.png" draggable="false">
  </div>
</div>

Comme je le rappelais en réaction à un titre d'article un peu trop clickbait, la détection se fait sur une liste de photos **pré-établie** pour limiter au maximum le risque de faux positifs.

[https://twitter.com/MathisHammel...](https://twitter.com/MathisHammel/status/1423573926240739329)

<blockquote class="twitter-tweet tw-align-center" data-conversation="none" data-dnt="true" data-theme="dark">
  <a href="https://twitter.com/MathisHammel/status/1423573926240739329"></a>
</blockquote>

Le protocole est bien construit, il s'appuie sur trois composants principaux qui assurent une protection de la vie privée, malgré cette intrusion assez directe dans les données perso. J'ai cependant identifié quelques problèmes sur lesquels je reviendrai en fin de thread.

N.B. : on ne se penchera pas sur le 2e mécanisme de protection de l'enfance annoncé par Apple, à savoir la détection de nudité dans les photos envoyées vers/depuis des appareils soumis au contrôle parental. Je n'ai pas la légitimité d'expert en vie privée pour cette analyse. 

<div class="gallery-box">
  <div class="gallery">
  <img src="/images/blog/scanning-apple/1425523089115426824-E8hdpPhWYA0GLUh.png" draggable="false">
  </div>
</div>

On va étudier dans trois mini-chapitres les composants du protocole d'Apple, qui ont chacun des propriétés très intéressantes.

### I. NEURALHASH 

<div class="gallery-box">
  <div class="gallery">
  <img src="/images/blog/scanning-apple/1425523096245706757-E8hxFaHX0AI-3U0.jpg" draggable="false">
  </div>
</div>

NeuralHash est un algorithme de hachage d'images basé sur un réseau de neurones. Ici, pas question d'utiliser un hash cryptographique conventionnel comme SHA256, car il serait possible de contourner la détection en modifiant un seul bit de l'image. 

<div class="gallery-box">
  <div class="gallery">
  <img src="/images/blog/scanning-apple/1425523101924794368-E8hfHMuWEAoecy1.png" draggable="false">
  </div>
</div>

Dans notre protocole, le réseau de neurones est entraîné pour créer un **hash visuel** capable de "comprendre" la structure de l'information et donner le même hash à deux images visuellement identiques, tout en résistant aux transformations comme l'ajout de bruit, le recadrage, la compression, ... 

<div class="gallery-box">
  <div class="gallery">
  <img src="/images/blog/scanning-apple/1425523106832134149-E8hfkKlWUAIWOk8.jpg" draggable="false">
  </div>
</div>

Le réseau transforme une image en un vecteur de nombres. Le réseau est entraîné à partir d'images dérivées d'un ensemble d'images de base. Il produit des vecteurs proches si les deux images ont la même base, et éloigné sinon.

Très similaire à word2vec pour ceux qui connaissent : 

<div class="gallery-box">
  <div class="gallery">
  <img src="/images/blog/scanning-apple/1425523111596859393-E8hg7pLXIAM0bI0.png" draggable="false">
  </div>
</div>

Ce type de hachage existe déjà, avec notamment **PhotoDNA** de Microsoft (qui a d'ailleurs été créé en 2009 pour combattre l'exploitation des mineurs).

J'utilise aussi ce type de réseau de neurones dans un outil que je dévoilerai lors de ma prochaine conférence, à <a href="https://twitter.com/_barbhack_" target="_blank">@_barbhack_</a> ! 😇 

<div class="gallery-box">
  <div class="gallery">
  <img src="/images/blog/scanning-apple/1425523116579635209-E8hhrIKX0AETHMC.jpg" draggable="false">
  </div>
</div>

Les NeuralHashs sont la base du système de détection proposé. Mais les hashs de vos photos ne sont pas transmis directement à Apple pour comparaison avec la base de données d'images illégales, ce serait une entorse au chiffrement end-to-end d'iCloud.

On en reparle au chapitre III 😉

### II. THRESHOLD SECRET SHARING 

<div class="gallery-box">
  <div class="gallery">
  <img src="/images/blog/scanning-apple/1425523123567403008-E8hijq4WUAElWkx.jpg" draggable="false">
  </div>
</div>

Le système de détection d'images pédo-pornographiques envoie à Apple des métadonnées sur les images détectées. En cas de faux positif, Apple pourrait accéder aux métadonnées correspondantes sans raison valable, et c'est pour cette raison qu'un seuil a été mis en place.

En dessous de N correspondances avec la base de données, un mécanisme cryptographique (que les initiés voient venir d'après son nom) empêche de lire les métadonnées. Le nombre N de correspondances nécessaires n'a pas été rendu public (je pense qu'il est entre 3 et 5).

Le principe sous-jacent au Threshold Secret Sharing ne date pas d'hier : en 1979, Adi Shamir (éminent cryptologue, la lettre S du cryptosystème RSA c'est lui) publie son "**Secret Sharing Scheme**" (SSS), qui permet de partager une donnée secrète de manière très élégante. 

<div class="gallery-box">
  <div class="gallery">
  <img src="/images/blog/scanning-apple/1425523131242909698-E8hjiFUWYAk4CXm.png" draggable="false">
  </div>
</div>

Le SSS permet de découper un nombre secret en plusieurs parts, de telle sorte que l'on peut reconstituer le secret d'origine seulement si l'on dispose d'**au moins K parts** (K est un paramètre choisi lors de la création des parts). On va prendre un petit exemple :

Quand je meurs, je veux que ma famille ait accès à mon compte Twitter pour continuer à liker les tweets de <a href="https://twitter.com/plhery" target="_blank">@plhery</a>. Mais pas question de donner à chacun mon mdp dès maintenant ! Je peux donc créer des parts de mon mdp avec un seuil K=3, et j'en donne une à chacun de mes proches. 

<div class="gallery-box">
  <div class="gallery">
  <img src="/images/blog/scanning-apple/1425523136590721026-E8hwJSaWEAI0Cbc.jpg" draggable="false">
  </div>
</div>

À tout moment, il suffira que 3 de mes proches (peu importe lesquels) mettent leurs parts en commun et ils pourront **reconstituer le mdp**. SSS est beaucoup plus fort que de donner à chacun quelques caractères du secret, car ici **n'importe quelle combinaison** de 3 parts fonctionne ! 

<div class="gallery-box">
  <div class="gallery">
  <img src="/images/blog/scanning-apple/1425523141015740422-E8hrP0NWQAgzUeQ.jpg" draggable="false">
  </div>
</div>

Le système Threshold Secret Sharing fonctionne à peu près de la même manière : pour chaque correspondance avec la base de données d'images illégales, l'appareil fait remonter des métadonnées qui sont chiffrées à l'aide d'une clé générée par l'appareil de l'utilisateur. 

<div class="gallery-box">
  <div class="gallery">
  <img src="/images/blog/scanning-apple/1425523145092571143-E8hvqo2XEAQ1FJk.jpg" draggable="false">
  </div>
</div>

Apple n'a initialement pas cette clé et ne peut donc déchiffrer aucune métadonnée. Par contre, avec chaque match remonté est aussi fourni **un fragment SSS** de la clé. Après N rapports remontés, Apple peut donc reconstituer la clé et déchiffrer les métadonnées associées à ceux-ci. 

<div class="gallery-box">
  <div class="gallery">
  <img src="/images/blog/scanning-apple/1425523149395963907-E8hwQbNXsAYkwZ4.jpg" draggable="false">
  </div>
</div>

Un autre mécanisme permet aussi de cacher à Apple le nombre exact de matchs : des matchs "synthétiques" contenant des faux fragments de clés sont produits aléatoirement par tous les appareils, et Apple n'a aucun moyen de distinguer les vrais des faux avant d'en posséder N vrais.

### III. PRIVATE SET INTERSECTION 

<div class="gallery-box">
  <div class="gallery">
  <img src="/images/blog/scanning-apple/1425523155343380481-E8hw1kJXIAIq9J1.jpg" draggable="false">
  </div>
</div>

Dans les deux précédents chapitres, on a étudié comment les images étaient comparées de manière fiable, et comment les matchs dans la base d'images étaient masqués avant d'avoir atteint un seuil. Mais le vrai coeur du protocole c'est PSI, ou **Private Set Intersection**.

Il y a plusieurs considérations à prendre en compte :

- Apple ne veut pas dévoiler la liste d'images recherchées (sûrement pour éviter les contournements)
- On ne doit pas divulguer à Apple la moindre info sur les images non-illégales d'un utilisateur, pas même leur NeuralHash

Ce problème semble impossible à résoudre : Apple et l'utilisateur ont chacun une liste de NeuralHashs et on cherche à savoir quels sont ceux qui sont en commun, sans que l'un divulgue à l'autre la moindre information sur ses propres NeuralHashs. Et pourtant, PSI le fait !

Apple commence par calculer les NeuralHashs des images qui l'intéressent, puis les place dans un tableau (spécifiquement une cuckoo table, pour éviter les collisions). L'index du NeuralHash dans le tableau est calculé à partir de sa valeur uniquement. 

<div class="gallery-box">
  <div class="gallery">
  <img src="/images/blog/scanning-apple/1425524714626224140-E8h56gnXMAMdSDz.jpg" draggable="false">
  </div>
</div>

Ces NeuralHashs sont ensuite masqués (blinded) à l'aide d'une clé détenue par Apple, mais ils gardent leur index dans la table. Les autres index non utilisés sont remplis de **hashs aléatoires**, pour ne pas révéler quels sont les index qui intéressent Apple. 

<div class="gallery-box">
  <div class="gallery">
  <img src="/images/blog/scanning-apple/1425524718468272129-E8h6CYOXoAsJdKL.jpg" draggable="false">
  </div>
</div>

Ce tableau est transmis aux appareils des utilisateurs. La première contrainte (ne pas dévoiler les images recherchées) est respectée, car l'utilisateur n'a aucun moyen de retrouver les NeuralHashs de la liste d'Apple sans posséder également la clé de masquage tenue secrète.

Pour établir les correspondances entre les photos de l'utilisateur et celles recherchées sans connaître la liste de ces dernières, l'utilisateur va en fait envoyer des informations sur TOUTES ses photos, mais Apple ne saura déchiffrer **que celles qui correspondent à sa liste**.

Chacune des photos va donc être traitée de la manière suivante : on calcule d'abord une clé de chiffrement basée à la fois sur le NeuralHash de l'image et sur le NeuralHash masqué à l'index associé (qui potentiellement ne correspondra pas, si l'image n'est pas dans la base). 

<div class="gallery-box">
  <div class="gallery">
  <img src="/images/blog/scanning-apple/1425524726013829120-E8h6PldXMAQ-Ck6.jpg" draggable="false">
  </div>
</div>

Cette clé nous sert à chiffrer le duo de {métadonnées image + fragment de clé des métadonnées} dont on parlait au chapitre précédent sur le Threshold Secret Sharing. Ces infos chiffrées sont transmises au serveur d'Apple avec une sous-partie de la clé du tweet précédent. 

<div class="gallery-box">
  <div class="gallery">
  <img src="/images/blog/scanning-apple/1425524730279387136-E8h6WIpWEAM4WSi.jpg" draggable="false">
  </div>
</div>

Des propriétés super chouettes des courbes elliptiques permettent à Apple de reconstituer la clé à partir de la sous-partie qui lui est transmise, à condition que celle-ci ait bien été générée à partir d'un NeuralHash et de sa version masquée correspondante. 

<div class="gallery-box">
  <div class="gallery">
  <img src="/images/blog/scanning-apple/1425524734339518468-E8h6brUX0AgGOeS.jpg" draggable="false">
  </div>
</div>

Ainsi, on s'assure de deux choses :

- Le message ne peut être déchiffré que si le NeuralHash fait aussi partie de la liste d'Apple
- Apple ne peut pas tricher en ajoutant un NeuralHash à sa liste a posteriori, car le hash masqué est pris dans la liste au moment du calcul de clé

Pour résumer, le protocole d'Apple est basé sur une sécurité à deux couches : un message ne peut être déchiffré que si l'image correspond à un hash recherché, et la clé permettant de déchiffrer les métadonnées de ces matchs n'est récupérée qu'après N correspondances avérées.

### EPILOGUE 

<div class="gallery-box">
  <div class="gallery">
  <img src="/images/blog/scanning-apple/1425524741490847748-E8h6tqvXIAcQbFK.jpg" draggable="false">
  </div>
</div>

On peut cependant relever plusieurs **risques opérationnels** sur le protocole proposé par Apple.

La première attaque qui me vient à l'esprit est basée sur des **attaques antagonistes** contre NeuralHash. En effet, il est généralement simple de faire dire ce que l'on veut à un réseau de neurones avec un input malicieux bien calculé. 

<div class="gallery-box">
  <div class="gallery">
  <img src="/images/blog/scanning-apple/1425524747522166796-E8h7CLpWYAUvMZn.jpg" draggable="false">
  </div>
</div>

Il suffirait donc de forger des images d'apparence tout à fait inoffensive qui auraient le même NeuralHash que des images pédo-pornographiques recherchées par Apple, et de les envoyer à son ennemi juré pour déclencher une enquête à son encontre.

Second problème, bien plus important : seul Apple connaît les images qui composent sa base de données. Qui contrôle que ce sont effectivement des contenus pédo-pornographiques et non des images d'opposition politique ou de contenu pro-LGBT (jugé illégal dans plusieurs pays) ?

Dans cette même veine, qui garantit que cette liste est **la même pour tout le monde** et qu'un gouvernement autoritaire ne peut pas forcer Apple à modifier sa liste sous peine de sanctions ?

À mon avis, il est vital d'avoir des observateurs tiers sur ce système, et il semblerait qu'Apple ne prévoit pas cette supervision externe. L'opacité de la liste de fichiers offre certes des avantages contre le contournement des filtres, mais c'est aussi un danger.

Pour conclure, la cryptographie du protocole PSI est effectivement un très bon système pour assurer la protection de l'enfance sans empiéter sur la vie privée (pour relativiser avec la censure de WeChat : [https://citizenlab.ca/2020/05/we...](https://citizenlab.ca/2020/05/we-chat-they-watch/)), mais il est imparfait et manque de garde-fous.

