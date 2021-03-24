# mobile-project-m2gi Groupe 15  
Ce dépôt ne contient pas les fichiers `src/environments/environment.ts` et `src/environments/environment.prod.ts`  

## Fonctionnalités  
### Hébergement  
Ce projet est hébergé grâce à Firebase hosting et est accessible aux adresses suivantes :
 - https://mobile-project-m2gi.web.app/  
 - https://mobile-project-m2gi.firebaseapp.com/login  

### Progressive webapp  
En visitant une des verions web depuis un ordinateur ou un mobile, une popup apparaît afin d'installer le projet en tant qu'application.  

### Mode offline  
Lors d'une perte de connection, toutes les actions effectuées se synchronisent automatiquement au retour du signal.  

### Guards  
Le routing fait appel à différents guards afin de rediriger l'utilisateur en fonction de son status :
 - connecté ou non  
 - email verifié  

### Listes  

#### Todos

### Partage de listes  
owner, canRead, canWrite  
Chaque utilisateur  

#### Règles firebase  
Les droits sur les access à nos données sont gérés grâce aux rules de firebase.  
Un utilisateur à toutes les permissions sur les listes (et todos) pour lesquels il est l'owner.  

### Photos  
Utilisation de la caméra, stockage dans le storage firebase, owner
