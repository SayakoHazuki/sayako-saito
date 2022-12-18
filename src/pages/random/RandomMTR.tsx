import {
  Card,
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

import * as React from "react";

import "./RandomMTR.css";
import "../../fonts/myriad.css";

import mtrLines from "../../data/mtr-lines.json";

import mtrStations from "../../data/mtr-stations.json";

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

const defaultFilters = {
  noAEL: {
    description: "排除只能透過機場快線抵達的地鐵站",
    description2: "(機場、博覽館)",
    apply: (s: MtrStation) => !["機場", "博覽館"].includes(s.zh_name),
  },
  noPort: {
    description: "排除設置於口岸的地鐵站",
    description2: "(羅湖、落馬洲)",
    apply: (s: MtrStation) => !["羅湖", "落馬洲"].includes(s.zh_name),
  },
  noNear: {
    description: "排除接近學校的地鐵站",
    description2: "(火炭、沙田、第一城)",
    apply: (s: MtrStation) => !["火炭", "沙田", "第一城"].includes(s.zh_name),
  },
  noShatinDist: {
    description: "排除沙田市中心附近的地鐵站",
    description2: "(沙田、顯徑、大圍、車公廟、沙田圍、第一城、石門、火炭)",
    apply: (s: MtrStation) =>
      ![
        "沙田",
        "顯徑",
        "大圍",
        "車公廟",
        "沙田圍",
        "第一城",
        "石門",
        "火炭",
      ].includes(s.zh_name),
  },
  noThemePark: {
    description: "排除為主題樂園而設的地鐵站",
    description2: "(海洋公園、迪士尼)",
    apply: (s: MtrStation) => !["海洋公園", "迪士尼"].includes(s.zh_name),
  },
  noRacecourse: {
    description: "排除馬場站",
    description2: "",
    apply: (s: MtrStation) => !["馬場"].includes(s.zh_name),
  },
};

interface MtrStation {
  zh_name: string;
  en_name: string;
  lines: string[];
}

export interface IRandomMTRProps {}

export interface IRandomMTRStates {
  station: MtrStation;
  stationDisp: JSX.Element;
  filteredStations: MtrStation[];
  enabledFilters: string[];
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
      filteredStations: mtrStations,
      enabledFilters: [
        "noAEL",
        "noPort",
        "noNear",
        "noShatinDist",
        "noThemePark",
        "noRacecourse",
      ],
    };
  }

  componentDidMount(): void {
    this.saveFilteredStations();
  }

  public render() {
    const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const filterName = event.target.name;
      const checked = event.target.checked;
      console.log(filterName, checked);
      const callback = () => {
        console.log(this.state.enabledFilters);
        this.saveFilteredStations();
      };
      if (checked) {
        this.setState(
          {
            enabledFilters: [...this.state.enabledFilters, filterName],
          },
          callback
        );
      } else {
        this.setState(
          {
            enabledFilters: this.state.enabledFilters.filter(
              (f) => f !== filterName
            ),
          },
          callback
        );
      }
    };

    return (
      <div>
        <h1>Random MTR Station Generator</h1>
        <p>Have a nice day! :D</p>
        <Button variant="contained" onClick={this.spin}>
          Generate
        </Button>
        {/* <button onClick={this.spin}>Generate</button> */}

        <Card sx={{ marginTop: 2, marginBottom: 2 }}>
          <div>{this.state.stationDisp}</div>
        </Card>

        <Divider></Divider>
        <h2>Options</h2>
        <h3>Filters</h3>

        <FormGroup>
          {Object.keys(defaultFilters).map((key) => {
            return (
              // <div>
              //   <input type="checkbox" id={key} name={key} value={key} />
              //   <label htmlFor={key}>
              //     <Typography variant="body1">
              //       {
              //         defaultFilters[key as keyof typeof defaultFilters]
              //           ?.description
              //       }
              //     </Typography>
              //     <Typography variant="body2">
              //       {
              //         defaultFilters[key as keyof typeof defaultFilters]
              //           ?.description2
              //       }
              //     </Typography>
              //   </label>
              // </div>
              <FormControlLabel
                sx={{ marginBottom: 0.75 }}
                control={
                  <Checkbox
                    defaultChecked
                    name={key}
                    color="primary"
                    onChange={handleFilterChange}
                  />
                }
                label={
                  <div style={{ textAlign: "left" }}>
                    <Typography variant="body1">
                      {
                        defaultFilters[key as keyof typeof defaultFilters]
                          ?.description
                      }
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#808080" }}>
                      {
                        defaultFilters[key as keyof typeof defaultFilters]
                          ?.description2
                      }
                    </Typography>
                  </div>
                }
              />
            );
          })}
        </FormGroup>
      </div>
    );
  }

  displayNewStation = () => {
    const station = getRandomMtrStation(this.state.filteredStations);
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
    // console.log(intervals);

    intervals.forEach((interval, i) => {
      setTimeout(this.displayNewStation, interval * 125);
    });
  };

  saveFilteredStations = () => {
    const enabledFilters = Object.keys(defaultFilters)
      .filter((f) => {
        return this.state.enabledFilters.includes(f);
      })
      .map((f) => {
        return defaultFilters[f as keyof typeof defaultFilters];
      });

    const filteredStations = mtrStations.filter((s) => {
      // filter using the apply() function in enabledFilters (array of filters)
      return enabledFilters.every((f) => f.apply(s));
    });
    console.log(
      enabledFilters.map((f) => f.description),
      filteredStations.length
    );
    this.setState({ filteredStations: filteredStations });
  };
}

function getRandomMtrStation(stations_set: MtrStation[] = mtrStations) {
  // mtr-stations.json is a file containing all the MTR stations in Hong Kong.
  // format is {"zh-name":string, "en-name":string, "lines": string[]}[]

  const randomIndex = Math.floor(Math.random() * stations_set.length);
  const randomStation = stations_set[randomIndex];
  // console.log(stations_set.length);
  return randomStation;
}

function getLinesElem(lines: string[]) {
  // mtr-lines is of format: {"zh-name":string, "en-name":string, "color":string}[]
  // return element containing: a div of color, next to it the zh-name.

  const linesElem = lines.map((line) => {
    const lineData = mtrLines.find((l) => l.zh_name === line);
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
            {lineData?.zh_name || ""}
          </Typography>
          <Typography className="mtr-eng" variant="subtitle2">
            {lineData?.en_name || ""}
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
        <span>{lineData?..zh_name || ""}</span> */}
      </Grid>
    );
  });
  return linesElem;
}
