import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ProjectLink from "../components/ProjectLink";

export interface IHomeProps {}

export interface IHomeState {
  expanded: string | false;
}

export default class Home extends React.Component<IHomeProps, IHomeState> {
  constructor(props: IHomeProps) {
    super(props);

    this.state = {
      expanded: false,
    };
  }

  public render() {
    return (
      <div>
        <h2>Sayako Saito</h2>
        <p>A collection of useful tools.</p>

        <Accordion
          expanded={this.state.expanded === "panel1"}
          onChange={this.handleChange("panel1")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography sx={{ width: "33%", flexShrink: 0 }}>Pinned</Typography>
            <Typography sx={{ color: "text.secondary" }}>
              Pinned projects
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Nulla facilisi. Phasellus sollicitudin nulla et quam mattis
              feugiat. Aliquam eget maximus est, id dignissim quam.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={this.state.expanded === "panel2"}
          onChange={this.handleChange("panel2")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2bh-content"
            id="panel2bh-header"
          >
            <Typography sx={{ width: "33%", flexShrink: 0 }}>Random</Typography>
            <Typography sx={{ color: "text.secondary" }}>
              Random generators!
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <ProjectLink
              title="Random MTR Station Generator"
              url="/random/mtr"
              imageUrl="/static/images/thumbnails/random-mtr.png"
            ></ProjectLink>
          </AccordionDetails>
        </Accordion>
        {/* <Accordion
          expanded={this.state.expanded === "panel3"}
          onChange={this.handleChange("panel3")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3bh-content"
            id="panel3bh-header"
          >
            <Typography sx={{ width: "33%", flexShrink: 0 }}>
              Advanced settings
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
              Filtering has been entirely disabled for whole web server
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer
              sit amet egestas eros, vitae egestas augue. Duis vel est augue.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={this.state.expanded === "panel4"}
          onChange={this.handleChange("panel4")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4bh-content"
            id="panel4bh-header"
          >
            <Typography sx={{ width: "33%", flexShrink: 0 }}>
              Personal data
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer
              sit amet egestas eros, vitae egestas augue. Duis vel est augue.
            </Typography>
          </AccordionDetails>
        </Accordion> */}
      </div>
    );
  }

  handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      this.setState({ expanded: isExpanded ? panel : false });
    };
}
