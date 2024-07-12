document.addEventListener('DOMContentLoaded', function() {
    const spreadsheetId = '1OPaF7n0xtnMw7FM--Wb923b7x08CM1pXpnQa9RIyWX8'; // Google Spreadsheet ID
    const range = 'B6:K492'; // Data range
    const apiKey = 'AIzaSyBupy8KeQfg3pi_-ypaQ14hiMBzKFjQss0'; // Your Google Sheets API key

    const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const rows = data.values;
            const mapsList = document.getElementById('maps-list');
            const searchInput = document.getElementById('search-input');

            function displayMaps(maps) {
                mapsList.innerHTML = '';
                maps.forEach(row => {
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

                    mapsList.appendChild(mapItem);
                });
            }

            displayMaps(rows);

            searchInput.addEventListener('input', function() {
                const query = searchInput.value.toLowerCase();
                const filteredMaps = rows.filter(row => {
                    const mapName = row[1].toLowerCase();
                    const mapCreator = row[3].toLowerCase();
                    const mapDifficulty = row[4].toLowerCase();
                    return mapName.includes(query) || mapCreator.includes(query) || mapDifficulty.includes(query);
                });
                displayMaps(filteredMaps);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});
