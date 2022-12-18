import { Card, Divider, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import * as React from "react";

import "./RandomMTR.css";
import "../../fonts/myriad.css";

import mtrLines from "../../data/mtr-lines.json";

import mtrStations from "../../data/mtr-stations.json";

interface MtrStation {
  zh_name: string;
  en_name: string;
  lines: string[];
}

export interface IRandomMTRProps {}

export interface IRandomMTRStates {
  station: MtrStation;
  stationDisp: JSX.Element;
}

export default class RandomMTR extends React.Component<
  IRandomMTRProps,
  IRandomMTRStates
> {
  constructor(props: IRandomMTRProps) {
    super(props);
    this.state = {
      station: { zh_name: "", en_name: "", lines: [] },
      stationDisp: <div></div>,
    };
  }

  public render() {
    return (
      <div>
        <h1>Random MTR Station Generator</h1>
        <p>Currently betaaaaaaa :D</p>
        <button onClick={this.spin}>Generate</button>

        <Card>
          <div>{this.state.stationDisp}</div>
        </Card>
      </div>
    );
  }

  displayNewStation = () => {
    const station = getRandomMtrStation();
    this.setState({
      station: station,
      stationDisp: (
        <Grid direction="column" container>
          <Grid className="sb" item sx={{ marginTop: 2, marginBottom: 1 }}>
            <Typography variant="h3" className="mtr-sung">
              {station.zh_name}
            </Typography>
            <Typography variant="h4" className="mtr-eng">
              {station.en_name}
            </Typography>
          </Grid>
          <Divider></Divider>
          <Grid
            item
            sx={{ marginTop: 1, marginBottom: 1 }}
            direction="column"
            container
          >
            <Grid
              direction="row"
              container
              spacing={1}
              sx={{ paddingLeft: 1, paddingRight: 1, justifyContent: "center" }}
            >
              {getLinesElem(station.lines)}
            </Grid>
          </Grid>
        </Grid>
      ),
    });
  };

  spin = () => {
    /* repeatedly displaynewstation and gradually stops */
    let spins = 250;
    let easeInIntervals = [];
    for (let i = 0; i < spins / 2; i++) {
      easeInIntervals.push(easeIn(i / (spins / 2)));
    }
    let easeOutIntervals = [];
    for (let i = 0; i < spins / 2; i++) {
      easeOutIntervals.push(easeOut(0.5 + i / (spins / 2)));
    }
    let intervals = easeInIntervals.concat(easeOutIntervals);
    console.log(intervals);

    intervals.forEach((interval, i) => {
      setTimeout(this.displayNewStation, interval * 125);
    });
  };
}

function getRandomMtrStation() {
  // mtr-stations.json is a file containing all the MTR stations in Hong Kong.
  // format is {"zh-name":string, "en-name":string, "lines": string[]}[]

  const randomIndex = Math.floor(Math.random() * mtrStations.length);
  const randomStation = mtrStations[randomIndex];
  return {
    zh_name: randomStation["zh-name"],
    en_name: randomStation["en-name"],
    lines: randomStation.lines,
  };
}

function getLinesElem(lines: string[]) {
  // mtr-lines is of format: {"zh-name":string, "en-name":string, "color":string}[]
  // return element containing: a div of color, next to it the zh-name.

  const linesElem = lines.map((line) => {
    const lineData = mtrLines.find((l) => l["zh-name"] === line);
    return (
      <Grid item>
        <Paper
          sx={{
            backgroundColor: lineData?.color || "white",
            padding: 0.5,
            paddingTop: 1.2,
            color: "white",
            minWidth: "12ex",
          }}
        >
          <Typography className="mtr-sung" variant="h6" sx={{ lineHeight: 1 }}>
            {lineData?.["zh-name"] || ""}
          </Typography>
          <Typography className="mtr-eng" variant="subtitle2">
            {lineData?.["en-name"] || ""}
          </Typography>
        </Paper>
        {/* <div
          style={{
            display: "inline-block",
            width: "1em",
            height: "1em",
            backgroundColor: lineData?.color || "white",
          }}
        ></div>
        <span>{lineData?.["zh-name"] || ""}</span> */}
      </Grid>
    );
  });
  return linesElem;
}

const easeIn = (t: number) => {
  return 2 * t * t;
};
const easeOut = (t: number) => {
  return 2 * t * (1 - t) + 0.5;
};

const a = [];
for (let i = 0; i < 100; i++) {
  a.push(easeOut(i / 100));
}
for (let i = 0; i < 100; i++) {
  a.push(easeIn(i / 100));
}
console.log(a);
