// Sample student consultation data
const studentConsultations = [
    {
        id: 1,
        type: 'Layanan Konseling',
        dateRequested: '2024-03-15',
        dateProposed: '2024-03-20',
        description: 'Konsultasi mengenai manajemen waktu dan stress',
        status: 'Pending',
        notes: 'Menunggu konfirmasi dari konselor'
    },
    {
        id: 2,
        type: 'Pengajuan Wawancara',
        dateRequested: '2024-03-10',
        dateProposed: '2024-03-17',
        description: 'Wawancara terkait perencanaan karir',
        status: 'Approved',
        notes: 'Silakan hadir sesuai jadwal yang telah ditentukan'
    },
    {
        id: 3,
        type: 'Layanan Konseling',
        dateRequested: '2024-02-28',
        dateProposed: '2024-03-05',
        description: 'Konsultasi akademik',
        status: 'Completed',
        notes: 'Konsultasi telah selesai dilaksanakan'
    }
];

document.addEventListener('DOMContentLoaded', function() {
    const cardsContainer = document.getElementById('consultationCards');

    studentConsultations.forEach(consultation => {
        const statusClass = getStatusClass(consultation.status);
        const statusBadge = getStatusBadge(consultation.status);

        const cardHtml = `
            <div class="col-md-6 col-lg-4">
                <div class="card status-card ${statusClass} shadow-sm">
                    <div class="card-header d-flex justify-content-between align-items-center">
                        <h5 class="card-title mb-0">${consultation.type}</h5>
                        ${statusBadge}
                    </div>
                    <div class="card-body">
                        <div class="mb-3">
                            <small class="text-muted">Requested Date:</small>
                            <p class="mb-0">${consultation.dateRequested}</p>
                        </div>
                        <div class="mb-3">
                            <small class="text-muted">Proposed Date:</small>
                            <p class="mb-0">${consultation.dateProposed}</p>
                        </div>
                        <div class="mb-3">
                            <small class="text-muted">Description:</small>
                            <p class="mb-0">${consultation.description}</p>
                        </div>
                        <div>
                            <small class="text-muted">Notes:</small>
                            <p class="mb-0">${consultation.notes}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;

        cardsContainer.insertAdjacentHTML('beforeend', cardHtml);
    });
});

function getStatusClass(status) {
    switch(status.toLowerCase()) {
        case 'pending':
            return 'status-pending';
        case 'approved':
            return 'status-approved';
        case 'rejected':
            return 'status-rejected';
        default:
            return '';
    }
}

function getStatusBadge(status) {
    let badgeClass = '';
    switch(status.toLowerCase()) {
        case 'pending':
            badgeClass = 'bg-warning';
            break;
        case 'approved':
            badgeClass = 'bg-success';
            break;
        case 'completed':
            badgeClass = 'bg-info';
            break;
        case 'rejected':
            badgeClass = 'bg-danger';
            break;
        default:
            badgeClass = 'bg-secondary';
    }
    return `<span class="badge status-badge ${badgeClass}">${status}</span>`;
}