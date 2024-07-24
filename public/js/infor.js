
window.onload = function() {
    var showListDiv = document.querySelector('#showList');
    if (showListDiv.scrollHeight > showListDiv.clientHeight) {
        // Scrollbar is visible, do nothing
    } else {
        // Scrollbar is not visible, add padding
        showListDiv.classList.add('pr-4');
    }
};

function updateShowList(members) {
    const showListDiv = document.querySelector('#showList');
    showListDiv.innerHTML = ''; // Clear the existing contents
    if (Array.isArray(members)) {
        members.forEach((member, index) => {
        const memberDiv = document.createElement('div');
        memberDiv.className = 'grid grid-cols-[100px_repeat(13,minmax(0,1fr))_100px] text-center font-bold text-[#ad0214] py-2 gap-2';
        
        const indexDiv = document.createElement('div');
        indexDiv.className = 'bg-red-100 py-2 px-4 rounded-xl col-span-1';
        indexDiv.textContent = index;
        memberDiv.appendChild(indexDiv);

        const rollnoDiv = document.createElement('div');
        rollnoDiv.className = 'bg-red-100 py-2 px-4 rounded-xl col-span-2';
        rollnoDiv.textContent = member.rollno.toUpperCase();
        memberDiv.appendChild(rollnoDiv);

        const nameDiv = document.createElement('div');
        nameDiv.className = 'bg-red-100 py-2 px-4 rounded-xl col-span-3';
        nameDiv.textContent = member.fullname;
        memberDiv.appendChild(nameDiv);

        const deptDiv = document.createElement('div');
        deptDiv.className = 'bg-red-100 py-2 px-4 rounded-xl col-span-2';
        deptDiv.textContent = member.dept.name;
        memberDiv.appendChild(deptDiv);

        const roleDiv = document.createElement('div');
        roleDiv.className = 'bg-red-100 py-2 px-4 rounded-xl col-span-2';
        roleDiv.textContent = member.role.name;
        memberDiv.appendChild(roleDiv);

        const mailDiv = document.createElement('div');
        mailDiv.className = 'bg-red-100 py-2 px-4 rounded-xl col-span-3';
        mailDiv.textContent = member.mail;
        memberDiv.appendChild(mailDiv);

        const genDiv = document.createElement('div');
        genDiv.className = 'bg-red-100 py-2 px-4 rounded-xl col-span-1';
        genDiv.textContent = member.gen;
        memberDiv.appendChild(genDiv);

        const editDiv = document.createElement('div');
        editDiv.className = 'bg-red-100 py-2 px-4 rounded-xl col-span-1 flex flex-row justify-between';
        
        const editCheckbox = document.createElement('input');
        editCheckbox.type = 'checkbox';
        editCheckbox.id = 'deleteCheckbox';
        editCheckbox.value = member.rollno;
        editDiv.appendChild(editCheckbox);
        
        const editLink = document.createElement('a');
        editLink.href = '/updateInsert?id=' + member.rollno;
        editLink.className = 'flex material-icons';
        editLink.textContent = 'edit';
        editDiv.appendChild(editLink);
        
        memberDiv.appendChild(editDiv);

        showListDiv.appendChild(memberDiv);
        });
    } else {
        console.error('DB Error');
    }
}

document.querySelectorAll('.click a').forEach(function(a) {
    a.addEventListener('click', function(event) {
        event.preventDefault();
        const sortCriteria = a.id;
        fetch(`/infor/list?criteria=${sortCriteria}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                updateShowList(data.members);
                }
            )
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
            });
    });
});

const searchInput = document.querySelector('#searchInput');
searchInput.addEventListener('input', function(event) {
    const searchCriteria = 'search_"' + searchInput.value + '"';
    fetch(`/infor/list?criteria=${searchCriteria}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            updateShowList(data.members);
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
});

const deleteButton = document.querySelector('#deleteButton');
deleteButton.addEventListener('click', function() {
    const selectedCheckboxes = document.querySelectorAll('#showList input[type="checkbox"]:checked');
    if (selectedCheckboxes.length > 0) {
        if (confirm('Are you sure you want to delete the selected members?')) {
            const selectedRollnos = Array.from(selectedCheckboxes).map(checkbox => checkbox.value);
            fetch('/infor/delete', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ rollnos: selectedRollnos }),
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                updateShowList(data.members);
                console.log('Members deleted:', data.members);
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
            });
        }
    } else {
        alert('No members selected');
    }
});