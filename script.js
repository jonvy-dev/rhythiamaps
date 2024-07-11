document.addEventListener('DOMContentLoaded', function() {
    const spreadsheetId = '1OPaF7n0xtnMw7FM--Wb923b7x08CM1pXpnQa9RIyWX8';
    const url = `https://spreadsheets.google.com/feeds/list/${spreadsheetId}/od6/public/values?alt=json`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const entries = data.feed.entry;
            const mapsList = document.getElementById('maps-list');

            entries.forEach(entry => {
                const mapName = entry.gsx$name.$t;
                const mapDifficulty = entry.gsx$difficulty.$t;
                const mapCreator = entry.gsx$creator.$t;

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
