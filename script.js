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

            // Assuming map names are in column 3 (index 2), creators in column 5 (index 4), difficulties in column 6 (index 5)
            rows.forEach(row => {
                const mapName = row[1]; // Column C (index 2)
                const mapCreator = row[3]; // Column E (index 4)
                const mapDifficulty = row[4]; // Column F (index 5)

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
