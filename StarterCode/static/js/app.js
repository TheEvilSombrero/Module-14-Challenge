// Define the URL for the JSON file
var url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json';

// Use D3 to fetch the JSON data
d3.json(url).then(function(data) {
  // Extract the necessary data from the JSON
  var samples = data.samples;
  var names = data.names;

  // Get the dropdown select element
  var dropdown = d3.select('#dropdown');

  // Populate the dropdown with sample names
  dropdown
    .selectAll('option')
    .data(names)
    .enter()
    .append('option')
    .text(function(d) {
      return d;
    });

  // Set the initial sample
  var initialSample = samples[0];

  // Create the bar chart
  createBarChart(initialSample);

  // Handle dropdown selection change
  dropdown.on('change', function() {
    // Get the selected sample value
    var selectedSample = samples.find(function(sample) {
      return sample.id === this.value;
    }, this).sample_values;

    // Update the bar chart with the selected sample
    updateBarChart(selectedSample);
  });

  // Function to create the initial bar chart
  function createBarChart(sample) {
    var barData = [
      {
        y: sample.otu_ids.slice(0, 10).map(function(id) {
          return `OTU ${id}`;
        }),
        x: sample.sample_values.slice(0, 10),
        text: sample.otu_labels.slice(0, 10),
        type: 'bar',
        orientation: 'h'
      }
    ];

    var layout = {
      title: 'Top 10 OTUs',
      xaxis: { title: 'Sample Values' },
      yaxis: { title: 'OTU IDs' }
    };

    Plotly.newPlot('chart', barData, layout);
  }

  // Function to update the bar chart
  function updateBarChart(sample) {
    var update = {
      x: [sample.slice(0, 10)],
      y: [sample.otu_ids.slice(0, 10).map(function(id) {
        return `OTU ${id}`;
      })],
      text: [sample.otu_labels.slice(0, 10)]
    };

    Plotly.update('chart', update);
  }
}).catch(function(error) {
  // Handle any errors that occur during the request
  console.error('Error loading the JSON file:', error);
});
