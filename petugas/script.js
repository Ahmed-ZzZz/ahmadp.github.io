// Fungsi untuk mengambil data dari PHP
function getData() {
    return fetch('grafik.php')
        .then(response => response.json())
        .then(data => {
            return data;
        });
}

// Fungsi untuk membuat grafik line
function createChart(data) {
    var ctx = document.getElementById('lineChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.map(function(item){
                return item.label;
            }), // Nama bulan
            datasets: [{
                label: 'Jumlah Pengunduh',
                data: data.map(function(item){
                    return item.y;
                }), // Jumlah pengguna per bulan
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                pointBackgroundColor: 'rgba(75, 192, 192, 1)',
                pointRadius: 5,
                fill: {
                    target: 'origin',
                    above: 'rgba(75, 192, 192, 0.2)'
                },
                tension : 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRation: true,
            scales: {
                x : {
                    title: {
                        display: true,
                        text: 'Bulan'
                    }
                },
                y : {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Jumlah Pengunduh'
                    }
                }
            },
            animation:{
                duration: 2000,
                easing: 'easeOutQuart'
            },
            plugins: {
                legend:{
                    display:false
                }
            }
        }
    });
}

// Ambil data dari PHP dan buat grafik
getData().then(data => {
    createChart(data);
});

window.addEventListener('resize', () => {
    var container = document.getElementById('grafik-unduh');
    var canvas = document.getElementById('lineChart');
    canvas.style.height = container.clientHeight + 'px';
    canvas.style.width = container.clientWidth + 'px';
});