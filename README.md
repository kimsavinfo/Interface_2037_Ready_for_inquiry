
[![Build Status](https://travis-ci.org/kimsavinfo/Interface_2037_Ready_for_inquiry.svg?branch=master)](https://travis-ci.org/kimsavinfo/Interface_2037_Ready_for_inquiry) [![Coverage Status](https://coveralls.io/repos/kimsavinfo/Interface_2037_Ready_for_inquiry/badge.png)](https://coveralls.io/r/kimsavinfo/Interface_2037_Ready_for_inquiry)

Interface_2037_Ready_for_inquiry 
================================

# Les services suivants sont disponibles :
* /client/questions/
* /client/questions/{id_question}
* /expert/questions/
* /expert/questions/{id_question}

## /client/questions/

### GET

Retourne les trente dernières questions posées.

Liste des codes retours HTTP possibles :
* 200 : succès

Paramètres

| nom 			| description 		| type | defaut|
| :------------ |:---------------:| -----:| -----:|
| label      	| paramètre optionnel, indique le contenu de la question que l'utilisateur souhaite rechercher | body | |