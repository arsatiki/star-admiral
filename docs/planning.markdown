TBD
===

* Adjektiivit
    * (hauska, pienille peliporukoille, blah blah)
* Kohderyhmä
* Goalit

Ekan version featuret
=====================

* Esittelysivu
* Login
* Omat pelit
* Yksinkertainen yhden ruudun peli
* Toimivat vuorot

Graafiset tarpeet
=================

* scout
* freighter
* megafreighter

* escort / monitor
* Destroyer
* cruiser
* battlecruiser
* battleship

* slave ship

Leiskat / leiskaluonnokset
--------------------------
* Etusivu
* dashboard
* Käynnissä olevien pelien lista
* Free-for-all -pelien lista
* Pelikutsujen lista
* Uuden pelin luontiruutu
* Uuden pelin hallintaruutu
* 

User storyt
===========

Yliviivatut kohdat (<del>esimerkki</del>) ovat muistiinpanoja seuraavia iteraatioita varten.

Roolit
------

* anonyymi käyttäjä (ei kirjautunut)
* käyttäjä (eli _rekisteröitynyt_ käyttäjä)
* pelaaja (rekisteröitynyt käyttäjä; väh. yhdessä pelissä pelaajana)
* pelin omistaja (luo pelin, voi muuttaa asetuksia)
* admin-käyttäjä

### Login

* Anonyymi käyttäjä saa nähdä
    * etusivun, jossa palvelua esitellään
    * erillisen esittelysivun

* <del>Anonyymi käyttäjä voi pelata lyyheyn esimerkkipelin</del>

* Käyttäjä voi kirjautua sisään kaikilta julkisilta sivuilta / vain etusivulta (!!)
* Kirjautunut käyttäjä viedään henkilökohtaiselle etusivulleen (dashboard)
  Dashboardilla näytetään:
  * aukiolevien pelien tilanne (nimi, aika vuoron loppuun (<-sortby))
  * Kutsut uusiin peleihin (top 5 + sitten linkki täyteen listaan)
  * free-for-all -pelien lista (top 5 + linkki tai vain linkki)
  * Tilastotiedot menneistä peleistä (voitot, tappiot, <del>ranking</del>?)
  

### Pelien hallinta

#### Uuden pelin luonti
* Käyttäjätt voi dashboardilta valita "New game"-vaihtoehdon.
  Käyttäjästä tulee uuden pelin omistaja. Omistaja valkkaa <del>pelin säännöt
  </del>, invite-only / free-for-all ja pelaajien määrän.
  Omistajan syötettyä tiedot peli siirtyy pending-tilaan.
* Omistaja voi pending-tilassa muuttaa pelin ominaisuuksia.
* Omistaja voi free-for-all -peleissä pending-tilassa hyväksyä käyttäjien
  pyynnöt päästä pelaamaan.
* Omistaja voi hylätä pending-tilassa pelissä olevat käyttäjät.
* Invite-only -pelissä käyttäjä voi hyväksyä tai hylätä saamansa kutsun.
* Omistaja voi pending-tilassa kutsua lisää käyttäjiä.
* Käyttäjä voi pending tilassa pyytää oikeutta päästä mukaan free-for-all 
    -peliin.

#### Käynnissä olevat pelit
* Käyttäjä voi tarkastella omien aktiivisten peliensä listaa
* 


### Peli



