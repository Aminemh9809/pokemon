1 - creation de pipeline en utilisant la doc ci node : https://docs.github.com/en/actions/use-cases-and-examples/building-and-testing/building-and-testing-nodejs .
2 - configuration de prettier + eslint ( fichier conf) + installation des dependances( creation de fichier javascriptLetInutile.js pour tester le pipeline)
3 - ajoute des lignes pour verifier le formatage avec prettier + lancer eslint.
4 - ajoute des lignes pour verifier typage de typescript
5 - utilisation de cache de npm
6 - ajoute de ruleset pour git branch policy pour forcer developpeur a faire des pr et empecher les pr qui ne build pas d'étre emergées (Require a pull request before merging)(httpsRequire status checks to pass et l'ajoute de status check)
7 - e2e test en utilisant cypress ! utilisation de npx wait on avant pour etre sur que l'application est bien lancé avant lancé le test cypress
