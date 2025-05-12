document.addEventListener('DOMContentLoaded', function() {
    // Fetch consultation requests and populate the table
    const requests = [
        { id: 1, nim: '00000123456', fullName: 'Julio Michael Putra Kwary', email: 'julio.michael@student.umn.ac.id', dateRequested: '2025-06-01', dateProposed: '2025-05-24', 
            description: 'Pengajuan Wawancara Terkait Student Support', hopes: 'Mendapatkan Informasi sesuai penugasan', 
            consultationType: 'Pengajuan Wawancara',status: 'Disetujui' },
        { id: 2, nim: '00000654321', fullName: 'Wibisana Theomen Kasriady', email: 'wibisana.theomen@student.umn.ac.id', dateRequested: '2023-06-03', dateProposed: '2025-10-26', 
            description: 'Solusi Mengatasi Beban Disco Cari Paid Promote', hopes: 'Beban teratasi', consultationType: 'Layanan Konseling',status: 'Pending' }
    ];

    const tbody = document.querySelector('table tbody');
    requests.forEach(request => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <th scope="row">${request.id}</th>
            <td>${request.nim}</td>
            <td>${request.fullName}</td>
            <td>${request.email}</td>
            <td>${request.dateRequested}</td>
            <td>${request.dateProposed}</td>
            <td>${request.consultationType}</td>
            <td>${request.status}</td>
            
            <td>
                <button class="btn btn-success btn-sm">Approve</button>
                <button class="btn btn-danger btn-sm">Contact</button>
                <button class="btn btn-info btn-sm view-detail">View Detail</button>
            </td>
        `;
        tbody.appendChild(row);
    });

    // Add event listeners for approve/reject buttons
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
});