// Importerer nødvendige moduler
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");

// Lager en ny express applikasjon
const app = express();

// Bruker middleware funksjoner for å tillate CORS, behandle JSON og servere statiske filer
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());
app.use(express.static("public"));

// En tom array som skal inneholde selskapsdataene
let companies = [];

// En GET rute handler som henter data fra to eksterne API-er basert på orgnr
app.get("/company/:orgnr", async (req, res) => {
  const orgnr = req.params.orgnr;

  try {
    const [brregResponse, dataNorgeResponse] = await Promise.all([
      axios.get(`https://data.brreg.no/enhetsregisteret/api/enheter/${orgnr}`),
      axios.get(
        `https://organization-catalog.fellesdatakatalog.digdir.no/organizations/${orgnr}`
      ),
    ]);

        // Logging av data som mottas fra APIene
    console.log("Brreg response:", brregResponse.data);
    console.log("Data Norge response:", dataNorgeResponse.data);

        // Behandling av mottatt data og lagring i en enkel struktur
    const companyData = {
      organisasjonsnummer: brregResponse.data.organisasjonsnummer,
      navn: brregResponse.data.navn,
      organisasjonsform:
        brregResponse.data.organisasjonsform?.beskrivelse || "",
      adresse: brregResponse.data.forretningsadresse?.adresse.join(", ") || "",
      additionalData: {
        industryCode: dataNorgeResponse.data.industryCode || "",
        sectorCode: dataNorgeResponse.data.sectorCode || "",
        orgType: dataNorgeResponse.data.orgType || "",
        orgPath: dataNorgeResponse.data.orgPath || "",
        orgStatus: dataNorgeResponse.data.orgStatus || "",
        issued: dataNorgeResponse.data.issued || "",
        hjemmeside: dataNorgeResponse.data.homepage || "",
        municipalityNumber: dataNorgeResponse.data.municipalityNumber || "",
        naeringskode1: brregResponse.data.naeringskode1?.beskrivelse || "",
        antallAnsatte: brregResponse.data.antallAnsatte || "",
        postnummer: brregResponse.data.forretningsadresse?.postnummer || "",
        poststed: brregResponse.data.forretningsadresse?.poststed || "",
      },
    };

       // Logger data før det sendes tilbake til klienten
    console.log("Brreg response:", brregResponse.data);
    console.log("Data Norge response:", dataNorgeResponse.data);

        // Returnerer JSON-responsen til klienten
    res.json(companyData);
  } catch (error) {
       // Logger eventuelle feil og sender en feilmelding til klienten
    console.error(error);
    res.status(500).json({ error: "An error occurred while fetching data." });
  }
});

// En POST rute handler som oppdaterer selskapsdataene basert på orgnr
app.post("/company", (req, res) => {
  const companyData = req.body;
  const existingCompanyIndex = companies.findIndex(
    (obj) => obj.orgnr === companyData.orgnr
  );

  if (existingCompanyIndex !== -1) {
    companies[existingCompanyIndex] = {
      ...companies[existingCompanyIndex],
      additionalData: {
        ...companies[existingCompanyIndex].additionalData,
        note: companyData.additionalData.note,
      },
    };
  } else {
    companies.push(companyData);
  }

  res.status(200).json({
    message: "Company added/updated successfully.",
    companies: companies,
  });
});

// En GET rute handler som sender HTML-filen til klienten
app.get("/companies", (req, res) => {
  res.sendFile(__dirname + "/public/companies.html");
});

// En GET rute handler som returnerer alle lagrede selskaper
app.get("/getCompanies", async (req, res) => {
  res.status(200).json({ companies: companies });
});

// Starter serveren og lytter på port 3000
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
