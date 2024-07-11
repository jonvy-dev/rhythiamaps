document.addEventListener('DOMContentLoaded', function() {
    const spreadsheetId = '1dRpApSjAGXtp_zC2yPUv5NVDJtpSRprnkT5unqvByGc'; // Google Spreadsheet ID
    const range = 'B6:K492'; // Sheet Data Range
    const apiKey = 'AIzaSyBupy8KeQfg3pi_-ypaQ14hiMBzKFjQss0'; // Google Sheets API key

    const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const rows = data.values;
            const mapsList = document.getElementById('maps-list');

            rows.forEach(row => {
                const mapName = row[1]; // Map name row in sheet
                const mapRating = row[4]; // SR row in sheet
                const mapCreator = row[3]; // Mappers row in sheet

                const mapItem = document.createElement('div');
                mapItem.classList.add('map-item');
                mapItem.innerHTML = `
                    <strong>${mapName}</strong> - Difficulty: ${mapDifficulty}<br>
                    Created by: ${mapCreator}
                `;

                mapsList.appendChild(mapItem);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});
