import React, { useState, Fragment } from "react";
import Button from "@material-ui/core/Button";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const Autor = () => {
  const [drawer, setDrawer] = useState(false);

  return (
    <Fragment>
          <Button onClick={() => setDrawer(!drawer)}>created by Wokayme</Button>
          <a href="https://github.com/wokayme"></a>
          <Drawer open={drawer} onClose={() => setDrawer(false)}>
            <div  style={{width: "300px"}}>
            <List>
              <ListItem component="a">
                <ListItemText
                  style={{
                    color: `#5e005b`,
                  }}
                  primary="Reason of this project"
                  secondary="My problem was that I used the same the same hashtags on instagram over and over and because I am laizy I decided to create this genereator."
                />
              </ListItem>
            </List>
            <Divider />
            <List>
              <ListItem
                component="a"
                href="https://github.com/wokayme/random_elements_from_list"
              >
                <ListItemText
                  style={{
                    color: `rgb(138, 35, 135)`,
                  }}
                  primary="Give me star on Github"
                />
              </ListItem>
            </List>
            </div>
          </Drawer>
    </Fragment>
  );
};

export default Autor;
