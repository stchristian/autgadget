# AUTGadget

## Specifikáció:
Az egyetemen a hallgatók szabadon kölcsönözhetnek eszközöket az AUT tanszéktől. Minden eszköznek van saját felelőse, aki átadja az eszközt és menedzseli a kölcsönzéseket. A hallgatók láthatják az elérhető eszközöket, keresni tudnak köztük, illetve ki is tudják kölcsönözni őket egy adott időszakra. Erről az eszközfelelős értesítést kap. A rendszerbe eszközt felvenni csak eszközfelelős tud.

### További igények:


### Felhasznált technológiák:
* Szerver oldali technológia: NodeJs
  * Routeok kezelése: Express
  * Authentikáció: Passport
  * Adatbázis elérés: Mongoose
  * Templating: EJS
* Adatbázis: MongoDB
* Frontend: Bootstrap

### Mappa struktúra:
* /models : Modellek
* /middlewares : Express által használt middlewarek, modellenként csoportosítva
* /public : Statikus fájlok (css, js)
* /routes : route-ok, külön webes felületnek illetve az api-nak
* /scss : Sass fájlok 
* /sessions : Session adatok
* /views : EJS fájlok

### Konfiguráció a .env fájlba
* PORT (szerver portja)
* MONGO_URI (mongodb elérési uri)