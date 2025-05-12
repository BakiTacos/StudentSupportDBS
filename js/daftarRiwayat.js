document.addEventListener('DOMContentLoaded', function() {
    // Sample data for consultation history
    const historyData = [
        { id: 1, nim: '00000111231', fullName: 'Benedict Marvin', email: 'marvin.benedict@student.umn.ac.id', 
            dateRequested: '2025-03-01', dateProposed: '2025-03-07', consultationType: 'Layanan Konseling', status: 'Solved' },
        { id: 2, nim: '00000101334', fullName: 'Bibisana Kwary', email: 'bibisana.kwary@student.umn.ac.id', 
            dateRequested: '2023-03-10', dateProposed: '2025-03-15', consultationType: 'Layanan Konseling', status: 'Solved' },
        { id: 3, nim: '00000131334', fullName: 'Kevin Sajua', email: 'kevin.sajua@student.umn.ac.id', 
            dateRequested: '2023-04-15', dateProposed: '2025-04-26', consultationType: 'Pengajuan Wawancara', status: 'Solved' }
    ];

    const tbody = document.querySelector('table tbody'); 
    historyData.forEach(entry => { const row = document.createElement('tr'); 
        row.innerHTML = ` 
        <th scope="row">${entry.id}</th> 
        <td>${entry.nim}</td> 
        <td>${entry.fullName}</td> 
        <td>${entry.email}</td> 
        <td>${entry.dateRequested}</td> 
        <td>${entry.dateProposed}</td> 
        <td>${entry.consultationType}</td> 
        <td>${entry.status}</td> 
        <td><button class="btn btn-primary view-detail" data-id="${entry.id}">View Detail</button></td> `; 
        tbody.appendChild(row); }); // Add event listener for view detail buttons 
});

document.querySelector('table').addEventListener('click', function(event) {
    if (event.target.tagName === 'BUTTON') {
        const action = event.target.textContent.toLowerCase();
        const row = event.target.closest('tr');
        const requestId = row.querySelector('th').textContent;
        handleRequestAction(requestId, action);
    }
    if (event.target.classList.contains('view-detail')) {
        const row = event.target.closest('tr');
        const request = requests.find(req => req.id == row.querySelector('th').textContent);
        document.getElementById('popup-description').textContent = `Description: ${request.description}`;
        document.getElementById('popup-hopes').textContent = `Hopes: ${request.hopes}`;
        document.getElementById('popup-name').textContent = `Name: ${request.fullName}`;
        document.getElementById('popup-nim').textContent = `NIM: ${request.nim}`;
        document.getElementById('popup').style.display = 'block';
        const popupBackground = document.getElementById('popup-background');
        if (popupBackground) {
            popupBackground.classList.add('blur');
        }
    }
});

document.querySelector('.close-btn').addEventListener('click', function() {
    document.getElementById('popup').style.display = 'none';
    const popupBackground = document.getElementById('popup-background');
    if (popupBackground) {
        popupBackground.classList.remove('blur');
    }
});

function handleRequestAction(requestId, action) {
    // Placeholder for handling approve/reject actions
    console.log(`Request ID: ${requestId}, Action: ${action}`);
    // Example: Send action to server and update UI accordingly
}
