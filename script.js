// Function to filter maps based on search input
function filterMaps(query, rows) {
    const mapsListContainer = document.getElementById('maps-list');
    const filteredMapsList = document.getElementById('filtered-maps-list');
    
    // Clear previous results in filtered list
    filteredMapsList.innerHTML = '';
    
    // Filter rows based on mapName
    const filteredRows = rows.filter(row => {
        // Check if row[1] exists and is not undefined or null
        if (row[1] && typeof row[1] === 'string') {
            const mapName = row[1].toLowerCase(); // Column C (index 1)
            return mapName.includes(query.toLowerCase());
        }
        return false; // Exclude rows where mapName is undefined or not a string
    });

    // Display filtered results or hide filtered list if query is empty
    if (query.length > 0) {
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
        filteredMapsList.style.display = 'none'; // Hide filtered map list if no query
    }
}
