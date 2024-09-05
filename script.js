const resultsData = [
    {
        name: "Sussy Curse",
        key: "sussyCurse",
        count: 0,
        baseProbability: 2,
        junkoShards: 3,
        expectedLigma: 0,
        credits: 1
    },
    {
        name: "Future Blessing",
        key: "futureBlessing",
        count: 0,
        baseProbability: 20,
        junkoShards: 1,
        expectedLigma: 0,
        credits: 0.1
    },
    {
        name: "Small Blessing",
        key: "smallBlessing",
        count: 0,
        baseProbability: 30,
        junkoShards: 1,
        expectedLigma: 0,
        credits: 0.2
    },
    {
        name: "Modest Blessing",
        key: "modestBlessing",
        count: 0,
        baseProbability: 30,
        junkoShards: 1,
        expectedLigma: 0.5,
        credits: 0.4
    },
    {
        name: "Blessing",
        key: "blessing",
        count: 0,
        baseProbability: 15,
        junkoShards: 1,
        expectedLigma: 1,
        credits: 0.6
    },
    {
        name: "Great Blessing",
        key: "greatBlessing",
        count: 0,
        baseProbability: 3,
        junkoShards: 2,
        expectedLigma: 2,
        credits: 0.8
    }
];

// Load saved counts from local storage
resultsData.forEach(result => {
    const savedCount = localStorage.getItem(result.key);
    if (savedCount !== null) {
        result.count = parseInt(savedCount);
    }
});

function updateLocalStorage() {
    resultsData.forEach(result => {
        localStorage.setItem(result.key, result.count);
    });
}

// Increment result count
function incrementResult(key) {
    const result = resultsData.find(r => r.key === key);
    if (result) {
        result.count++;
        updateLocalStorage();
        updateResultsTable();
    }
}

// Decrement result count
function decrementResult(key) {
    const result = resultsData.find(r => r.key === key);
    if (result && result.count > 0) {
        result.count--;
        updateLocalStorage();
        updateResultsTable();
    }
}

// Reset data
function resetData() {
    resultsData.forEach(result => {
        result.count = 0;
        localStorage.removeItem(result.key);
    });
    updateResultsTable();
}

// Calculate total counts and percentages
function calculateTotals() {
    const totalDraws = resultsData.reduce((total, result) => total + result.count, 0);
    const totals = {
        junkoShards: 0,
        expectedLigma: 0,
        credits: 0,
    };

    resultsData.forEach(result => {
        totals.junkoShards += result.junkoShards * result.count;
        totals.expectedLigma += result.expectedLigma * result.count;
        totals.credits += result.credits * result.count;

        // Calculate percentage of total
        result.percentage = totalDraws > 0 ? (result.count / totalDraws * 100).toFixed(2) : 0;
    });

    return { totalDraws, ...totals };
}

// Update the results table
function updateResultsTable() {
    const tableBody = document.getElementById("results-table-body");
    const totalCountElem = document.getElementById("total-count");
    const totalJunkoShardsElem = document.getElementById("total-junko-shards");
    const totalExpectedLigmaElem = document.getElementById("total-expected-ligma");
    const totalCreditsElem = document.getElementById("total-credits");

    tableBody.innerHTML = "";

    const { totalDraws, junkoShards, expectedLigma, credits } = calculateTotals();

    resultsData.forEach(result => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${result.name}</td>
            <td>${result.count}</td>
            <td>${result.percentage}%</td>
            <td>${result.baseProbability}%</td>
            <td>${result.junkoShards}</td>
            <td>${result.expectedLigma}</td>
            <td>${result.credits} million</td>
        `;
        tableBody.appendChild(row);
    });

    // Update total row
    totalCountElem.textContent = totalDraws;
    totalJunkoShardsElem.textContent = junkoShards;
    totalExpectedLigmaElem.textContent = expectedLigma;
    totalCreditsElem.textContent = credits.toFixed(1) + " million";
}

// Initial load
updateResultsTable();
