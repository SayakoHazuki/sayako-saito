import { Card, Divider, FormGroup, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

import * as React from "react";

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

export interface IRandomNumberProps {}

export interface IRandomNumberStates {
  min?: number;
  max?: number;
  result?: number;
}

export default class RandomNumber extends React.Component<
  IRandomNumberProps,
  IRandomNumberStates
> {
  constructor(props: IRandomNumberProps) {
    super(props);
    this.state = {
      min: 1,
      max: 100,
      result: 0,
    };
  }

  public render() {
    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
      const target = event.target;
      const value = target.value;
      const name = target.name;
      console.log(name);
      this.setState(
        {
          [name]: Number(value),
        } as IRandomNumberStates,
        () => console.log(this.state)
      );
    };

    return (
      <div>
        <h1>Random Number Generator</h1>
        <p>Swooosh!</p>
        <div
          style={{ marginLeft: "2em", marginRight: "2em", marginBottom: "1em" }}
        >
          <Grid direction="row" container spacing={2}>
            <Grid item xs={6}>
              <TextField
                name="min"
                id="min-input"
                defaultValue={1}
                label="Min"
                variant="standard"
                onChange={handleInput}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="max"
                id="max-input"
                defaultValue={100}
                label="Max"
                variant="standard"
                onChange={handleInput}
              />
            </Grid>
          </Grid>
        </div>
        <Button variant="contained" onClick={this.spin}>
          Generate
        </Button>

        <Card sx={{ marginTop: 4, marginBottom: 4 }}>
          <Typography variant="h2" sx={{ marginTop: 2, marginBottom: 2 }}>
            {this.state.result}
          </Typography>
        </Card>
      </div>
    );
  }

  generateRandomNumber = () => {
    if (
      !(
        typeof this.state.min === "number" && typeof this.state.max === "number"
      )
    ) {
      return;
    }

    // console.log(this.state)
    if (this.state.min > this.state.max) {
      this.setState({
        result:
          Math.floor(Math.random() * (this.state.min - this.state.max + 1)) +
          this.state.max,
      });
    } else {
      this.setState({
        result:
          Math.floor(Math.random() * (this.state.max - this.state.min + 1)) +
          this.state.min,
      });
    }
  };

  spin = () => {
    /* repeatedly displaynewstation and gradually stops */
    let spins = 400;
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
      setTimeout(this.generateRandomNumber, interval * 250);
    });
  };
}
