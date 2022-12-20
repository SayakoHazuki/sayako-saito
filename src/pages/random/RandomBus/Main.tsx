import { Card, Tab, Tabs, Box, Typography } from "@mui/material";

import * as React from "react";
import BusLineByLoc from "./Tab_BusLineByLoc";
import BusStopByLine from "./Tab_BusStopByLine";
import BusStopByLoc from "./Tab_BusStopByLoc";

const easeIn = (t: number) => {
  return 2 * t * t;
};
const easeOut = (t: number) => {
  return 2 * t * (1 - t) + 0.5;
};

// Code for testing easeIn and easeOut
//
// const a = [];
// for (let i = 0; i < 100; i++) {
//   a.push(easeOut(i / 100));
// }
// for (let i = 0; i < 100; i++) {
//   a.push(easeIn(i / 100));
// }
// console.log(a);
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
export interface IRandomBusProps {}

export interface IRandomBusStates {
  value: number;
}

export default class RandomBus extends React.Component<
  IRandomBusProps,
  IRandomBusStates
> {
  constructor(props: IRandomBusProps) {
    super(props);
    this.state = {
      value: 0,
    };
  }

  public render() {
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      this.setState({ value: newValue });
    };
    return (
      <>
        <h1>Random Bus Generator</h1>
        <p>GLHF.</p>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={this.state.value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Bus Line (by location)" {...a11yProps(0)} />
            <Tab label="Bus Stop (by line)" {...a11yProps(1)} />
            <Tab label="Bus Stop (by location)" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={this.state.value} index={0}>
          <BusLineByLoc></BusLineByLoc>
        </TabPanel>
        <TabPanel value={this.state.value} index={1}>
          <BusStopByLine></BusStopByLine>
        </TabPanel>
        <TabPanel value={this.state.value} index={2}>
          <BusStopByLoc></BusStopByLoc>
        </TabPanel>
      </>
    );
  }
}
