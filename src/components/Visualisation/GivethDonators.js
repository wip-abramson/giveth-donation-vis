import React from 'react';
import * as d3 from 'd3';

const GivethDonators = ({donationData}) => {

    // const [giverNodes, setGiverNodes] = React.useState([]);
    // const [donationLinks, setDonationLinks] = React.useState([]);

    React.useEffect(() => {
        console.log("Mounted");
        console.log(donationData)
        createNodesAndLinks();
    }, []);

    const createNodesAndLinks = () => {
        let includedGiverIds = [];
        let nodes = [];
        let links = [];
        donationData.map(donation => {
            if (!includedGiverIds.includes(donation.giverId)) {
                nodes.push({"id": donation.giverId})
            }
            if (!includedGiverIds.includes(donation.receiverId)) {
                nodes.push({"id": donation.receiverId})
            }
            links.push({"source": donation.giverId, "target": donation.receiverId, "amount": donation.amount})
        })
        // console.log(nodes);
        // console.log(links);
        // setGiverNodes(nodes);
        // console.log(giverNodes)
        // setDonationLinks(links);
        drawChart(nodes, links)
    }



    const drawChart = (nodes, links) => {
        const height = 700;
        const width = 700;

        console.log(nodes);
        console.log(links)

        const svg = d3.select("#d3-container").append("svg").attr("width", width).attr("height", height);

        const simulation = d3.forceSimulation()
            .nodes(nodes);

        //Create the link force
        //We need the id accessor to use named sources and targets
        let linkForce =  d3.forceLink(links)
            .id(function(d) { return d.id; });

        simulation
            .force("charge_force", d3.forceManyBody())
            .force("center_force", d3.forceCenter(width / 2, height / 2))
            .force("links",linkForce);

        let node = svg.append("g")
            .attr("class", "nodes")
            .selectAll("circle")
            .data(nodes)
            .enter()
            .append("circle")
            .attr("r", 5)
            .attr("fill", "red");

        //draw lines for the links
        let link = svg.append("g")
            .attr("class", "links")
            .selectAll("line")
            .data(links)
            .enter().append("line")
            .attr("stroke-width", 2)
            .attr("fill", "blue");

        let linkLabels = link.append('text')
            .attr("x", function(d) { return (d.x1 + d.x2) / 2; })
            .attr("y", function(d) { return (d.y1 + d.y2) / 2; })
            .text(function(d) {return d.amount})
            .attr("font-family", "sans-serif")
            .attr("font-size", "20px")
            .attr("fill", "red");

        function tickActions() {
            //update circle positions each tick of the simulation
            node
                .attr("cx", function(d) { return d.x; })
                .attr("cy", function(d) { return d.y; });

            //update link positions
            //simply tells one end of the line to follow one node around
            //and the other end of the line to follow the other node around
            link
                .attr("x1", function(d) { return d.source.x; })
                .attr("y1", function(d) { return d.source.y; })
                .attr("x2", function(d) { return d.target.x; })
                .attr("y2", function(d) { return d.target.y; });
        }



        simulation.on("tick", tickActions );

    };

    return (
     <div id='d3-container'></div>
    )
}

export default GivethDonators;
