import { Card } from "@mui/material";
import * as React from "react";

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
        <button onClick={this.displayNewStation}>Generate</button>

        <Card>
          <div>
            {this.state.stationDisp}
          </div>
        </Card>
      </div>
    );
  }

  displayNewStation = () => {
    const station = getRandomMtrStation();
    this.setState({
      station: station,
      stationDisp: (
        <div>
          <h2>{station.zh_name}</h2>
          <p>{station.en_name}</p>
          <div>Lines: {getLinesElem(station.lines)}</div>
        </div>
      ),
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
      <div>
        <div
          style={{
            display: "inline-block",
            width: "1em",
            height: "1em",
            backgroundColor: lineData?.color || "white",
          }}
        ></div>
        <span>{lineData?.["zh-name"] || ""}</span>
      </div>
    );
  });
  return linesElem;
}
