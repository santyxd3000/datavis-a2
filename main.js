// main.js

window.onload = () => {
  console.log("Page loaded");
  drawBubblePlot();
};

function drawBubblePlot() {
  const margin = { top: 40, right: 150, bottom: 60, left: 70 },
        width  = 800 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

  const svg = d3.select("body")
    .append("svg")
      .attr("width",  width  + margin.left + margin.right)
      .attr("height", height + margin.top  + margin.bottom)
    .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

  d3.csv("cars.csv").then(data => {
    console.log("CSV loaded, rows:", data.length);
    console.log("Columns:", data.columns);

    // Map CSV columns to numeric fields we use
    data.forEach(d => {
      d.Horsepower = +d["Horsepower(HP)"];   // EXACT header
      d.EngineSize = +d["Engine Size (l)"];  // EXACT header
      d.Weight     = +d["Weight"];
      d.Type       = d["Type"];
    });

    // Remove invalid rows and Engine Size == 0
    const filtered = data.filter(d =>
      !isNaN(d.EngineSize) &&
      !isNaN(d.Horsepower) &&
      !isNaN(d.Weight) &&
      d.EngineSize !== 0
    );

    console.log("Filtered rows:", filtered.length);

    // Scales
    const x = d3.scaleLinear()
      .domain([0, d3.max(filtered, d => d.Horsepower) * 1.05])
      .range([0, width]);

    const y = d3.scaleLinear()
      .domain([0, d3.max(filtered, d => d.EngineSize) * 1.05])
      .range([height, 0]);

    const r = d3.scaleSqrt()
      .domain(d3.extent(filtered, d => d.Weight))
      .range([3, 18]);

    const types = [...new Set(filtered.map(d => d.Type))];
    const color = d3.scaleOrdinal()
      .domain(types)
      .range(d3.schemeCategory10);

    // Axes
    const xAxis = d3.axisBottom(x);
    const yAxis = d3.axisLeft(y);

    svg.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(xAxis);

    svg.append("g")
      .call(yAxis);

    // Labels
    svg.append("text")
      .attr("x", width / 2)
      .attr("y", height + 40)
      .attr("text-anchor", "middle")
      .attr("font-size", "14px")
      .text("Horsepower (HP)");

    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -height / 2)
      .attr("y", -45)
      .attr("text-anchor", "middle")
      .attr("font-size", "14px")
      .text("Engine Size (l)");

    svg.append("text")
      .attr("x", width / 2)
      .attr("y", -10)
      .attr("text-anchor", "middle")
      .attr("font-size", "16px")
      .attr("font-weight", "bold")
      .text("Engine Size vs Horsepower — Bubble = Weight, Color = Type");

    // Bubbles
    svg.selectAll("circle")
      .data(filtered)
      .enter()
      .append("circle")
        .attr("cx", d => x(d.Horsepower))
        .attr("cy", d => y(d.EngineSize))
        .attr("r",  d => r(d.Weight))
        .attr("fill", d => color(d.Type))
        .attr("opacity", 0.7)
        .attr("stroke", "white");

    // Legend
    const legend = svg.append("g")
      .attr("transform", `translate(${width + 20}, 10)`);

    types.forEach((t, i) => {
      const g = legend.append("g")
        .attr("transform", `translate(0, ${i * 25})`);

      g.append("circle")
        .attr("r", 7)
        .attr("cx", 0)
        .attr("cy", 0)
        .attr("fill", color(t))
        .attr("opacity", 0.8);

      g.append("text")
        .attr("x", 15)
        .attr("y", 4)
        .attr("font-size", "12px")
        .text(t);
    });
  })
  .catch(error => console.error("Error loading or processing the CSV: ", error));
}
