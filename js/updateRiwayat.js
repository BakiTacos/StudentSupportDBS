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

// Global functions for handling consultation actions
function showConsultationDetails(consultation) {
    const modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.id = 'detailsModal';
    modal.innerHTML = `
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Consultation Details</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <div class="mb-3">
                        <label class="form-label">Date Requested:</label>
                        <p>${consultation.dateRequested}</p>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Date Proposed:</label>
                        <p>${consultation.dateProposed}</p>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Type:</label>
                        <p>${consultation.consultationType}</p>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Description:</label>
                        <p>${consultation.description}</p>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    const modalInstance = new bootstrap.Modal(modal);
    modalInstance.show();
    modal.addEventListener('hidden.bs.modal', () => {
        document.body.removeChild(modal);
    });
}

function showNotes(consultation) {
    const modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.id = 'notesModal';
    modal.innerHTML = `
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Consultation Notes</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <div class="mb-3">
                        <label class="form-label">Notes:</label>
                        <p>${consultation.notes}</p>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    const modalInstance = new bootstrap.Modal(modal);
    modalInstance.show();
    modal.addEventListener('hidden.bs.modal', () => {
        document.body.removeChild(modal);
    });
}

function markAsCompleted(consultation) {
    consultation.status = 'Solved';
    performSearch(); // Refresh the table
}

function showNoResults() {
    const consultationTable = document.getElementById('consultationTable');
    consultationTable.innerHTML = `
        <tr>
            <td colspan="6" class="text-center">
                <div class="alert alert-info mb-0">No results found</div>
            </td>
        </tr>
    `;
}

function performSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
    const consultationTable = document.getElementById('consultationTable');

    if (!consultationTable) return;

    // Clear existing table content
    consultationTable.innerHTML = '';

    // Check if we have data
    if (!studentHistory || !Array.isArray(studentHistory)) {
        console.error('Student history data is not available');
        showNoResults();
        return;
    }

    const filteredStudents = studentHistory.filter(student =>
        student.fullName.toLowerCase().includes(searchTerm) ||
        student.nim.includes(searchTerm)
    );

    if (filteredStudents.length === 0) {
        showNoResults();
    } else {
        filteredStudents.forEach(student => {
            student.consultations.forEach(consultation => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${student.nim}</td>
                    <td>${student.fullName}</td>
                    <td>${consultation.dateRequested}</td>
                    <td>${consultation.consultationType}</td>
                    <td>
                        <span class="badge ${consultation.status === 'Solved' ? 'bg-success' : 'bg-warning'}">
                            ${consultation.status}
                        </span>
                    </td>
                    <td>
                        <button class="btn btn-info btn-sm" onclick="showConsultationDetails(${JSON.stringify(consultation).replace(/"/g, "'")});">Details</button>
                        <button class="btn btn-secondary btn-sm" onclick="showNotes(${JSON.stringify(consultation).replace(/"/g, "'")});">Notes</button>
                        ${consultation.status !== 'Solved' ? 
                            `<button class="btn btn-success btn-sm" onclick="markAsCompleted(${JSON.stringify(consultation).replace(/"/g, "'")});">Mark Completed</button>` : 
                            ''}
                    </td>
                `;
                consultationTable.appendChild(row);
            });
        });
    }
}

// Initialize the page when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');

    // Add event listeners for search
    searchInput.addEventListener('input', performSearch);
    searchButton.addEventListener('click', performSearch);

    // Load initial data
    performSearch();
});

// Load data when the script is first loaded
performSearch();