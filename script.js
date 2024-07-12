document.addEventListener('DOMContentLoaded', function() {
    const spreadsheetId = '1dRpApSjAGXtp_zC2yPUv5NVDJtpSRprnkT5unqvByGc'; // Google Spreadsheet ID
    const range = 'B7:K492'; // Sheet Data Range
    const apiKey = 'AIzaSyBupy8KeQfg3pi_-ypaQ14hiMBzKFjQss0'; // Google Sheets API key

    const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const rows = data.values;
            const mapsList = document.getElementById('maps-list');
            const searchInput = document.getElementById('search-input');

            function displayMaps(maps) {
                mapsList.innerHTML = '';
                rows.forEach(row => {
                    const mapName = row[1]; // Column C (index 1)
                    const mapCreator = row[3]; // Column E (index 3)
                    const mapDifficulty = row[4]; // Column F (index 4)
                    const downloadLink = row[6] // Column H (index 6)

                    const mapItem = document.createElement('div');
                    mapItem.classList.add('map-item');
                    mapItem.innerHTML = `
                        <a href="${downloadLink}" target="_blank"><strong>${mapName}</strong></a> • Star Rating: ${mapDifficulty}<br>
                        Created by: ${mapCreator}
                    `;

                    mapsList.appendChild(mapItem);
                });
            }

            displayMaps(rows);

            searchInput.addEventListener('input', function() {
                const query = searchInput.value.toLowerCase();
                const filteredMaps = rows.filter(row => {
                    const mapName = row[2].toLowerCase();
                    const mapCreator = row[4].toLowerCase();
                    const mapDifficulty = row[5].toLowerCase();
                    return mapName.includes(query) || mapCreator.includes(query) || mapDifficulty.includes(query);
                });
                displayMaps(filteredMaps);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});
