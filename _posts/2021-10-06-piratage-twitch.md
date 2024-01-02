---
layout: post
title:  "L'impact du piratage de Twitch sur votre sécurité perso"
date:   2021-10-06 19:27:21 +0200
image:  '/images/blog/piratage-twitch/header.png'
tags:   [Cybersécurité]
---

Aujourd'hui, Twitch s'est fait pirater et une grande partie de ses fichiers sont dans la nature.

Ça veut sûrement dire que votre mot de passe est compromis et qu'il faut le changer. Mais ⚠️ attention, ce changement peut poser un risque cyber.

<div class="gallery-box">
  <div class="gallery">
  <img src="/images/blog/piratage-twitch/1445802873087041538-FBBlzEbVgBIViSo.jpg" draggable="false">
  </div>
</div>

On va faire le focus sur un aspect tech intéressant pour comprendre. Aujourd'hui : comment on sécurise une **base de données contenant des mots de passe**.

Le code source de Twitch et les mots de passe ne semblent pas concernés dans la partie 1 du leak, mais on peut quand même deviner pas mal de choses.

Pour stocker des mots de passe dans une appli web, on utilise une base de données, comme on le fait généralement pour tout ce qui se rapporte aux comptes utilisateur.

La méthode la plus simple est de stocker directement le mot de passe de l'utilisateur : 

<div class="gallery-box">
  <div class="gallery">
  <img src="/images/blog/piratage-twitch/1445802878807908364-FBBmjyEVEBAJmFm.jpg" draggable="false">
  </div>
</div>

Dans l'image ci-dessus, le mot de passe est transmis "en clair" entre l'utilisateur, le serveur et la base de données.

Le mdp est quand même en sécurité car il transite via une connexion **HTTPS** (flèche verte) puis dans des flux **internes aux serveurs** (flèche bleue).

Pour authentifier un utilisateur, c'est tout simple : on récupère en base de données le mot de passe de l'utilisateur qui essaie de se connecter, et on le compare avec le mot de passe fourni. Si c'est le même, alors on le laisse entrer. 

<div class="gallery-box">
  <div class="gallery">
  <img src="/images/blog/piratage-twitch/1445802884684263426-FBBn7sJUUAcaMKO.jpg" draggable="false">
  </div>
</div>

Mais le problème, c'est que cette sécurité n'est que théorique : en exploitant une faille (par exemple une injection SQL), un hacker peut arriver à récupérer tout le contenu de la base de données.

Et c'est critique car vos infos de connexion peuvent être revendues derrière.

En plus, si vous utilisez ce mdp sur un autre site (email, banque, etc.), l'attaquant peut également en prendre possession pour vous voler des données ou de l'argent, ou les revendre (oui, c'est de là que viennent les comptes Spotify et Netflix pas chers des vendeurs douteux) 

<div class="gallery-box">
  <div class="gallery">
  <img src="/images/blog/piratage-twitch/1445802890296127489-FBBtejWVQAgyXky.png" draggable="false">
  </div>
</div>

Heureusement il existe une méthode pour éviter de garder tous les mots de passe dans la base de données sans perte de fonctionnalité : le **hachage** (ou hashing en anglais).

Vous avez peut-être entendu parler de MD5 ou SHA1, ce sont les algorithmes de hachage les plus répandus.

Le hachage, c'est une transformation d'une donnée informatique pour condenser l'information en un identifiant unique de quelques octets, le hash. 

Une même donnée en entrée donnera toujours le même hash en sortie. Ici, quelques exemple de hashs calculés avec l'algorithme SHA1 : 

<div class="gallery-box">
  <div class="gallery">
  <img src="/images/blog/piratage-twitch/1445802896851750921-FBBxRaOWQAAc_W0.png" draggable="false">
  </div>
</div>

Une propriété de certains algos de hachage dits "cryptographiques" est que cette transformation est à sens unique : à partir d'un hash, **impossible de retrouver la donnée d'origine** à moins d'essayer plein de possibilités en espérant trouver la bonne (on appelle ça du **bruteforce**). 

<div class="gallery-box">
  <div class="gallery">
  <img src="/images/blog/piratage-twitch/1445802901457104901-FBB_pMBWUAAuujT.jpg" draggable="false">
  </div>
</div>

Et une grande utilité du hachage cryptographique est justement de sécuriser le stockage de mots de passe !

Le mot de passe en clair ne figure jamais dans les bases de données, on le substitue par sa version hachée. 

<div class="gallery-box">
  <div class="gallery">
  <img src="/images/blog/piratage-twitch/1445802905840148491-FBBzeU2VIA0nygM.jpg" draggable="false">
  </div>
</div>

Quand un utilisateur souhaite s'authentifier, il fournit son mot de passe en clair au serveur, qui calcule le hash à son tour et le compare avec celui stocké en base de données. 

<div class="gallery-box">
  <div class="gallery">
  <img src="/images/blog/piratage-twitch/1445802912282648585-FBB083vVUAcA5Fi.jpg" draggable="false">
  </div>
</div>

Cette méthode de stockage protège mieux le mot de passe des utilisateurs en cas de leak de la base de données, car la transformation à sens unique du hachage ne permet pas de retrouver le mot de passe sans avoir recours à du bruteforce.

Si votre mot de passe haché se retrouve dans la nature, on peut le retrouver dans des tables de bruteforce pré-calculées (rainbow tables) qui se trouvent sur internet. Par exemple, essayez de retrouver le mot de passe dont le hash SHA1 est 90ed70cfe8451db1599b26a6338ed5fd0bca5151

Ces rainbow tables sont basées sur des **mots de passe faibles**, et parfois des dictionnaires gigantesques provenant de mots de passe ayant fuité en clair. Même si votre mot de passe est complexe, il n'est pas forcément sécurisé ! 

<div class="gallery-box">
  <div class="gallery">
  <img src="/images/blog/piratage-twitch/1445802920331526162-FBB4iBMXMAI1zao.png" draggable="false">
  </div>
</div>

Pour aller un cran plus loin, on peut utiliser des fonctions telles que bcrypt ou PBKDF2 : 

- elles sont volontairement longues à calculer (contre le bruteforce)
- elles ont un paramètre unique appelé "sel" rendant chaque hash non réutilisable (contre les rainbow tables)

Ok, on peut donc stocker les mots de passe de ses utilisateurs de manière sécurisée, et c'est probablement ce que fait Twitch.

Mais alors pourquoi je vous ai dit en début de thread que ça posait un risque de changer son mdp sur Twitch ? 🤔

Utiliser un hachage fort protège effectivement si la base de données fuite.

Dans le cas de Twitch, il semblerait que les attaquants aient eu accès à l'intégralité des données de l'entreprise, donc ils ont probablement **accès à tous les systèmes informatiques**. 

<div class="gallery-box">
  <div class="gallery">
<video autoplay loop>  <source src="/images/blog/piratage-twitch/1445802944402702336-FBCGGx-UYAsopj5.mp4" type="video/mp4"></video>  </div>
</div>

Souvenez-vous du schéma d'authentification : le serveur reçoit toujours le mot de passe **en clair**, c'est très rare que le hachage se fasse côté utilisateur.

Il suffit donc à l'attaquant d'installer une backdoor bien placée pour intercepter le mdp de tous ceux qui se connectent ! 

<div class="gallery-box">
  <div class="gallery">
  <img src="/images/blog/piratage-twitch/1445802949133967364-FBB8Y-PXsAIcjEV.jpg" draggable="false">
  </div>
</div>

Il est probable que les auteurs du piratage de Twitch conservent actuellement un accès discret aux serveurs, et on ne peut pas non plus exclure l'installation de backdoors de ce type pour voler les données des utilisateurs même après le retour à la normale.

👉Pour résumer la situation actuelle la plus probable de Twitch :

- Les hashs de mdp de tous les utilisateurs sont aux mains des hackers
- Ceux qui se connectent ou changent leur mdp après l'attaque font potentiellement aussi fuiter leur mdp en clair

Normalement pas de souci à se faire, si vous suivez les bonnes pratiques.

Utilisez un mot de passe FORT et UNIQUE sur chaque site, pour limiter les fuites à Twitch et ne pas vous faire compromettre d'autres comptes au passage. Activez l'authentification SMS là où c'est possible. 

<div class="gallery-box">
  <div class="gallery">
  <img src="/images/blog/piratage-twitch/1445802960517095425-FBCBOiuUcAII_8o.jpg" draggable="false">
  </div>
</div>

Si ce n'est pas déjà le cas, je vous recommande aussi d'installer un gestionnaire de mots de passe : perso j'utilise Keepass et Dashlane, les deux sont cool et marchent bien. C'est la seule manière d'avoir des mdp forts et uniques.

J'espère que cet article vous a plu, comme d'habitude j'ai profité d'une actu pour vous apprendre un sujet tech à votre insu 😈

N'hésitez pas à partager si vous pensez que ça peut intéresser votre entourage ! Et si vous avez des questions, je me ferai un plaisir d'y répondre 😀

