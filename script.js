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
            const filteredMapsList = document.getElementById('filtered-maps-list');

            // Function to filter maps based on search input
            function filterMaps(query) {
                // Clear previous results
                filteredMapsList.innerHTML = '';

                // Filter rows based on mapName
                const filteredRows = rows.filter(row => {
                    const mapName = row[1].toLowerCase(); // Column C (index 1)
                    return mapName.includes(query.toLowerCase());
                });

                // Display filtered results
                filteredRows.forEach(row => {
                    const mapName = row[1]; // Column C (index 1)
                    const mapCreator = row[3]; // Column E (index 3)
                    const mapDifficulty = row[4]; // Column F (index 4)
                    const downloadLink = row[6]; // Column H (index 6)

                    const mapItem = document.createElement('li');
                    mapItem.classList.add('map-item');
                    mapItem.innerHTML = `
                        <a href="${downloadLink}" target="_blank"><strong>${mapName}</strong></a> • Star Rating: ${mapDifficulty}<br>
                        Created by: ${mapCreator}
                    `;

                    filteredMapsList.appendChild(mapItem);
                });
            }

            // Event listener for search input changes
            searchInput.addEventListener('input', function() {
                const query = this.value.trim();
                if (query.length > 0) {
                    filterMaps(query);
                } else {
                    filteredMapsList.innerHTML = ''; // Clear the filtered list if search input is empty
                }
            });

            // Initially load all maps on page load
            filterMaps('');

        })
        .catch(error => console.error('Error fetching data:', error));
});
