import * as React from "react";
import { Card, Divider, Grid, Typography } from "@mui/material";
import busStops from "../../../data/bus-stops.json";

const busStopsList = busStops.data as BusStopData[];

interface BusLineStop {
  line: string;
  destination: string;
  eta: string;
  stop: string;
}

interface BusStopData {
  stop: string;
  lat: string;
  long: string;
  name_en: string;
  name_tc: string;
  name_sc: string;
}

// {"co":"KMB","route":"13X","dir":"O","service_type":1,"seq":8,"dest_tc":"尖沙咀東","dest_sc":"尖沙咀东","dest_en":"TSIM SHA TSUI EAST","eta_seq":1,"eta":null,"rmk_tc":"最後班次已過","rmk_sc":"最后班次已过","rmk_en":"The final bus has departed from this stop","data_timestamp":"2022-12-20T23:48:37+08:00"}
interface BusStopETAData {
  co: string;
  route: string;
  dir: string;
  service_type: number;
  seq: number;
  dest_tc: string;
  dest_sc: string;
  dest_en: string;
  eta_seq: number;
  eta: string;
  rmk_tc: string;
  rmk_sc: string;
  rmk_en: string;
  data_timestamp: string;
}

export interface IBusLineByLocProps {}

export interface IBusLineByLocState {
  lat: number;
  long: number;
  result: BusLineStop;
  stopList: BusStopData[];
}

export default class BusLineByLoc extends React.Component<
  IBusLineByLocProps,
  IBusLineByLocState
> {
  constructor(props: IBusLineByLocProps) {
    super(props);

    this.state = {
      lat: 0,
      long: 0,
      result: {
        line: "",
        destination: "",
        eta: "",
        stop: "",
      },
      stopList: [],
    };
  }

  public componentDidMount() {
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
          return distance < 0.015;
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
        .slice(0, 10);

      const pickedStop = stopList[Math.floor(Math.random() * stopList.length)];

      // get bus line info at stop
      const stopId = pickedStop.stop;
      const url = `https://data.etabus.gov.hk/v1/transport/kmb/stop-eta/${stopId}`;
      const handleResponseData = ({ data }: { data: any }) => {
        data = (data as BusStopETAData[]).filter((i) => i.eta !== null);
        data = data.map((i: BusStopETAData) => {
          /* i.eta : 2022-12-21T00:05:39+08:00 */
          /* replace eta with seconds from now */
          const eta = new Date(i.eta);
          const now = new Date();
          const seconds = Math.floor((eta.getTime() - now.getTime()) / 1000);
          i.eta = seconds.toString();
          return i;
        });
        data = data.filter(
          (i: BusStopETAData) =>
            parseInt(i.eta) > 0 && parseInt(i.eta) < 60 * 15
        );
        const pickedLine = data[Math.floor(Math.random() * data.length)];
        this.setState({
          result: {
            line: pickedLine.route,
            destination: pickedLine.dest_tc,
            eta: Math.ceil(parseInt(pickedLine.eta) / 60).toString(),
            stop: pickedStop.name_tc,
          } as BusLineStop,
        });
      };
      fetch(url)
        .then((response) => response.json())
        .then(handleResponseData);

      this.setState({
        lat: position.coords.latitude,
        long: position.coords.longitude,
        stopList: stopList,
      });
    };

    // get user location

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(savePosition);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }

  public render() {
    return (
      <div>
        <p>Latitude: {this.state.lat}</p>
        <p>Longitude: {this.state.long}</p>
        <Card sx={{ marginTop: 2, marginBottom: 2 }}>
          <Grid direction="column" container>
            <Grid
              direction="row"
              container
              className="sb"
              item
              sx={{ marginTop: 2, marginBottom: 1, justifyContent: "center" }}
            >
              <Typography variant="h4">
                {this.state.result.line}&nbsp;
              </Typography>
              <Typography variant="h4">
                {this.state.result.destination}
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
                sx={{
                  paddingLeft: 1,
                  paddingRight: 1,
                  justifyContent: "center",
                }}
              >
                <Grid item>
                  <Typography variant="h5">{this.state.result.stop}</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h5">{this.state.result.eta}</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Card>
        <p>Line: {this.state.result.line}</p>
        <p>Destination: {this.state.result.destination}</p>
        <p>ETA: {this.state.result.eta}</p>
        <p>Stop: {this.state.result.stop}</p>
      </div>
    );
  }
}
