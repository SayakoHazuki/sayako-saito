import * as React from "react";

import QrCode from "qrcode";
import { Grid, TextField, Button, Card, Typography } from "@mui/material";

export interface IQrCodeProps {}

export interface IQrCodeState {}

export default class QrCodeGen extends React.Component<
  IQrCodeProps,
  IQrCodeState
> {
  componentDidMount(): void {
    this._handleInput("https://www.google.com");    
  }

  public render() {
    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
      const target = event.target;
      const value = target.value;

      this._handleInput(value);
    };

    return (
      <div>
        <h1>QR Code Generator</h1>
        <p>Beep!</p>
        <div
          style={{ marginLeft: "2em", marginRight: "2em", marginBottom: "1em" }}
        >
          <Grid direction="row" container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="input"
                id="text-input"
                label="Input"
                defaultValue={"https://www.google.com"}
                variant="standard"
                onChange={handleInput}
              />
            </Grid>
          </Grid>
        </div>

        <Card sx={{ marginTop: 4, marginBottom: 4 }}>
          <canvas id="qr-code"></canvas>
          <Typography variant="h2" sx={{ marginTop: 2, marginBottom: 2 }}>
            <Button variant="contained" onClick={this.saveQrCodeImage}>
              Download PNG
            </Button>
          </Typography>
        </Card>
      </div>
    );
  }

  _handleInput = (value: string) => {
    QrCode.toCanvas(
      document.getElementById("qr-code"),
      value,
      function (error) {
        if (error) console.error(error);
        console.log("success!");
      }
    );
  };

  saveQrCodeImage = () => {
    const canvas = document.getElementById("qr-code") as HTMLCanvasElement;
    const dataURL = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = "qr-code.png";
    link.href = dataURL;
    link.click();
  };
}
