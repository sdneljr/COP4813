
const tableBody = document.getElementById("cms-data");
const statusMessage = document.getElementById("status");

// Load CMS information from the external JSON file
async function loadCMS() {
  try {
    const response = await fetch("./cms.json");

    if (!response.ok) {
      throw new Error("Unable to load CMS data.");
    }

    const systems = await response.json();

    tableBody.innerHTML = "";

    systems.forEach((cms) => {
      const row = document.createElement("tr");

      // CMS name and research sources
      const nameCell = document.createElement("td");
      const name = document.createElement("strong");
      name.textContent = cms.name;
      nameCell.appendChild(name);

      const sources = document.createElement("div");
      sources.style.marginTop = "12px";

      cms.sources.forEach((url, index) => {
        const link = document.createElement("a");
        link.href = url;
        link.textContent = `Source ${index + 1}`;
        link.target = "_blank";
        link.rel = "noopener noreferrer";

        sources.appendChild(link);
        sources.appendChild(document.createElement("br"));
      });

      nameCell.appendChild(sources);
      row.appendChild(nameCell);

      // Support and technology
      addTextCell(row, cms.support);
      addTextCell(row, cms.technology);

      // Capabilities and limitations
      addListCell(row, cms.capabilities);
      addListCell(row, cms.limitations);

      // Example website
      const exampleCell = document.createElement("td");
      const exampleLink = document.createElement("a");

      exampleLink.href = cms.example.url;
      exampleLink.textContent = cms.example.name;
      exampleLink.target = "_blank";
      exampleLink.rel = "noopener noreferrer";

      exampleCell.appendChild(exampleLink);
      row.appendChild(exampleCell);

      tableBody.appendChild(row);
    });

    statusMessage.textContent =
      `${systems.length} content management systems compared.`;

  } catch (error) {
    statusMessage.textContent =
      "Error loading CMS data. Please use a local web server.";
    console.error(error);
  }
}

// Create a regular table cell
function addTextCell(row, text) {
  const cell = document.createElement("td");
  cell.textContent = text;
  row.appendChild(cell);
}

// Create a table cell containing a list
function addListCell(row, items) {
  const cell = document.createElement("td");
  const list = document.createElement("ul");

  items.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.textContent = item;
    list.appendChild(listItem);
  });

  cell.appendChild(list);
  row.appendChild(cell);
}

// Generate the table when the page loads
loadCMS();
