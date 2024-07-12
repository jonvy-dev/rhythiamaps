document.addEventListener('DOMContentLoaded', function() {
    const spreadsheetId = '1dRpApSjAGXtp_zC2yPUv5NVDJtpSRprnkT5unqvByGc'; // Google Spreadsheet ID
    const range = 'B7:K492'; // Sheet Data Range
    const apiKey = 'AIzaSyBupy8KeQfg3pi_-ypaQ14hiMBzKFjQss0'; // Google Sheets API key

    const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`;

    // Elements
    const mapsListContainer = document.getElementById('maps-list');
    const filteredMapsList = document.getElementById('filtered-maps-list');
    const searchInput = document.getElementById('search-input');

    let allRows = []; // To store all rows from Google Sheets

    // Function to populate original maps list
    function populateMapsList(rows) {
        mapsListContainer.innerHTML = ''; // Clear previous content
        rows.forEach(row => {
            const mapName = row[1]; // Column C (index 1)
            const mapCreator = row[3]; // Column E (index 3)
            const mapDifficulty = row[4]; // Column F (index 4)
            const downloadLink = row[6]; // Column H (index 6)

            const mapItem = document.createElement('div');
            mapItem.classList.add('map-item');
            mapItem.innerHTML = `
                <a href="${downloadLink}" target="_blank"><strong>${mapName}</strong></a> • Star Rating: ${mapDifficulty}<br>
                Created by: ${mapCreator}
            `;

            mapsListContainer.appendChild(mapItem);
        });
    }

    // Function to filter maps based on search input
    function filterMaps(query, rows) {
        filteredMapsList.innerHTML = ''; // Clear previous results

        // Filter rows based on mapName
        const filteredRows = rows.filter(row => {
            // Check if row[1] exists and is not undefined or null
            if (row[1] && typeof row[1] === 'string') {
                const mapName = row[1].toLowerCase(); // Column C (index 1)
                return mapName.includes(query.toLowerCase());
            }
            return false; // Exclude rows where mapName is undefined or not a string
        });

        // Display filtered results or original list based on query
        if (query.length > 0 && filteredRows.length > 0) {
            mapsListContainer.style.display = 'none'; // Hide original map list
            filteredMapsList.style.display = 'block'; // Show filtered map list

            filteredRows.forEach(row => {
                const mapName = row[1]; // Column C (index 1)
                const mapCreator = row[3]; // Column E (index 3)
                const mapDifficulty = row[4]; // Column F (index 4)
                const downloadLink = row[6]; // Column H (index 6)

                const mapItem = document.createElement('div');
                mapItem.classList.add('filtered-map-item');
                mapItem.innerHTML = `
                    <a href="${downloadLink}" target="_blank"><strong>${mapName}</strong></a> • Star Rating: ${mapDifficulty}<br>
                    Created by: ${mapCreator}
                `;

                filteredMapsList.appendChild(mapItem);
            });
        } else {
            mapsListContainer.style.display = 'block'; // Show original map list
            filteredMapsList.style.display = 'none'; // Hide filtered map list if no query or no results
        }
    }

    // Event listener for search input changes
    searchInput.addEventListener('input', function() {
        const query = this.value.trim();
        filterMaps(query, allRows); // Filter using allRows data
    });

    // Fetch data from Google Sheets
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const rows = data.values;
            populateMapsList(rows); // Populate original maps list
            allRows = rows; // Store all rows for filtering
        })
        .catch(error => console.error('Error fetching data:', error));
});
