# Appex1
# Company App

Dette er en webapplikasjon som lar deg lagre og vise informasjon om bedrifter basert på oppslag i Brønnøysundregisteret og andre APIer.

## Funksjoner

- Brukeren kan søke etter og registrere informasjon om bedrifter ved hjelp av organisasjonsnummer.
- Det hentes data fra Brønnøysundregisteret og andre APIer for å vise informasjon om bedriften.
- Brukeren kan legge til og lagre ekstra informasjon om hver bedrift.

## Teknologier

- Frontend: HTML, CSS, JavaScript
- Backend: Node.js med Express
- Tredjeparts APIer: Brønnøysundregisteret API, Data.norge API
- Databaselignende lagring: Array i minnet (til testing og enkelhetens skyld)

## Installasjon

1. Klone dette GitHub-repositoriet til din lokale maskin.
2. Naviger til prosjektmappen i terminalen.
3. Kjør kommandoen `npm install` for å installere avhengigheter.
4. Kjør kommandoen `npm start` for å starte serveren.
5. Åpne nettleseren og besøk `http://localhost:3000` for å se applikasjonen.

## Bruk

1. Skriv inn et organisasjonsnummer i input-feltet og klikk på "Submit" for å hente og vise bedriftsinformasjon.
2. Skriv inn ekstra informasjon om bedriften i tekstfeltet og klikk på "Save Info" for å lagre den.
3. Bedriftsinformasjon og lagret ekstra informasjon vil vises på skjermen.
4. Du kan også se en liste over alle lagrede bedrifter ved å besøke `http://localhost:3000/companies` i nettleseren.

## Bidrag

Bidrag til prosjektet er velkomne! Hvis du ønsker å bidra, kan du følge disse trinnene:

1. Fork dette repositoryet.
2. Opprett en ny branch for dine endringer: `git checkout -b feature/ny-funksjonalitet`.
3. Utfør endringene og lagre dem.
4. Commit endringene dine: `git commit -m "Legg til ny funksjonalitet"`.
5. Push til den nye branchen: `git push origin feature/ny-funksjonalitet`.
6. Åpne en pull request mot dette repositoryet.


