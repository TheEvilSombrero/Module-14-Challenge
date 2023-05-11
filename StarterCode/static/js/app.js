// Define the URL for the JSON file
var url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json';

d3.json(url).then(function(data) {
    console.log(data)

    // Array to hold all ID names
    var names = data.samples.map(x => x.id)

    // Options for dropdown menu 
    names.forEach(function(name) {
        d3.select('#selDataset')
            .append('option')
            .text(name)
    });

    // Creating arrays for sample_values, otu_ids, otu_labels
    var sample_values = data.samples.map(x => x.sample_values)
    var otu_ids = data.samples.map(x => x.otu_ids)
    var otu_labels = data.samples.map(x => x.otu_labels)

    // Sorting out top 10 OTUs
    
});