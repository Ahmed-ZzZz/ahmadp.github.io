<?php
     
    include '../koneksi.php';
    session_start();
    if($_SESSION['status'] != "admin_login"){
        header("location:../admin_login.php?alert=belum_login");
    }

    $query = "SELECT YEAR(riwayat_waktu) AS tahun, MONTH(riwayat_waktu) AS bulan, COUNT(*) AS jumlah_pengguna
            FROM riwayat
            GROUP BY tahun, bulan
            ORDER BY tahun, bulan";

    $result = mysqli_query($koneksi, $query);

    $data = array();
    while ($row = mysqli_fetch_assoc($result)) {
        $data[] = $row;
    }

    // Konversi data ke format yang akan digunakan oleh Chart.js
    $dataPoints = array();
    foreach ($data as $row) {
        $dataPoints[] = array(
            "label" => "{$row['tahun']}-{$row['bulan']}",
            "y" => $row['jumlah_pengguna']
        );
    }

    // Output data dalam format JSON
    echo json_encode($dataPoints);

    mysqli_close($koneksi);
?>