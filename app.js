// 1. MENGAMBIL ELEMEN TO DO LIST 
const inputTask = document.getElementById('inputTask');
const listContainer = document.getElementById('listContainer');
const tombol = document.getElementById('tombol');
const totalCount = document.getElementById('totalCount');
const doneCount = document.getElementById('doneCount');
const pendingCount = document.getElementById('pendingCount');


// 2. MENAMBAH TUGAS BARU 
function addTask() {
    const taskText = inputTask.value.trim();

    // Validasi: tolak input kosong atau hanya spasi
    if (taskText === '') {
        alert('Kamu belum memasukkan to do list!');
        return;
    }

    const li = document.createElement('li');
    li.textContent = taskText;
    listContainer.append(li);

    // Tombol hapus (×) di dalam setiap tugas
    const span = document.createElement('span');
    span.textContent = '\u00d7';
    li.append(span);

    inputTask.value = '';
    saveData();
    updateStats();
}

// Tambah tugas lewat klik tombol
tombol.addEventListener('click', addTask);

// Tambah tugas lewat tombol Enter
inputTask.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        addTask();
    }
});


// 3. MENANDAI SELESAI & MENGHAPUS TUGAS 
listContainer.addEventListener('click', function(e) {
    if (e.target.tagName === 'LI') {
        // Klik teks tugas: tambah/hapus class "done" (dicoret lewat CSS)
        e.target.classList.toggle('done');
    } else if (e.target.tagName === 'SPAN') {
        // Klik tombol ×: hapus tugas dengan remove()
        e.target.parentElement.remove();
    }
    saveData();
    updateStats();
});


// 4. REKAP STATISTIK 
function updateStats() {
    const total = listContainer.querySelectorAll('li').length;
    const done = listContainer.querySelectorAll('li.done').length;

    totalCount.textContent = total;
    doneCount.textContent = done;
    pendingCount.textContent = total - done;
}


// 5. PENYIMPANAN DATA (localStorage) 
function saveData() {
    localStorage.setItem('data', listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem('data') || '';
}


// 6. DIJALANKAN SAAT HALAMAN DIBUKA 
showTask();
updateStats();