import wixData from 'wix-data';

$w.onReady(() => {
    console.log("Page ready");

    // Connect button events
    $w("#button1").onClick(runSearch);
    $w("#resetButton").onClick(resetFilters);

    // Run search when dropdown values change
    $w("#dropdown1, #dropdown2, #dropdown3, #dropdown4").onChange(runSearch);

    // Populate dropdown options dynamically
    populateDropdowns();

    // Load all products initially
    runSearch();
});

// 🔍 Search function
function runSearch() {
    console.log("Running search...");

    let query = wixData.query("TireImage");

    const filters = {
        TireBrand: $w("#dropdown1").value,
        TireType: $w("#dropdown2").value,
        TireRim: $w("#dropdown3").value,
        TireSize: $w("#dropdown4").value
    };

    for (let key in filters) {
        const value = filters[key];
        if (value && value !== "") {
            query = query.contains(key, value);
            console.log(`Filtering ${key}:`, value);
        }
    }

    query.find()
        .then(results => {
            console.log("Results:", results.items.length);
            $w("#repeater1").data = results.items;

            $w("#repeater1").onItemReady(($item, itemData) => {
                $item("#textBrand").text = itemData.TireBrand || "";
                $item("#textType").text = itemData.TireType || "";
                $item("#textRim").text = itemData.TireRim || "";
                $item("#textSize").text = itemData.TireSize || "";
                // $item("#image1").src = itemData.TireImage;
            });
        })
        .catch(err => {
            console.error("Search error:", err);
        });
}

// Reset function — clears filters and shows all products
function resetFilters() {
    console.log("Resetting filters...");

    ["#dropdown1", "#dropdown2", "#dropdown3", "#dropdown4"].forEach(id => {
        const dd = $w(id);
        if (dd.options.length > 0) {
            dd.selectedIndex = 0;
            dd.enable();
        }
    });

    // Show all products after reset
    runSearch();
}

// load dropdown options from the database
function populateDropdowns() {
    const dropdownMap = {
        "#dropdown1": "TireBrand",
        "#dropdown2": "TireType",
        "#dropdown3": "TireRim",
        "#dropdown4": "TireSize"
    };

    for (let dropdownId in dropdownMap) {
        const fieldName = dropdownMap[dropdownId];

        wixData.query("TireImage")
            .distinct(fieldName)
            .then(results => {
                const options = [{ label: `All ${fieldName}`, value: "" }]
                    .concat(results.items.map(val => ({ label: val, value: val })));
                $w(dropdownId).options = options;
            })
            .catch(err => {
                console.error(`Error loading ${fieldName}:`, err);
            });
    }
}

