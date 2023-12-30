//calculates for each position in a datset the average value:
function calculateAverages(datasets) {
    let sums = [];
    let counts = [];
  
    datasets.forEach(dataset => {
      dataset.forEach((value, index) => {
        sums[index] = sums[index] || 0;
        counts[index] = counts[index] || 0;

        sums[index] += value;
        counts[index]++;

      });
    });
//returns an array of values:
    return sums.map((sum, index) => sum / counts[index]);
  }


  