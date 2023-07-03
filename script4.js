const type = [];
const titles = [];

fetch('./DV_NEW_RECORDS.csv')
    .then(response => response.text())
    .then(csvData => {
        const rows = csvData.split('\n');

        rows.sort((a, b) => {
            const dateA = new Date(a.split(',')[4]);
            const dateB = new Date(b.split(',')[4]);
            return dateB - dateA;
        });
        const currentDate = new Date();
        const past30Days = new Date();
        past30Days.setDate(currentDate.getDate() - 30);


        rows.forEach(row => {
            const [category, subcat, borehole, block, date] = row.split(',');
            const rowDate = new Date(date);
            if (rowDate >= past30Days && rowDate <= currentDate) {
                if (titles.indexOf(category) == -1) {
                    titles.push(category);
                    type.push([]);
                    type[type.length - 1].push([date, subcat, borehole, block]);
                }
                else {
                    type[titles.indexOf(category)].push([date, subcat, borehole, block]);
                }
            }
        });


        // for (let i = 0; i < titles.length - 1; i++) {
        //     for (let j = 0; j < titles.length - 1 - i; j++) {
        //         if (titles[j] > titles[j + 1]) {
        //             // Swap elements if they are in the wrong order
        //             var temp = titles[j];
        //             titles[j] = titles[j + 1];
        //             titles[j + 1] = temp;

        //             var temp = type[j];
        //             type[j] = type[j + 1];
        //             type[j + 1] = temp;
        //         }
        //     }
        // }

    })
    .catch(error => {
        console.error('Error:', error);
    });


var currentCategoryIndex = 0;
fetchCategoryData(currentCategoryIndex);

function fetchCategoryData(index) {
    // Get the current category data
    var currentCategory = type[index];
    var name_file = titles[currentCategoryIndex];

    // Generate HTML content for the latest entries
    var outputDiv = document.getElementById('output');
    var html = '<h3 style="text-align: center;"><u>' + name_file + '</u></h3> ';
    if (currentCategory.length === 0) {
        html += '<p style="text-align: center;">No recent records found</p>'
    }
    else {
        html += '<table id="output-table" style="margin-left: auto; margin-right:auto;" class="table"><tr><th>Sr. No.</th><th scope="col">Date</th><th scope="col">Sub-category</th><th scope="col">Borehole</th><th scope="col">Block Name</th></tr> ';

        // Iterate over the current category data
        var ind = 1;
        for (let i = 0; i < currentCategory.length; i++) {
            var date = currentCategory[i][0];
            var subcat = currentCategory[i][1];
            var borehole = currentCategory[i][2];
            var block = currentCategory[i][3];
            html += '<tr><td>' + ind + '</td><td> ' + formatDate(date) + '</td><td>' + subcat + '</td><td>' + borehole + '</td><td>' + block + '</td></tr>';
            ind++;
        }
        html += '</table>';


    }
    // Insert the HTML content into the output div
    outputDiv.innerHTML = html;
}

function showPrevious() {
    if (currentCategoryIndex > 0) {
        currentCategoryIndex--;
        fetchCategoryData(currentCategoryIndex);;
    }
    // startIncrementing();
}

function showNext() {
    if (currentCategoryIndex < type.length - 1) {
        currentCategoryIndex++;
        fetchCategoryData(currentCategoryIndex);;
    }
    // startIncrementing();
}

// Function to format the date as dd:mm:yy
function formatDate(dateString) {
    var date = new Date(dateString);
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear().toString().slice(-2);
    if (month < 10) {
        month = "0" + month;
    }
    if (day < 10) {
        day = "0" + day;
    }
    return day + '-' + month + '-' + year;
}

function incrementCategoryIndex() {
    currentCategoryIndex++;
    if (currentCategoryIndex >= type.length) {
        currentCategoryIndex = 0;
    }

    // Call the fetchCategoryData function with the updated index
    fetchCategoryData(currentCategoryIndex);
}

var intervalId = 0;
// Function to start the incrementing process
function startIncrementing() {
    // Clear any existing interval
    stopIncrementing();

    // Start the interval and store the interval ID
    intervalId = setInterval(incrementCategoryIndex, 5000);
}

// Function to stop the incrementing process
function stopIncrementing() {
    clearInterval(intervalId);
}

// Start the incrementing process initially
startIncrementing();
