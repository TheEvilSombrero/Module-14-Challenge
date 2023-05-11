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

    // Sorting out top 10 OTUs in sample_values, otu_ids, otu_labels 
    // Sample values
    var sorted_sample_values = sample_values.sort(function(nOne, nTwo){return nTwo-nOne})
    var top_ten_otu = sorted_sample_values.map(x => x.slice(0, 10))
    // otu_ids
    var sorted_ids = otu_ids.sort(function(nOne, nTwo){return nTwo-nOne})
    var top_ids = sorted_ids.map(x => x.slice(0, 10))
    // otu_labels
    var sorted_labels = otu_labels.sort(function(nOne, nTwo){return nTwo-nOne})
    var top_ten_labels = sorted_labels.map(x => x.slice(0, 10))

    // First ID to display on page when it loads 
    var firstID = data.metadata[0] 
    var sampleMetadata1 = d3.select('#sample-metadata').selectAll('h1')
});