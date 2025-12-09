# DataVis Assignment 2

This repository contains the bare-bones files to start up and solve the second assignment of the DataVis course at TU Dresden. 

It also contains the sample cars.csv dataset -- remember, it contains some errors! 

## Local development: 
Pre-requisite: [Node.js](https://nodejs.org/en). Install `serve` using: 
> npm install serve --global 

And start the application using 
> serve -p 8000 

You should then be able to see your website at [http://localhost:8000](http://localhost:8000). 

*Note:* feel free to explore other development environments such as [Vite](https://vite.dev/), [Flask (python)](https://flask.palletsprojects.com/en/stable/), etc. 

## Debugging: 
Feel free to make extensive use of your browser's development tools! 
In chrome-based browsers, you can simply use Ctrl+J to open the browser console, which will show all the `console.log` and similar that you write in the code. 


------------------------------------------------------


## Task description

In first place, I created a Jupyter Notebook (Visualization Preview.ipynb), in which I made an EDA of the whole data, and identified possible candidates for doing my scatterplot. Watched for correlations, outliers, null values and possible inconsistencies in the data.

After detecting outliers, I realized it was convenient to use attributes which did not have that many outliers as for the whole table, so I used attributes Engine Size, Horsepower, Weight and Color .

As a 3D Scatteplot would not be very intuitive, I decided to create a Scatterplot with a Bubble Plot addition, choosing the weight as a Bubble, so I made a draft of how the scatterplot would look in Google Colab.

Then, In the D3 File, I transferred my idea of using the variables and the same procedure (with a little of help from AI, since my Javascript skills are not too good), to the webpage, and I eventually generated it using React.js.

I did the same procedure, from removing outliers, removing inconsistencies and choosing the same values I choose in the EDA for the value, which helped me obtain an intuitive and clear scatteprlot of Enngine Size (x-axis), Horsepower (y-axis) and Weight (bubble). Separated by Car Type (in color).