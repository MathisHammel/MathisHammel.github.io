---
layout: post
title:  "Reverse-engineering et problèmes juridiques autour de l'appli Crush"
date:   2024-02-08 19:23:36 +0100
image:  '/images/blog/securite-crush/header.jpg'
tags:   [Cybersécurité]
---

Je me suis intéressé à la cybersécurité de **Crush**, l'appli de rencontres pour **10-21 ans (!)** qui fait beaucoup de bruit en ce moment.

J'y ai découvert un réseau de sociétés fictives qui récolte activement les données de dizaines de milliers de mineur·es. Explications ⤵️ 

<div class="gallery-box">
  <div class="gallery">
  <img src="/images/blog/securite-crush/1722318972605903241-F-bmZzOWwAAHWt3.png" draggable="false">
  </div>
</div>

# PARTIE 1. Le fonctionnement de l'appli

Crush est une appli dont le but est de découvrir ses admirateurs secrets au collège/lycée. 

Elle a été renommée "Friendzy, sondages entre amis" depuis son bad buzz.

Le principe est simple : après avoir ajouté vos amis sur l'appli, vous répondez à des questions sur vos liens d'amitié.

Dans un autre onglet, vous pouvez savoir ce que les gens ont répondu sur vous, sans voir leur nom. 

<div class="gallery-box">
  <div class="gallery">
  <img src="/images/blog/securite-crush/1722318977555194056-F-bmjR_W8AAxL-P.png" draggable="false">
  </div>
</div>

Crush est une copie quasi identique de l'appli américaine **Gas** (qui s'appelait d'ailleurs Crush à l'origine !). Gas était #1 des stores fin 2022 avec plus de 30 000 inscriptions par heure, mais a fermé ses portes il y a quelques semaines : une opportunité en or pour lancer Crush.

# PARTIE 2. Une application sécurisée ?

Avant de vous annoncer les mauvaises nouvelles (😇), je vais commencer par quelques points positifs quant à la sécurité des utilisateurs de l'appli.

Malgré une limite légale à 13 ans, la tranche d'âge sur Crush était de 10-21 ans avant d'être restreinte aux 13-18 ans hier.

L'âge n'est **jamais vérifié**, j'ai pu créer un profil sans souci et envoyer des demandes d'amis à des inconnus. 

<div class="gallery-box">
  <div class="gallery">
  <img src="/images/blog/securite-crush/1722318984362578131-F-bmpYhXgAApvSI.jpg" draggable="false">
  </div>
</div>

Alors sur le principe, c'est une info qui peut faire réagir. Mais c'est moins grave qu'il n'en a l'air : aucune fonctionnalité ne permet de contacter directement les autres utilisateurs.

On peut tout de même récupérer quelques infos (prénom, photo de profil, etc.) mais ce sont des données qui se retrouvent souvent publiquement sur d'autres sites, notamment TikTok qui est très utilisé chez les mineur·es. 

<div class="gallery-box">
  <div class="gallery">
  <img src="/images/blog/securite-crush/1722318989097935147-F-bm4j9XUAADzQZ.jpg" draggable="false">
  </div>
</div>

Côté cyber, je suis allé chercher des vulnérabilités sur le protocole client-serveur, qui pourraient permettre de voler les infos privées des utilisateurs (adresse, mot de passe, ...) ou modifier la base de données comme j'avais pu le faire sur Elyze : [https://twitter.com/MathisHammel...](https://twitter.com/MathisHammel/status/1482393799456436228)

<blockquote class="twitter-tweet tw-align-center" data-conversation="none" data-dnt="true" data-theme="dark">
  <a href="https://twitter.com/MathisHammel/status/1482393799456436228"></a>
</blockquote>

Je publierai peut-être plus tard les détails techniques du reverse-engineering de cette appli qui m'a pris 8 heures environ, avec une stack technique similaire à Elyze (GraphQL + Expo).

En résumé : j'ai extrait 64 endpoints du code de l'appli, aucun ne présente de faille critique. 

<div class="gallery-box">
  <div class="gallery">
  <img src="/images/blog/securite-crush/1722318994970206260-F-bm-tmWAAEUnYH.jpg" draggable="false">
  </div>
</div>

J'ai quand même trouvé une manière d'automatiser la création de milliers de comptes par minute pour aspirer la liste complète des ~15 000 utilisateurs (prénom &amp; photo de profil).

À noter que j'ai juste conçu et vérifié cette attaque, sans pour autant l'exécuter.

Pour conclure, je pense donc qu'il n'y a pas de raison d'alerter sur l'aspect cybersécurité de Crush. Je ne me prononcerai pas non plus sur la facilitation de relations amoureuses au collège/lycée, ce n'est pas mon rôle.

⚠️ Par contre, il y a un autre problème **bien plus grave**.

# PARTIE 3. Les sociétés fictives

Comme beaucoup d'entre vous, j'ai entendu parler de Crush via le thread de <a href="https://twitter.com/julienqueffelec" target="_blank">@julienqueffelec</a> qui mentionne notamment Ophenya, une influenceuse TikTok (4.8M abonné·es, très jeunes pour la plupart) ayant participé au lancement via un live sponsorisé. 

<div class="gallery-box">
  <div class="gallery">
  <img src="/images/blog/securite-crush/1722319002834276501-F-bnFV1XIAE9Hsn.png" draggable="false">
  </div>
</div>

En allant fouiller qui est derrière Crush, on tombe rapidement sur le profil de **Marc Allain**, le développeur de l'application.

Marc est un joueur accompli de pipeau sur LinkedIn, et visiblement dev qui sait coder des apps plutôt sécurisées. Mais ses qualités vont s'arrêter là 🙃 

<div class="gallery-box">
  <div class="gallery">
  <img src="/images/blog/securite-crush/1722319005900238989-F-bfNdGXAAAImyS.jpg" draggable="false">
  </div>
</div>

Crush est une application qui récolte **le carnet de contacts, la localisation et le numéro de téléphone** de milliers de mineur·es.

On est donc en droit de se demander qui est l'entité juridique responsable du traitement/stockage de ces données critiques. Et là, ça se complique.

Première étape, on va voir dans la politique de confidentialité de l'appli : il est bien fait mention d'une société Positive Tech SAS... **qui n'existe pas** juridiquement. 

<div class="gallery-box">
  <div class="gallery">
  <img src="/images/blog/securite-crush/1722319011025654116-F-bnU8fW8AAItm7.jpg" draggable="false">
  </div>
</div>

On découvre sur le même site l'existence de la société EPIC SAS, qui serait enregistrée au RCS de Paris. 

Cependant, **le numéro d'immatriculation est faux** (il correspond à une autre société) et aucune trace d'EPIC SAS n'existe dans les publications administratives en France. 

<div class="gallery-box">
  <div class="gallery">
  <img src="/images/blog/securite-crush/1722319013710041118-F-bnYjiXAAAiaDL.jpg" draggable="false">
  </div>
</div>

Le n° SIREN ci-dessus appartient à la société Comin, qui ne me semble pas liée directement à l'affaire.

En effet, les conditions de confidentialité de Comin sont quasi identiques, et Marc a donc probablement fait un gros copier-coller en oubliant de changer des bouts. 

<div class="gallery-box">
  <div class="gallery">
  <img src="/images/blog/securite-crush/1722319016365056489-F-bndZ2XQAAk_Nt.png" draggable="false">
  <img src="/images/blog/securite-crush/1722319016365056489-F-bnkvTWQAAzVO6.png" draggable="false">
  </div>
</div>

Dans le code de l'application, j'ai aussi vu passer plusieurs mentions de "Likorn", notamment dans le nom de package Android. Sûrement un autre nom d'entreprise, qui n'est ici **pas non plus une société déclarée** (en plus d'être un nom de startup absolument cliché et naze).

Parlons enfin de MRA Tech, entité qui a publié les applis Crush (renommée Friendzy cet après-midi) et Epic sur Android.

Vous connaissez la chanson, **aucune trace** administrative n'existe à ce nom. 

<div class="gallery-box">
  <div class="gallery">
  <img src="/images/blog/securite-crush/1722319021842842009-F-bnqq1W4AEI2Wk.png" draggable="false">
  </div>
</div>

Je pense qu'on pourrait facilement creuser d'autres pistes pour trouver d'autres entreprises fictives dans ce réseau, mais on tient déjà un dossier suffisamment rempli 🙃 

<div class="gallery-box">
  <div class="gallery">
  <img src="/images/blog/securite-crush/1722319024644595714-F-bn7cCXUAAekiy.png" draggable="false">
  </div>
</div>

En conclusion : les données privées de vos enfants sont récupérées par un gars qui gère au moins 4 "entreprises" dont aucune d'entre elles n'est déclarée.

C'est le moment de faire un peu de ménage sur les téléphones :)

Si vous appréciez mes articles, n'hésitez pas à me suivre sur Twitter, Threads ou BlueSky !

Pour lire une autre de mes enquêtes, je vous invite à découvrir [comment j'ai découvert un réseau d'entreprises fictives sur LinkedIn](/blog/reseau-entreprises-fictives).