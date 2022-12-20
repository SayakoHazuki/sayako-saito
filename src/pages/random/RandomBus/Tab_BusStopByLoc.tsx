import * as React from "react";
import { Button, Card, Divider, Grid, Typography } from "@mui/material";
import busStops from "../../../data/bus-stops.json";

const busStopsList = busStops.data as BusStopData[];

interface BusStopData {
  stop: string;
  lat: string;
  long: string;
  name_en: string;
  name_tc: string;
  name_sc: string;
}

export interface IBusStopByLocProps {}

export interface IBusStopByLocState {
  lat: number;
  long: number;
  result: BusStopData;
  stopList: BusStopData[];
  nearestStop: BusStopData;
}

export default class BusStopByLoc extends React.Component<
  IBusStopByLocProps,
  IBusStopByLocState
> {
  constructor(props: IBusStopByLocProps) {
    super(props);

    this.state = {
      lat: 0,
      long: 0,
      result: {
        stop: "",
        lat: "",
        long: "",
        name_en: "",
        name_tc: "",
        name_sc: "",
      },
      stopList: [],
      nearestStop: {
        stop: "",
        lat: "",
        long: "",
        name_en: "",
        name_tc: "",
        name_sc: "",
      },
    };
  }

  generateResult = (maxRetries: number) => {
    const savePosition = (position: any) => {
      console.log(position.coords.latitude);
      console.log(position.coords.longitude);

      // filter bus stop list by distance
      const stopList = busStopsList
        .filter((stop) => {
          const lat = parseFloat(stop.lat);
          const long = parseFloat(stop.long);
          const distance = Math.sqrt(
            Math.pow(lat - position.coords.latitude, 2) +
              Math.pow(long - position.coords.longitude, 2)
          );
          return distance < 0.025;
        })
        .sort((a, b) => {
          const latA = parseFloat(a.lat);
          const longA = parseFloat(a.long);
          const latB = parseFloat(b.lat);
          const longB = parseFloat(b.long);
          const distanceA = Math.sqrt(
            Math.pow(latA - position.coords.latitude, 2) +
              Math.pow(longA - position.coords.longitude, 2)
          );
          const distanceB = Math.sqrt(
            Math.pow(latB - position.coords.latitude, 2) +
              Math.pow(longB - position.coords.longitude, 2)
          );
          return distanceA - distanceB;
        })
        .slice(0, 25);

      const pickedStop = stopList[Math.floor(Math.random() * stopList.length)];
      if (!pickedStop) {
        if (maxRetries > 0) {
          return this.generateResult(maxRetries - 1);
        } else {
          this.setState({
            result: {
              stop: "",
              lat: "",
              long: "",
              name_en: "No bus stop found",
              name_tc: "未找到巴士站",
              name_sc: "未找到巴士站",
            },
          });
        }
      }
      this.setState({
        lat: position.coords.latitude,
        long: position.coords.longitude,
        result: pickedStop,
        stopList: stopList,
        nearestStop: stopList[0],
      });
    };

    // get user location

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(savePosition);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  public render() {
    return (
      <div>
        <Button variant="contained" onClick={() => this.generateResult(4)}>
          Generate
        </Button>
        <div style={{ marginTop: "1.5em", marginBottom: "0.75em" }}>
          最接近之巴士站: {this.state.nearestStop.name_tc}
        </div>
        <Card sx={{ marginTop: 2, marginBottom: 2 }}>
          <Grid
            direction="column"
            container
            className="sb"
            sx={{ marginTop: 2, marginBottom: 1, justifyContent: "center" }}
          >
            <Grid item>
              <Typography variant="h5">{this.state.result.name_tc}</Typography>
            </Grid>
            <Grid item>
              <Typography variant="h6">{this.state.result.name_en}</Typography>
            </Grid>
          </Grid>
        </Card>
      </div>
    );
  }
}
