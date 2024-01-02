---
layout: post
title:  "Une faille critique a été découverte dans OpenSSL"
date:   2022-10-31 18:08:22 +0100
image:  '/images/blog/faille-openssl/header.png'
tags:   [Cybersécurité, Cryptographie]
---

Demain c'est jour férié, enfin l'occasion de se reposer un peu ? Pas si vous travaillez dans l'informatique !

Une **vulnérabilité de sécurité critique** vient d'être annoncée et vous allez sûrement devoir mettre à jour vos systèmes en urgence 🙃

Même si vous n'en avez peut-être jamais entendu parler, vous utilisez **OpenSSL** tous les jours : c'est un logiciel qui gère le chiffrement d'une immense majorité des connexions HTTPS sur internet.

La fondation OpenSSL a annoncé il y a quelques jours la découverte d'une faille dans son code source, dont les détails et le correctif seront publiés demain dans l'après midi.

La dernière fois qu'une faille critique a été découverte dans ce logiciel, c'était il y a 8 ans avec une vulnérabilité très célèbre connue sous le nom **HeartBleed**. 

<div class="gallery-box">
  <div class="gallery">
  <img src="/images/blog/faille-openssl/1587129371730612226-FgadNp4XEAMWLQ7.png" draggable="false">
  </div>
</div>

HeartBleed utilisait une faille sur l'implémentation d'un nouveau protocole dans OpenSSL appelé HeartBeat.

L'attaque permettait à n'importe qui de récupérer très simplement des données contenues dans la RAM du serveur, notamment des **mots de passe et des clés privées**. 

<div class="gallery-box">
  <div class="gallery">
  <img src="/images/blog/faille-openssl/1587129377313230848-FgaWDlQXkAEbWfp.png" draggable="false">
  <img src="/images/blog/faille-openssl/1587129377313230848-FgaWHaeWAAEt-KD.png" draggable="false">
  </div>
</div>

On ne sait pas exactement à quoi s'attendre demain, très peu de détails sont publics pour éviter que des attaquants ne mettent la main dessus en avance.

Mais tout laisse à penser qu'il ne faudra pas perdre de temps pour patcher 😅 

<div class="gallery-box">
  <div class="gallery">
  <img src="/images/blog/faille-openssl/1587129381155213325-FgadVG1WQAI4Z7R.png" draggable="false">
  </div>
</div>

En effet, une faille critique présente généralement ces aspects :

- Compromission totale du système

- Simplicité de mise en œuvre

- Exploitable à distance et sans authentification

- Pas besoin d'action spéciale de la victime

- Probabilité élevée d'exploitation dans la nature 

<div class="gallery-box">
  <div class="gallery">
  <img src="/images/blog/faille-openssl/1587129384854605824-Fgadc9eXEAAXxys.png" draggable="false">
  </div>
</div>

Alors on a quand même une bonne nouvelle : OpenSSL a annoncé que la version 3.0 était vulnérable, mais **pas la 1.1.1** qui est encore utilisée sur beaucoup de systèmes.

3.0 est sortie en 2021 donc seulement les installations récentes sont affectées. 

<div class="gallery-box">
  <div class="gallery">
  <img src="/images/blog/faille-openssl/1587129388562251777-FgadlDnWIAIDyo7.png" draggable="false">
  </div>
</div>

Pour vérifier si votre système est vulnérable, utilisez la commande `openssl version` : si vous avez une version **entre 3.0.0 et 3.0.6**,** faites la mise à jour vers 3.0.7 dès qu'elle sort !

Pour conclure, même si le timing n'est pas vraiment idéal pour nous (le 1er novembre n'est pas férié aux USA), c'est toujours mieux que l'annonce surprise de la faille Log4Shell à quelques jours des fêtes de fin d'année en 2021 !

<blockquote class="twitter-tweet tw-align-center" data-conversation="none" data-dnt="true" data-theme="dark">
  <a href="https://twitter.com/MathisHammel/status/1469719525671194626"></a>
</blockquote>

N'hésitez pas à partager cet article pour ruiner la semaine de vos amis RSSI et sysadmin 😇

Merci à deux amis qui ont indirectement contribué :

- <a href="https://twitter.com/GuillaumeAssier" target="_blank">@GuillaumeAssier</a> qui a tweeté sur le sujet et m'a fait découvrir cette actu
- <a href="https://twitter.com/louanben" target="_blank">@louanben</a>, le créateur d'@EmojiMashupBot que j'ai utilisé pour l'illustration de l'article

Allez follow sans hésiter !

