
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

/client/questions/

###GET

Retourne les trente dernières questions posées.

Liste des codes retours HTTP possibles :
200 : succès

Paramètres


| nom           | description                                                                                  | type      |
| ------------- | -------------------------------------------------------------------------------------------- | --------- | 
| label         | paramètre optionnel, indique le contenu de la question que l'utilisateur souhaite rechercher |     valeur|      
Corps de la réponse

| Eléments json | les trente dernières questions posées    |
| Elément json  | les questions contenant le label indiqué |   

