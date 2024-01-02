---
layout: post
title:  "Analyse de la panne réseau qui a cassé Facebook"
date:   2021-10-05 09:18:12 +0200
image:  '/images/blog/panne-facebook/header.png'
tags:   [Divers]
---

Hier, une panne massive a affecté Facebook et plein de ses services (Instagram, WhatsApp, Messenger, ...)

Mais **il s'est passé quoi** au juste ?

<div class="gallery-box">
  <div class="gallery">
  <img src="/images/blog/panne-facebook/1445287188019752962-FA6xCdoXEAARzZI.jpg" draggable="false">
  </div>
</div>

On va en profiter pour présenter les protocoles **BGP** et **DNS**, que vous connaissez peut-être déjà. Ces deux loustics sont un support indispensable du réseau internet mondial, mais ils ont causé pas mal de soucis chez Facebook hier.

Tout d'abord, parlons DNS, ou Domain Name Service.

Le DNS, c'est toute une organisation qui vous permet de retenir des adresses faciles comme facebook‍.com au lieu de devoir mémoriser l'adresse IP de chaque service que vous utilisez. 

<div class="gallery-box">
  <div class="gallery">
  <img src="/images/blog/panne-facebook/1445287194491604993-FA6xC17WEAIFcUh.jpg" draggable="false">
  </div>
</div>

En effet, les adresses comme facebook‍.com (appelées nom de domaine) ne sont pas compréhensibles par les protocoles réseau basés sur des adresses IP.

C'est un peu comme si vous essayiez de téléphoner à quelqu'un en ayant juste son nom : le réseau a besoin du numéro de téléphone.

Pour le réseau téléphonique, vous pouvez chercher dans un annuaire. Quand il s'agit de traduire des noms de domaine internet vers des adresses IP, **cet annuaire s'appelle le DNS** !

Mais internet est un réseau complexe et l'annuaire est réparti sur de très nombreux serveurs. 

<div class="gallery-box">
  <div class="gallery">
  <img src="/images/blog/panne-facebook/1445287200678191106-FA6xDK1XoAI4fZ3.jpg" draggable="false">
  </div>
</div>

Chaque serveur DNS va contenir une partie de l'information globale de cet annuaire géant.

Il est possible d'avoir des informations dupliquées, mais généralement il y a un seul serveur qui fait autorité sur un domaine donné.

Par exemple, tous les noms de domaine qui se terminent en ".fr" descendent du TLD (domaine de premier niveau) de la France administré par l'AFNIC. Le serveur DNS de l'AFNIC sait indiquer où trouver l'adresse IP de n'importe lequel de ses sous-domaines ".fr". 

<div class="gallery-box">
  <div class="gallery">
  <img src="/images/blog/panne-facebook/1445287206235553793-FA6xDhKXEAIUA0H.jpg" draggable="false">
  </div>
</div>

Le serveur du TLD ne mémorise pas les adresses IP de chacun de ses sous-domaines, mais sait indiquer où trouver cette info.

Si par exexmple vous achetez un domaine chez OVH, c'est en fin de chaîne le serveur OVH qui distribuera l'info de la correspondance domaine-&gt;IP. 

<div class="gallery-box">
  <div class="gallery">
  <img src="/images/blog/panne-facebook/1445287209855225860-FA6xDvXXIAUdMG7.jpg" draggable="false">
  </div>
</div>

Facebook gère **ses propres serveurs DNS** : les noms de domaine comme facebook‍.com ou instagram‍.com sont achetés directement auprès de Verisign (l'entreprise qui gère le registre .com à la manière de l'AFNIC), et ils administrent un serveur DNS maison.

Si ce serveur DNS venait à tomber en panne, c'est tous les sites associés qui deviendraient **inaccessibles** car plus personne ne pourrait convertir leurs noms de domaine en adresses IP. Et c'est ce qui s'est passé hier.

Pourtant, le DNS de Facebook est resté en marche hier, et la panne ne provient pas de lui.

C'est simplement que plus personne ne pouvait lui parler, comme s'il avait été **coupé d'internet** : le vrai coupable se situe au niveau du protocole BGP.

BGP, c'est le Border Gateway Protocol. Il est moins connu que le DNS car très peu de personnes y ont un accès direct : c'est un protocole qui permet de déterminer quel chemin va prendre un paquet qui transite dans les câbles et fibres optiques du réseau internet.

Pour aller d'un point A (votre box) vers un point B (le serveur de Facebook), le paquet peut emprunter une infinité de chemins différents.

Le protocole BGP sert à **cartographier le réseau global** afin de choisir le meilleur chemin (souvent le plus court) pour chaque paquet. 

<div class="gallery-box">
  <div class="gallery">
  <img src="/images/blog/panne-facebook/1445287220089401344-FA6xEUEWQAAQuG5.jpg" draggable="false">
  </div>
</div>

De la même manière que pour le DNS, le protocole BGP fonctionne de manière décentralisée pour pouvoir s'adapter très rapidement en cas de changement. Au lieu d'avoir des milliers de serveurs DNS, on parle ici d'Autonomous Systems (ou AS).

Les AS représentent des groupes d'appareils appartenant au réseau internet global. Le trafic entre ces différents AS est régi par le protocole BGP. Celui-ci n'est utilisé qu'entre les AS, et c'est pourquoi il est rare d'y avoir affaire si on n'est pas un FAI !

La finalité de BGP, au delà de savoir quel chemin prendre, c'est de pouvoir déterminer chez quel AS est hébergé une adresse IP donnée : on va ici encore avoir affaire à des annuaires distribués.

Pour BGP, pas de hiérarchie stricte comme pour les noms de domaine ! Il est possible qu'un AS réussisse à s'attribuer des adresses IP qui ne lui reviennent pas réellement, pouvant causer des détournements de paquets à échelle mondiale.

Ici avec YouTube et Pakistan Telecom, 2008: 

<div class="gallery-box">
  <div class="gallery">
  <img src="/images/blog/panne-facebook/1445287229367148545-FA6xE1KWQAk6Gy9.jpg" draggable="false">
  </div>
</div>

Le problème de Facebook, c'était tout le contraire : ils ont accidentellement **supprimé leurs propres adresses IP** dans l'annuaire BGP de leur AS.

Du coup, aucun AS ne savait où envoyer les paquets correspondant aux IPs de Facebook, à commencer par l'IP de leur serveur DNS 😕

Il semblerait donc que la panne ait affecté tous les serveurs de Facebook, mais la première erreur rencontrée lors de la connexion se faisait au moment des requêtes DNS.

C'est pour ça que le DNS a été identifié (à tort) comme fautif dans l'affaire par de nombreuses sources. 

<div class="gallery-box">
  <div class="gallery">
  <img src="/images/blog/panne-facebook/1445287235885142020-FA6xFMcWEAIyqp9.jpg" draggable="false">
  </div>
</div>

Pour finir, la durée exceptionnelle de la panne (plus de 6h) semble liée à deux facteurs :

Premièrement, Facebook a adopté depuis le début de la crise sanitaire une posture très favorable au télétravail, ce qui a probablement ralenti le retour sur site pour cette intervention. 

<div class="gallery-box">
  <div class="gallery">
  <img src="/images/blog/panne-facebook/1445287240557645827-FA6xFf1WUAMN6TU.jpg" draggable="false">
  </div>
</div>

Mais surtout, une grande partie des IPs de Facebook s'est retrouvée coupée du reste d'internet : on peut penser aux emails, badges d'accès aux datacenters, systèmes d'astreinte, accès distant aux serveurs, ...

Pas simple de gérer une crise à distance sans connexion internet ! 

<div class="gallery-box">
  <div class="gallery">
  <img src="/images/blog/panne-facebook/1445287246999994368-FA6xF1tX0AgkadY.jpg" draggable="false">
  </div>
</div>

J'espère que cet article vous a plu, pour moi c'est toujours un plaisir de trouver une approche de vulgarisation pour aborder des sujets techniques complexes 😊

Et je pense que cette panne massive peut nous donner quelques leçons d'ingénierie :

- même avec un budget de GAFAM, on trouve toujours un moyen de se planter
- la solidité d'un système est limitée par la solidité de son maillon le plus faible (en DevOps comme en cyber !)

Et j'en profite pour ajouter que je suis loin d'être un expert en la matière : comme on dit, "jack of all trades, master of none". Mais si le sujet vous intéresse, je vous invite fortement à jeter un oeil aux profils des excellents <a href="https://twitter.com/acontios_net" target="_blank">@acontios_net</a> et <a href="https://twitter.com/AtaxyaNetwork" target="_blank">@AtaxyaNetwork</a> !

