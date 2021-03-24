# mobile-project-m2gi Groupe 15  
Ce dépôt ne contient pas les fichiers `src/environments/environment.ts` et `src/environments/environment.prod.ts`  
Une apk de l'application est disponible en tant que release.  

## Fonctionnalités  
### Hébergement  
Ce projet est hébergé grâce à Firebase hosting et est accessible aux adresses suivantes :
 - https://mobile-project-m2gi.web.app/  
 - https://mobile-project-m2gi.firebaseapp.com/login  

### Progressive webapp  
En visitant une des versions web depuis un ordinateur ou un mobile, une popup apparaît afin d'installer le projet en tant qu'application.  

### Mode offline  
Lors d'une perte de connection, toutes les actions effectuées se synchronisent automatiquement au retour du signal.  

### Guards  
Le routing fait appel à différents guards afin de rediriger l'utilisateur en fonction de son status :
 - connecté ou non  
 - email verifié  

### Connection Google
Il est possible de se connecter avec un compte Google.  
> **_NOTE:_**  Ne fonctionne pas sur mobile.

### Listes  
Les listes possède chacune une icône permettant à l'utilisateur de savoir ses autorisations.  
Si un utilisateur supprime une liste dont il n'est pas l'owner, elle n'est pas effacée de la database,
on retire simplement les droits de l'utilisateur sur cette liste.

#### Todos  
Avec les droits en lectures sur une liste, on peut visualiser ses todos mais pas les modifier.  

### Partage de listes  
Chaque liste possède un ensemble d'emails permettant de savoir qui possède quelles autorisations sur cette liste.  
Chaque utilisateur peut partager les listes dont il est l'owner avec d'autres utilisateurs.  
Pour se faire, il rentre une adresse email et choisi les permissions à lui accorder.  

#### Règles firebase  
Les droits sur les accès à nos données sont gérés grâce aux rules de firebase.  
Un utilisateur a toutes les permissions sur les listes (et todos) pour lesquels il est l'owner.  

### Photos  
Il est possible de prendre des photos avec la caméra de son appareil et de visualiser celles-ci.  
Comme les listes, chaque photo possède un owner et chaque utilisateur n'a accès qu'à ses propre photos.  
Les photos sont stockée dans le storage de firebase.  
