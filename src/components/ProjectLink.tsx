import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import { Link } from "react-router-dom";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

export interface IProjectLinkProps {
    url: string,
    imageUrl: string,
    title: string,
}

export interface IProjectLinkState {}

export default class ProjectLink extends React.Component<
  IProjectLinkProps,
  IProjectLinkState
> {
  constructor(props: IProjectLinkProps) {
    super(props);

    this.state = {};
  }

  public render() {
    return (
      <Link to={this.props.url} style={{ textDecoration: "none" }}>
        <Paper
          sx={{
            p: 2,
            margin: "auto",
            maxWidth: 500,
            flexGrow: 1,
            backgroundColor: (theme) =>
              theme.palette.mode === "dark" ? "#1A2027" : "#fff",
          }}
        >
          <Grid container direction="row" spacing={2}>
            <Grid item xs={3}>
              <Img
                alt={this.props.title}
                src={this.props.imageUrl}
              />
            </Grid>
            <Grid item xs={9} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Typography gutterBottom variant="subtitle1" component="div">
                    {this.props.title}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Link>
    );
  }
}
