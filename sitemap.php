
<?php
// Set the path to your sitemap XML file
$sitemap_file = '/home/horizon5/public_html/sitemap.xml';

// Define the base URL of the website
$base_url = 'https://www.horizonshealthcare.co.ke/';

// Create an array to hold the dynamically discovered URLs
$existing_urls = [];
$urls_to_add = [];

    // Normalize URLs by removing trailing slashes and extra spaces
    function normalize_url($url) {
        $url = rtrim($url, '/');  // Remove trailing slashes
        $url = trim($url);         // Remove leading/trailing spaces
        $url = strtok($url, '?');  // Remove anything after '?'
        return $url;
    }

// Check if the file exists
if (file_exists($sitemap_file)) {
    
    // Load the existing sitemap XML file
    $xml = simplexml_load_file($sitemap_file);

// Debugging: Check if sitemap XML loaded
if ($xml === false) {
    echo "Failed to load sitemap XML.";
    exit;
} else {
    echo "Sitemap XML loaded successfully.<br>";
}
echo "Sitemap XML content:\n";
print_r($xml);

    // Get the current date in the required format
    $current_date = date('Y-m-d\TH:i:s\Z');
    
    // Crawl the home page or any page that links to other pages
    $page = file_get_contents($base_url);
    
    // Use regular expressions to find all links (href attributes)
    preg_match_all('/<a\s+href="([^"]+)"/', $page, $matches);
    
    // Add each link found to the $urls_to_add array
    foreach ($matches[1] as $link) {
        // Convert relative URLs to absolute URLs
        if (strpos($link, 'http') !== 0) {
            $link = rtrim($base_url, '/') . '/' . ltrim($link, '/');
        }

        // Ensure the link is a valid path and not a fragment
        if (!empty($link) && $link != '#' && strpos($link, $base_url) === 0) {
            $urls_to_add[] = $link;
        }
    }
        // Debugging: Print raw URLs to compare
    echo "Existing URLs: ";
    print_r($existing_urls);
    echo "<br>New URLs to add (before removing duplicates): ";
    print_r($urls_to_add);
    
    
    $urls_to_add = array_map('normalize_url', $urls_to_add);  // Normalize new URLs
    // Remove duplicates from $urls_to_add
    $urls_to_add = array_unique($urls_to_add);  // This line removes any duplicate URLs

// Debugging: Verify new URLs to add
echo "URLs to add (after removing existing): ";
print_r($urls_to_add);
        // Debugging output
    echo "Existing URLs: ";
    print_r($existing_urls);
    echo "<br>New URLs to add (before removing duplicates): ";
    print_r($urls_to_add);

    // Initialize an array to hold existing URLs from the sitemap
    $existing_urls = [];
    // Iterate over each existing URL in the sitemap
    foreach ($xml->url as $url) {
        $loc = normalize_url((string)$url->loc);
        if (!in_array($loc, $existing_urls)) { // Prevent duplicate additions
    $existing_urls[] = $loc;
        // Update the <lastmod> tag for the current URL
        $url->lastmod = $current_date;

        // Add or update <changefreq> and <priority> tags
        if (!isset($url->changefreq)) {
            $url->addChild('changefreq', 'monthly'); // Default frequency
        } else {
            $url->changefreq = 'monthly'; // Update frequency if it exists
        }

        if (!isset($url->priority)) {
            $url->addChild('priority', '0.5'); // Default priority
        } else {
            $url->priority = '0.5'; // Update priority if it exists
        }
    }
    // Debugging: Verify populated existing URLs
echo "Populated Existing URLs: ";
print_r($existing_urls);
    // Remove duplicate <url> entries from the XML
    $unique_urls = [];
    foreach ($xml->url as $key => $url) {
        $loc = normalize_url((string)$url->loc);
        if (in_array($loc, $unique_urls)) {
            // If duplicate, unset this entry
            unset($xml->url[$key]);
        } else {
            // Otherwise, add to unique URLs list
            $unique_urls[] = $loc;
        }
    }
    
    // Debugging: Check if duplicates were removed
    echo "Unique URLs after removing duplicates from XML: ";
    print_r($unique_urls);
    
    // Debugging: Print the populated existing URLs
    echo "Populated Existing URLs: ";
    print_r($existing_urls);
    
    $urls_to_add = array_diff($urls_to_add, $existing_urls);  // Remove URLs already in the sitemap from $urls_to_add
        echo "<br>New URLs to add (after removing existing): ";
        print_r($urls_to_add);

}
}else {
    // If the sitemap file doesn't exist, create a new one
    echo "Sitemap file does not exist.";
    exit;
}

// At this point, the $urls_to_add contains the new pages discovered from crawling

// Add the new pages to the sitemap
foreach ($urls_to_add as $new_url) {
    $url_element = $xml->addChild('url');
    $url_element->addChild('loc', $new_url);
    $url_element->addChild('lastmod', $current_date);
    $url_element->addChild('changefreq', 'monthly');  // Or use another frequency like 'daily', 'weekly'
    $url_element->addChild('priority', '0.5');        // Or adjust the priority as needed
}

// Use DOMDocument to format the XML properly
$dom = new DOMDocument('1.0', 'UTF-8');
$dom->preserveWhiteSpace = false;
$dom->formatOutput = true;
$dom->loadXML($xml->asXML());

// Save the formatted XML back to the file
if ($dom->save($sitemap_file)) {
    echo "Sitemap updated and formatted successfully!";
} else {
    echo "Failed to update and format the sitemap.";
}
?>
