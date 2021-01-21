import React, { useState } from "react";
import { createUseStyles } from "react-jss";
import Loading from "../Loading";

const useStyles = createUseStyles({
  carousel: {
    display: "grid",
    gridAutoFlow: "column",
    gridTemplateColumns: "10% 80% 10%",
    gridTemplateRows: "100vh",
    justifyItems: "center",
    transformStyle: "preserve-3d",
    alignItems: "center"
  },
  navButton: {
    display: "grid",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyItems: "center",
    '&:hover': {
      backgroundColor: "#DCDDDD"
    }
  },
  arrowLeft: {
    borderBottom: "20px solid transparent",
    borderTop: "20px solid transparent",
    borderRight: "20px solid #2f2f2f",
    fontSize: "0",
    lineHeight: 0
  },
  arrowRight: {
    borderBottom: "20px solid transparent",
    borderTop: "20px solid transparent",
    borderLeft: "20px solid #2f2f2f",
    fontSize: "0",
    lineHeight: 0
  },
  slide: {
    border: "1px solid grey",
    borderRadius: "5px",
    width: "75%",
    height: "75%",
    textAlign: "center"
  },
  slideIn: { position: "relative", animation: "$animateleft 0.4s" },
  "@keyframes animateleft": {
    from: { left: "-300px", opacity: 0 },
    to: { left: "0", opacity: 1 }
  },
  slideOut: { position: "relative", animation: "$animateright 0.4s" },
  "@keyframes animateright": {
    from: { right: "-300px", opacity: 0 },
    to: { right: "0", opacity: 1 }
  }
});

export default (props) => {
  const classes = useStyles();
  const { items, ItemTemplate, isLoading } = props
  const [slideIndex, setSlideIndex] = useState(0);
  const [oldIndex, setOldIndex] = useState(0);

  function changeCounter(increase) {
    setOldIndex(slideIndex)
    if (increase === true) {
      setSlideIndex((slideIndex + 1) % items.length)
    }
    else {
      setSlideIndex((slideIndex - 1) >= 0 ? slideIndex - 1 : items.length - 1)
    }
  }

  return (
    <div className={classes.carousel}>
      <div
        className={classes.navButton}
        onClick={() => changeCounter(false)}
      >
        <i className={classes.arrowLeft}></i>
      </div>
      {isLoading === true ? <Loading /> : <ItemTemplate classes={`${oldIndex <= slideIndex ? classes.slideIn : classes.slideOut} ${classes.slide}`}
        item={items[slideIndex]} key={slideIndex} index={slideIndex} />}
      <div
        className={classes.navButton}
        onClick={() => changeCounter(true)}
      >
        <i className={classes.arrowRight}></i>
      </div>
    </div>
  );
};


