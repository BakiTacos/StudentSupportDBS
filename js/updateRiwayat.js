// Sample data structure for student consultation history

const studentHistory = [
    {
        nim: '00000111231',
        fullName: 'Benedict Marvin',
        consultations: [
            {
                id: 1,
                dateRequested: '2025-03-01',
                dateProposed: '2025-03-07',
                consultationType: 'Layanan Konseling',
                status: 'Solved',
                description: 'Merasa kelabakan dengan jadwal kuliah dan pengerjaan tugas',
                notes: 'Buat daftar prioritas harian, jangan hanya bergantung pada deadline.'
            }
        ]
    },
    {
        nim: '00000101334',
        fullName: 'Bibisana Kwary',
        consultations: [
            {
                id: 2,
                dateRequested: '2023-03-10',
                dateProposed: '2025-03-15',
                consultationType: 'Layanan Konseling',
                status: 'Solved',
                description: 'Kesulitan beradaptasi dengan lingkungan kampus',
                notes: 'Ikut kegiatan organisasi untuk menambah relasi.'
            }
        ]
    },
    {
        nim: '00000131334',
        fullName: 'Kevin Sajua',
        consultations: [
            {
                id: 3,
                dateRequested: '2023-04-15',
                dateProposed: '2025-04-26',
                consultationType: 'Pengajuan Wawancara',
                status: 'Solved',
                description: 'Ingin konsultasi mengenai karir',
                notes: 'Diberikan rekomendasi untuk mengikuti program magang.'
            }
        ]
    }
];

document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const searchResults = document.getElementById('searchResults');

    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase();
        searchResults.innerHTML = '';

        const filteredStudents = studentHistory.filter(student =>
            student.fullName.toLowerCase().includes(searchTerm) ||
            student.nim.includes(searchTerm)
        );

        filteredStudents.forEach((student, index) => {
            const accordionItem = document.createElement('div');
            accordionItem.className = 'accordion-item';
            
            const headerHtml = `
                <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" 
                            data-bs-target="#collapse${index}">
                        ${student.fullName} (${student.nim})
                    </button>
                </h2>
            `;

            const consultationsHtml = student.consultations.map(consultation => `
                <div class="consultation-entry p-3 border-bottom">
                    <div class="mb-3">
                        <h5>Consultation on ${consultation.dateRequested}</h5>
                        <div class="form-group mb-2">
                            <label>Type:</label>
                            <select class="form-control consultation-type">
                                <option value="Layanan Konseling" ${consultation.consultationType === 'Layanan Konseling' ? 'selected' : ''}>Layanan Konseling</option>
                                <option value="Pengajuan Wawancara" ${consultation.consultationType === 'Pengajuan Wawancara' ? 'selected' : ''}>Pengajuan Wawancara</option>
                            </select>
                        </div>
                        <div class="form-group mb-2">
                            <label>Status:</label>
                            <select class="form-control consultation-status">
                                <option value="Pending" ${consultation.status === 'Pending' ? 'selected' : ''}>Pending</option>
                                <option value="In Progress" ${consultation.status === 'In Progress' ? 'selected' : ''}>In Progress</option>
                                <option value="Solved" ${consultation.status === 'Solved' ? 'selected' : ''}>Solved</option>
                                <option value="Cancelled" ${consultation.status === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
                            </select>
                        </div>
                        <div class="form-group mb-2">
                            <label>Description:</label>
                            <textarea class="form-control consultation-description" rows="3">${consultation.description}</textarea>
                        </div>
                        <div class="form-group mb-2">
                            <label>Notes:</label>
                            <textarea class="form-control consultation-notes" rows="3">${consultation.notes}</textarea>
                        </div>
                        <button class="btn btn-primary save-changes" data-consultation-id="${consultation.id}" data-student-nim="${student.nim}">Save Changes</button>
                    </div>
                </div>
            `).join('');

            const bodyHtml = `
                <div id="collapse${index}" class="accordion-collapse collapse">
                    <div class="accordion-body">
                        ${consultationsHtml}
                    </div>
                </div>
            `;

            accordionItem.innerHTML = headerHtml + bodyHtml;
            searchResults.appendChild(accordionItem);
        });

        if (filteredStudents.length === 0) {
            searchResults.innerHTML = '<div class="alert alert-info">No results found</div>';
        }
    }

    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    // Handle saving changes to consultation records
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('save-changes')) {
            const consultationId = e.target.dataset.consultationId;
            const studentNim = e.target.dataset.studentNim;
            const consultationEntry = e.target.closest('.consultation-entry');

            const updatedData = {
                consultationType: consultationEntry.querySelector('.consultation-type').value,
                status: consultationEntry.querySelector('.consultation-status').value,
                description: consultationEntry.querySelector('.consultation-description').value,
                notes: consultationEntry.querySelector('.consultation-notes').value
            };

            // Find and update the consultation in our data structure
            const student = studentHistory.find(s => s.nim === studentNim);
            if (student) {
                const consultation = student.consultations.find(c => c.id === parseInt(consultationId));
                if (consultation) {
                    Object.assign(consultation, updatedData);
                    
                    // Show success message
                    const alert = document.createElement('div');
                    alert.className = 'alert alert-success mt-2';
                    alert.textContent = 'Changes saved successfully!';
                    consultationEntry.appendChild(alert);

                    // Remove the alert after 3 seconds
                    setTimeout(() => {
                        alert.remove();
                    }, 3000);
                }
            }
        }
    });
});