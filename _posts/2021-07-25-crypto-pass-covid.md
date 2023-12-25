---
layout: post
title:  "La cryptographie du pass sanitaire COVID expliquée"
date:   2021-07-25 14:07:15 +0200
image:  '/images/blog/crypto-pass-covid/header.png'
tags:   [Cybersécurité, Cryptographie]
---

Aujourd'hui, je vous explique pourquoi on ne peut pas fabriquer son propre QR code de vaccination COVID.

Comme je le disais dans des interviews récentes avec <a href="https://twitter.com/libe" target="_blank">@libe</a> et <a href="https://twitter.com/Numerama" target="_blank">@Numerama</a>, le pass sanitaire est signé numériquement, ce qui le rend théoriquement **impossible à falsifier**.

Mais qu'est-ce que c'est que cette signature, et pourquoi on ne peut pas juste l'imiter ? 

<div class="gallery-box">
  <div class="gallery">
<video style="height:350px; object-fit:cover" autoplay loop>  <source src="/images/blog/crypto-pass-covid/1419268017242918913-E7JAu9zXMAA2bR9.mp4" type="video/mp4"></video>  </div>
</div>

Tout d'abord, on va prendre un exemple que j'utilise souvent pour illustrer la signature cryptographique : vous allez à la mairie pour faire certifier un document papier.

Ce scénario de la vie réelle a de nombreux parallèles avec les signatures numériques !

Quand vous allez faire certifier une signature en mairie, vous apportez un document déjà rempli et signé, et l'agent de mairie appose un **tampon officiel** de la ville. (Je l'ai déjà fait quelques fois, ils ont une presse pour imprimer le logo en relief dans le papier c'est très cool) 

<div class="gallery-box">
  <div class="gallery">
  <img style="height:350px; object-fit:cover" src="/images/blog/crypto-pass-covid/1419268024998277120-E7IbVg3WEAMgfxn.png" draggable="false">
  </div>
</div>

Pourquoi peut-on faire confiance à ce processus de certification en mairie ? Parce qu'il est **difficile à falsifier**.

Pour obtenir un document certifié de manière illégitime, plusieurs options (toutes difficiles) :

- Voler le tampon de certification
- Corrompre un employé de mairie
- Créer une copie parfaite du tampon
- Voler le document certifié de quelqu'un d'autre

Le pass sanitaire, c'est quasiment la même chose, mais en version numérique et encore plus sécurisé !

Au lieu d'un cachet à l'encre sur un document papier, l'administration va apposer ce qu'on appelle une **signature cryptographique**.

Ce genre de signature, on les utilise en permanence dans le monde numérique. 

C'est par exemple ce que votre ordi utilise dans le protocole **HTTPS** (le petit cadenas !) pour vérifier que votre interlocuteur est bien twitter‍.com et non un attaquant qui intercepte le trafic réseau. 

<div class="gallery-box">
  <div class="gallery">
  <img style="height:350px; object-fit:cover" src="/images/blog/crypto-pass-covid/1419268036171866114-E7IicuWWUAQyljH.png" draggable="false">
  </div>
</div>

Entrons enfin dans le vif du sujet : une signature cryptographique, comment ça marche ?

Tout d'abord, on va parler des clés asymétriques. On a deux clés A et B, liées par des propriétés mathématiques (je vous passe les détails) et **complémentaires l'une de l'autre**. 

<div class="gallery-box">
  <div class="gallery">
  <img style="height:350px; object-fit:cover" src="/images/blog/crypto-pass-covid/1419268038399086592-E7I3oHeX0AExDRe.jpg" draggable="false">
  </div>
</div>

(j'en profite pour signaler que j'assume pleinement mon design graphique pas génial fait avec Paint, mais désolé pour le choix de couleurs qui n'est sûrement pas top pour l'accessibilité)

Ces deux clés sont utilisées pour transmettre des informations entre les détenteurs de ces deux clés, de manière chiffrée (les non-initiés disent souvent "crypté", mais en réalité ce mot n'existe pas !

Si vous comprenez ce schéma, vous avez fait le plus dur 😉 

<div class="gallery-box">
  <div class="gallery">
  <img style="height:350px; object-fit:cover" src="/images/blog/crypto-pass-covid/1419268045508390916-E7I3uMSXoAIPDeM.jpg" draggable="false">
  </div>
</div>

"Mais dis-moi Jamy, comment on utilise ces clés pour vérifier la validité du pass sanitaire ?"

Eh bien c'est tout simple : l'entité qui crée le certificat (en France c'est l'Assurance Maladie) **garde la clé A** et **distribue publiquement la clé B** à tout le monde.

Dans ce mode de fonctionnement (qui est de loin le plus répandu en cryptographie asymétrique), on utilise les termes "**clé privée**" et "**clé publique**".

Ensuite, voici comment se déroule la création d'un certificat de vaccination : 

<div class="gallery-box">
  <div class="gallery">
  <img style="height:350px; object-fit:cover" src="/images/blog/crypto-pass-covid/1419268053922160640-E7I3zbNWEAYcvqf.jpg" draggable="false">
  </div>
</div>

Ici, seule l'Assurance Maladie est en mesure de créer des attestations car c'est la seule à détenir la clé privée.

Pour vérifier la validité d'un pass sanitaire, l'appli TousAntiCovid Vérif utilise la clé publique, qui est commune à tous et disponible publiquement. 

<div class="gallery-box">
  <div class="gallery">
  <img style="height:350px; object-fit:cover" src="/images/blog/crypto-pass-covid/1419268058972147713-E7I35ScWUAMNNkb.jpg" draggable="false">
  </div>
</div>

Et la seule manière de créer une donnée qui se déchiffre correctement avec la clé publique, c'est de **posséder la clé privée** correspondante. Donc tant que la clé privée de l'Assurance Maladie reste entre de bonnes mains, impossible de fabriquer soi-même un pass sanitaire !

Pour en revenir au parallèle de la certification de signature, ici le tampon magique c'est la clé privée, qui permet de certifier de manière sûre la provenance du certificat ! 

<div class="gallery-box">
  <div class="gallery">
  <img style="height:350px; object-fit:cover" src="/images/blog/crypto-pass-covid/1419268066525995014-E7I4vphWUAASLjM.png" draggable="false">
  </div>
</div>

Les 4 attaques du système papier se retrouvent sur la signature électronique. Pour obtenir un pass sanitaire illégitime, on peut :

- Voler la clé privée
- Corrompre un personnel de vaccination
- Créer une copie parfaite de la clé privée
- Copier le pass sanitaire de qqn d'autre

Voler la clé privée relève du quasi-impossible vu les protections mises en place.

Il est théoriquement possible de recréer la clé privée à partir de la clé publique, mais ça prendrait des **milliards d'années** même sur le plus puissant des supercalculateurs ! 

<div class="gallery-box">
  <div class="gallery">
<video style="height:350px; object-fit:cover" autoplay loop>  <source src="/images/blog/crypto-pass-covid/1419268080723714052-E7JAyoQWYAYo2N-.mp4" type="video/mp4"></video>  </div>
</div>

Donc les deux options qui restent sont de corrompre un soignant ou de voler le pass de quelqu'un d'autre, mais ces problèmes ne relèvent pas de la cybersécurité et sont difficiles à éliminer quel que soit le système (papier ou électronique) choisi 😉

J'en profite pour répondre également à une interrogation fréquente à propos du pass sanitaire : à quel point les données personnelles des utilisateurs sont-elles exposées ?

De par sa nature, le certificat de vaccination DOIT contenir des informations personnelles sur son détenteur, sinon l'appli TAC Vérif ne dispose d'aucune info à afficher lors du contrôle. Les données stockées sont les suivantes (ici 2D-DOC, mais le format DCC🇪🇺 est similaire) : 

<div class="gallery-box">
  <div class="gallery">
  <img style="height:350px; object-fit:cover" src="/images/blog/crypto-pass-covid/1419268089498284032-E7I8jhoXIAE4ynf.png" draggable="false">
  </div>
</div>

N'importe qui pouvant scanner votre QR code peut donc récupérer ces quelques infos, mais le vrai risque est que cette personne pourra surtout créer une copie de votre pass sanitaire pour le revendre à des antivax... (retrouvez mon [précédent article](/blog/leak-pass-covid) à ce sujet).

L'avantage majeur offert par ce système de signature est que la validation d'un certificat est décentralisée et hors-ligne dans TousAntiCovid Vérif, sans utiliser un serveur central.

Ainsi, vous ne laissez aucune trace de quand, où, ni combien de fois vous utilisez votre pass.

Merci d'avoir suivi cet article !

