document.addEventListener('DOMContentLoaded', function () {
    const appointmentTableBody = document.querySelector('#appointmentTable tbody');
    function getAppointments() {
        const appointments = localStorage.getItem('appointments');
        return appointments ? JSON.parse(appointments) : [];
    }

    function loadAppointments() {
        const appointments = getAppointments();
        appointmentTableBody.innerHTML = '';

        if (appointments.length === 0) {
            const emptyRow = document.createElement('tr');
            const emptyCell = document.createElement('td');
            emptyCell.colSpan = 5;
            emptyCell.textContent = 'No appointments found.';
            emptyRow.appendChild(emptyCell);
            appointmentTableBody.appendChild(emptyRow);
            return;
        }

        appointments.forEach((appointment, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${appointment.date}</td>
                <td>${appointment.department}</td>
                <td>${appointment.doctor}</td>
                <td>${appointment.time}</td>
                <td>
                    <button class="delete-button" data-index="${index}">Cancel</button>
                </td>
            `;
            appointmentTableBody.appendChild(row);
        });
    }

    function deleteAppointment(index) {
        const appointments = getAppointments();
        appointments.splice(index, 1);
        localStorage.setItem('appointments', JSON.stringify(appointments));
        loadAppointments();
    }

    appointmentTableBody.addEventListener('click', function (e) {
        if (e.target.classList.contains('delete-button')) {
            const index = e.target.dataset.index;
            if (confirm('Are you sure you want to cancel this appointment?')) {
                deleteAppointment(index);
            }
        }
    });
    loadAppointments();
});
