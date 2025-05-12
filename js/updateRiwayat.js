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
                    <h5>Consultation on ${consultation.dateRequested}</h5>
                    <p><strong>Type:</strong> ${consultation.consultationType}</p>
                    <p><strong>Status:</strong> ${consultation.status}</p>
                    <p><strong>Description:</strong> ${consultation.description}</p>
                    <p><strong>Notes:</strong> ${consultation.notes}</p>
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
});