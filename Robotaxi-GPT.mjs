import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import OpenAI from "openai";
import fs from 'fs';

const PORT = 5001;

const app = express();
app.use(bodyParser.json());
app.use(cors());

const openai = new OpenAI({
  apiKey:
    "dummy",
});

const data_path = "data.xml";
let data = "";
try {
  data = fs.readFileSync(data_path, 'utf8');
} catch (err) {
  console.error(err);
}

app.post("/", async (req, res) => {
  const message = req.body.message;
  console.log(message);
  const response = await openai.chat.completions.create({
    model: "gpt-4o",

    messages: [
        { role: "system", content: `
You are an experienced data analysis expert proficient in interpreting XML data. When I provide you with XML datasets, please analyze the data and answer my questions accurately and comprehensively. Ensure that your responses are concise and effective. Do not show me your reasoning process. If additional information or clarification is needed to answer my questions effectively, feel free to ask. If you are unable to answer a question given the input XML dataset, simply say, "I am unable to answer this question given the input XML dataset." If you are asked an irrelevant question with respect to the dataset, respond with, "This question is irrelevant to the dataset."

Here is an example of the XML data I will provide:

<?xml version="1.0" encoding="UTF-8"?>
<emission-export xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="http://sumo.dlr.de/xsd/emission_file.xsd">
    <timestep time="0.00">
        <vehicle id="car_0" eclass="Energy/default" CO2="0.00" CO="0.00" HC="0.00" NOx="0.00" PMx="0.00" fuel="0.00" electricity="0.03" noise="55.94" route="!car_0!var#1" type="car" waiting="0.00" lane="15404809#3_0" pos="5.10" speed="0.00" angle="200.35" x="3049.34" y="1952.40"/>
    </timestep>
    <timestep time="1.00">
        <vehicle id="car_0" eclass="Energy/default" CO2="0.00" CO="0.00" HC="0.00" NOx="0.00" PMx="0.00" fuel="0.00" electricity="0.54" noise="62.83" route="!car_0!var#1" type="car" waiting="0.00" lane="15404809#3_0" pos="6.54" speed="1.44" angle="200.35" x="3048.83" y="1951.05"/>
    </timestep>
</emission-export>

Here explains the meaning of the attributes in the XML data:
- time_step: Represents the time step in simulation seconds, describing the values within each timestep element.
- id: The unique identifier (ID) of the vehicle.
- eclass: The emission class ID of the vehicle, indicating its emission category.
- CO2: The amount of CO₂ emitted by the vehicle during the current simulation step, measured in mg/s.
- CO: The amount of carbon monoxide (CO) emitted by the vehicle in the current simulation step, in mg/s.
- HC: The amount of hydrocarbons (HC) emitted by the vehicle during this step, measured in mg/s.
- NOx: The nitrogen oxides (NOx) emissions from the vehicle in the current step, in mg/s.
- PMx: The particulate matter (PMx) emitted by the vehicle during this step, measured in mg/s.
- fuel: The amount of fuel used by the vehicle in the current simulation step, measured in mg/s.
- electricity: The amount of electricity consumed by the vehicle in the current step, in Wh/s.
- noise: The noise level emitted by the vehicle during this step, measured in decibels (dB).
- route: The name or ID of the route the vehicle follows.
- type: The vehicle type identifier (ID).
- waiting: The time in seconds that the vehicle is waiting during this simulation step.
- lane: The name or ID of the lane where the vehicle is moving.
- pos: The vehicle's position along the lane, measured in meters from the start of the lane.
- speed: The speed of the vehicle in meters per second (m/s).
- angle: The angle of the vehicle in degrees.
- pos_x: The absolute X coordinate of the vehicle, dependent on the geographic projection used.
- pos_y: The absolute Y coordinate of the vehicle, also dependent on the geographic projection.

Here is an example of a question I might ask:
"What is the average speed of the vehicle with id 'car_0'?"
A good response would be: 
"The average speed of the vehicle with id 'car_0' is 0.72 m/s."

Another example of a question I might ask:
"What is the average CO2 emission of all vehicles during the complete simulation?"
A good response would be: 
"The average CO2 emission of all vehicles during the complete simulation is 0.00 g/s."

Another example of a question I might ask:
"What is the total amount of CO2 emission from a car with id 'car_0' from time 15 to time 20?"
A good response would be: 
"The total amount of CO2 emission from a car with id 'car_0' from time 15 to time 20 is 0.00 g."

Another example of a question I might ask:
"What is the total amount of electricity consumed by all vehicles during the simulation?"
A good response would be: 
"The total amount of electricity consumed by all vehicles during the simulation is 0.57 kWh."
` },
        { role: "user", content: message + data },],
    temperature: 1,
    max_tokens: 2048,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    response_format: {
      type: "text",
    },
  });

  res.json({
    message: response.choices[0].message.content,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});