// Sample data for consultation history
const historyData = [
    {
        id: 1, nim: '00000111231', fullName: 'Benedict Marvin', email: 'marvin.benedict@student.umn.ac.id',
        dateRequested: '2025-03-01', dateProposed: '2025-03-07', consultationType: 'Layanan Konseling', status: 'Solved',
        description: 'Merasa kelabakan dengan jadwal kuliah dan pengerjaan tugas', notes: 'Buat daftar prioritas harian, jangan hanya bergantung pada deadline.'
    },
    {
        id: 2, nim: '00000101334', fullName: 'Bibisana Kwary', email: 'bibisana.kwary@student.umn.ac.id',
        dateRequested: '2023-03-10', dateProposed: '2025-03-15', consultationType: 'Layanan Konseling', status: 'Solved',
        description: '', notes: ''
    },
    {
        id: 3, nim: '00000131334', fullName: 'Kevin Sajua', email: 'kevin.sajua@student.umn.ac.id',
        dateRequested: '2023-04-15', dateProposed: '2025-04-26', consultationType: 'Pengajuan Wawancara', status: 'Solved',
        description: '', notes: ''
    }
];

document.addEventListener('DOMContentLoaded', function () {
    const tbody = document.querySelector('table tbody'); 
    historyData.forEach(entry => { const row = document.createElement('tr'); 
        row.innerHTML = ` <th scope="row">${entry.id}</th> 
        <td>${entry.nim}</td> 
        <td>${entry.fullName}</td> 
        <td>${entry.email}</td> 
        <td>${entry.dateRequested}</td> 
        <td>${entry.dateProposed}</td> 
        <td>${entry.consultationType}</td> 
        <td>${entry.status}</td> 
        <td><button class="btn btn-primary view-detail" data-id="${entry.id}">View Detail</button></td> `; 
        tbody.appendChild(row); }); 
        
        document.querySelectorAll('.view-detail').forEach(button => { button.addEventListener('click', function () { 
            const id = this.getAttribute('data-id'); 
            const entry = historyData.find(e => e.id == id); 
            document.getElementById('popup-name').textContent = `Full Name: ${entry.fullName}`; 
            document.getElementById('popup-nim').textContent = `NIM: ${entry.nim}`; 
            document.getElementById('popup-description').textContent = `Description: ${entry.description}`; 
            document.getElementById('popup-notes').textContent = `Notes: ${entry.notes}`; 
            document.getElementById('popup').style.display = 'block'; 
            const popupBackground = document.getElementById('popup-background'); 
            if (popupBackground) { popupBackground.classList.add('blur'); } 
        }); 
    }); 
    const closeButton = document.querySelector('.close-btn'); 
    if (closeButton) { 
        closeButton.addEventListener('click', function () { 
            document.getElementById('popup').style.display = 'none'; 
            const popupBackground = document.getElementById('popup-background'); 
            if (popupBackground) { popupBackground.classList.remove('blur'); } 
        });
     }
});