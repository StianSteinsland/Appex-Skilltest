// Initialiserer en tom variabel for å lagre informasjon om selskapet.
var companyInfo;

// Legger til en hendelseslytter som kjører når siden er ferdig lastet.
document.addEventListener("DOMContentLoaded", (event) => {
  document
   // Legger til en hendelseslytter for "submit"-knappen.
    .getElementById("submit")
    .addEventListener("click", async function (event) {
        // Forhindrer standardhandlingen til klikkhendelsen (innsending av skjemaet).
      event.preventDefault();

            // Henter organisasjonsnummeret fra inndatafeltet i skjemaet på nettsiden.
      let orgnr = document.getElementById("orgnr").value;

    // Sjekker om organisasjonsnummer er oppgitt. Hvis ikke, returneres en error.
      if (!orgnr) {
        console.error("Orgnr must be provided.");
        return;
      }

      try {
  // Henter selskapsinformasjon ved hjelp av organisasjonsnummeret og logger HTTP-responsen.
        const response = await fetch(`http://localhost:3000/company/${orgnr}`);
        console.log("HTTP Response:", response);
            // Tolker JSON-responsen og lagrer den i companyInfo-variabelen.
        companyInfo = await response.json();
        console.log("This is CompanyInfo after Call", companyInfo);
     // Logger hele responsen til konsollen.
        console.log("API Response:", companyInfo);

         // Ekstraherer selskapsinformasjonen fra responsen. Hvis en informasjonsbit ikke er tilgjengelig, brukes en tom streng som standardverdi.
        let navn = companyInfo.navn || "";
        let organisasjonsform = companyInfo.organisasjonsform || "";
        let adresse = companyInfo.adresse || "";
        let hjemmeside = companyInfo.additionalData.hjemmeside || "";
        let naeringskode1 = companyInfo.additionalData.naeringskode1 || "";
        let antallAnsatte = companyInfo.additionalData.antallAnsatte || "";
        let postnummer = companyInfo.additionalData.postnummer || "";
        let poststed = companyInfo.additionalData.poststed || "";
        let orgType = companyInfo.additionalData.orgType || "";
        let orgStatus = companyInfo.additionalData.orgStatus || "";
        let municipalityNumber =
          companyInfo.additionalData.municipalityNumber || "";
        let industryCode = companyInfo.additionalData.industryCode || "";
        let sectorCode = companyInfo.additionalData.sectorCode || "";
        let issued = companyInfo.additionalData.issued || "";

          // Henter HTML-elementet som skal vise selskapsinformasjonen.
        const companyInfoDiv = document.getElementById("company-info");
           // Bruker selskapsinformasjonen for å fylle HTML-elementet.
        companyInfoDiv.innerHTML = `
          <p>Bedrift navn: ${navn}</p>
          <p>Orgnr: ${orgnr}</p>
          <p>Organisasjonsform: ${organisasjonsform}</p>
          <p>Adresse: ${adresse}</p>
          <p>Hjemmeside: <a href="http://${hjemmeside}" target="_blank">${hjemmeside}</a></p>
          <p>Naeringskode: ${naeringskode1}</p>
          <p>Antall Ansatte: ${antallAnsatte}</p>
          <p>Postnummer: ${postnummer}</p>
          <p>Poststed: ${poststed}</p>
          <p>Issued: ${issued}</p>
          <p>Organization Type: ${orgType}</p>
          <p>Organization Status: ${orgStatus}</p>
          <p>Municipality Number: ${municipalityNumber}</p>
          <p>Industry Code: ${industryCode}</p>
          <p>Sector Code: ${sectorCode}</p>
          <div id="company-form">
          <textarea id="additional-info" placeholder="Enter additional info"></textarea>
          <button id="save-info" type="button" onclick="saveInfo(event)">Save Info</button>
          </div>
                  `;
      } catch (err) {
        console.log("Fetch error: ", err);
      }
    });
});

// Asynkron funksjon for å lagre tilleggsinformasjon.
async function saveInfo(event) {
    // Forhindrer standardhandlingen til hendelsen (innsending av skjemaet).
  event.preventDefault();

   // Henter organisasjonsnummer og tilleggsinformasjon fra nettsiden.
  const orgnr = document.getElementById("orgnr").value;
  const additionalInfo = document.getElementById("additional-info").value;
  console.log("This is CompanyInfo at function", companyInfo);
  // Sjekker om organisasjonsnummer og tilleggsinformasjon er oppgitt. Hvis ikke, returneres en feil.
  if (!orgnr || !additionalInfo) {
    console.error("Orgnr and additional info must be provided.");
    return;
  }
  console.log({
    orgnr,
    companyInfo: companyInfo,
    additionalData: { note: additionalInfo },
  });
  try {
  // Sender en POST-forespørsel for å lagre informasjon og notater om selskapet.
    const response = await fetch("http://localhost:3000/company", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orgnr,
        companyInfo: companyInfo,
        additionalData: { note: additionalInfo },
      }),
    });
    const data = await response.json();
    console.log("Additional info saved:", data);
    alert("Info saved!");

  // Sjekker om forespørselen var vellykket.
    if (response.ok) {
      console.log("Company info saved successfully");
    } else {
      console.log("Error saving company info: ", await response.text());
    }
  } catch (err) {
    console.log("Fetch error: ", err);
  }
}
