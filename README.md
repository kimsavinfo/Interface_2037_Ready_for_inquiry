
[![Build Status](https://travis-ci.org/kimsavinfo/Interface_2037_Ready_for_inquiry.svg?branch=master)](https://travis-ci.org/kimsavinfo/Interface_2037_Ready_for_inquiry) [![Coverage Status](https://coveralls.io/repos/kimsavinfo/Interface_2037_Ready_for_inquiry/badge.png)](https://coveralls.io/r/kimsavinfo/Interface_2037_Ready_for_inquiry)

Interface 2037 - Ready for inquiry 
================================

# Les services suivants sont disponibles :
* /client/questions/
* /client/questions/{id_question}
* /expert/questions/last
* /expert/questions/{id_question}


> Note : pour chaque URI, vous trouverez avez à disposition la méthode OPTIONS.

### La documentation de l'API est acccesible dans le fichier
![docs/doc_API.pdf](docs/doc_API.pdf)

================================

###/client/questions/

####GET

Retourne les trente dernières questions posées.

> Liste des codes retours HTTP possibles :

* 200 : succès

- - -

> Paramètres

| nom           | description                                                                                  | type      |
| ------------- | -------------------------------------------------------------------------------------------- | --------- | 
| label         | paramètre optionnel, indique le contenu de la question que l'utilisateur souhaite rechercher |     valeur|      
> Corps de la réponse

| élément       | corp                                     |
| ------------- | ---------------------------------------- |
| Eléments json | les trente dernières questions posées    |
| Eléments json | les questions contenant le label indiqué |   

La liste des trente dernières question posées en JSON.


###POST

Ajoute une question en base.

> Liste des codes retours HTTP possibles:

* 201 : created

> Paramètres

| nom	  | description            | type | 
| ----- | ---------------------- | ---- |
| label | contenu de la question | path |


####OPTIONS

Lister les méthodes HTTP autorisées pour cette URI.

> Liste des codes retours HTTP possibles:

* 200 : success

================================

/client/questions/{id_question}

####GET

Obtient la question associée à l'identifiant indiqué.

> Liste des codes retours HTTP possibles :

* 200 : success

> Paramètres

| nom           | description                | type      |
| ------------- | -------------------------- | --------- | 
| id_question   | identifiant de la question | path      |

> Corps de la réponse

| élément       | corp                        |
| ------------- | --------------------------- |
| Eléments json | la question correspondante  |

La question essociée à l’identifiant sous le format JSON.


####DELETE

Supprime la question associée à l'identifiant indiqué.

> Liste des codes retours HTTP possibles :

* 204 : no content

> Paramètres

| nom           | description                | type      |
| ------------- | -------------------------- | --------- | 
| id_question   | identifiant de la question | path      |


####OPTIONS

Lister les méthodes HTTP autorisées pour cette URI.

> Liste des codes retours HTTP possibles:

* 200 : OK

================================

/expert/questions

####OPTIONS

Lister les méthodes HTTP autorisées pour cette URI.

> Liste des codes retours HTTP possibles:

* 200 : success

================================

/expert/questions/last


####GET

Retourne la plus ancienne question sans réponse.

> Liste des codes retours HTTP possibles :

* 200 : success
* 303 : see other

> Corps de la réponse

| élément       | corp                                    |
| ------------- | --------------------------------------- |
| Eléments json | la plus ancienne question sans réponse  |

La question la plus ancienne sans réponse sous le format JSON.

================================

/expert/questions/{id_question}


####PUT

Met à jour une question avec la réponses indiquée.
La question est ciblée grâce à l’id_question passée en paramètre.

> Liste des codes retours HTTP possibles :

* 200 : success
* 303 : see other

> Paramètres

| nom           | description                | type      |
| ------------- | -------------------------- | --------- | 
| id_question   | identifiant de la question | path      |

> Corps de la réponse

Log
Question répondue avec succès ! id :{id_question}


####GET

Obtient la question associée à l'identifiant indiqué.

> Liste des codes retours HTTP possibles :

* 200 : success

> Paramètres

| nom           | description                | type      |
| ------------- | -------------------------- | --------- | 
| id_question   | identifiant de la question | path      | 


> Corps de la réponse

| élément       | corp                        |
| ------------- | --------------------------- |
| Eléments json | la question correspondante  |

La question essociée à l’identifiant sous le format JSON.









