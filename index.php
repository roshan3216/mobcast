<?php

    $curl = curl_init();
    
    curl_setopt_array($curl, array(
      CURLOPT_URL => 'https://timesofindia.indiatimes.com/rssfeeds/-2128838597.cms?feedtype=json',
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_ENCODING => '',
      CURLOPT_MAXREDIRS => 10,
      CURLOPT_TIMEOUT => 0,
      CURLOPT_FOLLOWLOCATION => true,
      CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
      CURLOPT_CUSTOMREQUEST => 'GET',
    ));
    
    $response = curl_exec($curl);
    
    curl_close($curl);
    $data = json_decode($response);

?>



<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="styles.css">
  <!-- <link rel="stylesheet" href="newstyle.css"> -->
  <title>News Table</title>

  <script> const newsData = <?php echo json_encode($data) ?></script>
</head>
<body>

  <div class ="content-wrapper">
  
    <div id = 'news-heading-container'></div>


    <div id="search-sort-container">
      <input type="text" id="search-input" placeholder="Search headlines...">
      <button class = 'sort-btn' id="sort-asc-btn">Sort A-Z</button>
      <button class = 'sort-btn' id="sort-desc-btn">Sort Z-A</button>
    </div>

    <div id="news-table-container">
        <table id="news-table" class ='table-container'>
        <!-- Table content will be dynamically added here -->
        </table>
    </div>

    <div id="pagination-container"></div>

  </div>
  <script src="script.js"></script>
</body>
</html>
