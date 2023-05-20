import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import CountUp from "react-countup";
import { RotatingTriangles } from "react-loader-spinner";
import classes from "./Aniguess.module.scss"

function AniEntry({ children, className, entry }) {
  const backgroundImage = entry.images.jpg.large_image_url;
  const trailerEmbedUrl = entry.trailer.embed_url;

  return (
    <div className={classes["entry"] + " " + className} style={{background: `linear-gradient(rgba(0, 0, 0, 0.60), rgba(0, 0, 0, 0.60)), url(${backgroundImage}) no-repeat`}}>
      <div className={classes["anititle"]}>
        <h1>{entry.title}</h1>
      </div>
      <div className={classes["anisynopsis"]}>
        <p>{entry.synopsis}</p>
      </div>
      <div className={classes["anitrailer"]}>
        {
          trailerEmbedUrl ? 
            <iframe
              title="trailer"
              src={trailerEmbedUrl.substr(0, trailerEmbedUrl.length - 1) + "0"}>
            </iframe> 
          :
            null
        }
      </div>
      {children}
    </div>
  );
}

export default function Aniguess({score, setScore, gameOver, searchOptions}) {
  const [reveal, setReveal] = useState(false)
  const [round, setRound] = useState(0)
  const [entries, setEntries] = useState([])
  const cachedEntries = useRef([])
  const finishedInit = useRef(false)
  const lastVisiblePage = useRef(-1)

  function timeout(delay) {
    return new Promise(res => setTimeout(res, delay));
  }

  const getLastVisiblePage = useCallback(async () => {
    searchOptions["page"] = 1;
    const res = await fetch("https://api.jikan.moe/v4/anime?" + new URLSearchParams(searchOptions));
    const json = await res.json();
    return json.pagination.last_visible_page;
  }, [searchOptions])

  const getRandomAniEntry = useCallback(async () => {
    searchOptions["page"] = 1 + Math.floor(lastVisiblePage.current * Math.random());
    const res = await fetch("https://api.jikan.moe/v4/anime?" + new URLSearchParams(searchOptions));
    const json = await res.json();
    const itemCount = json.pagination.items.count;
    const entry = json.data[Math.floor(itemCount * Math.random())];
    return entry;
  }, [searchOptions])

  useEffect(() => {
    async function fetchEntries() {
      if(round === 0) return;
      setEntries(cachedEntries.current);
      cachedEntries.current = [cachedEntries.current[1], await getRandomAniEntry()]
    }
    fetchEntries()
  }, [round, getRandomAniEntry]);

  useEffect(() => {
    async function init() {
      if(finishedInit.current) return;
      finishedInit.current = true;
      lastVisiblePage.current = await getLastVisiblePage();
      cachedEntries.current = [await getRandomAniEntry(), await getRandomAniEntry()]
      setEntries(cachedEntries.current);
      await timeout(1000)
      cachedEntries.current = [cachedEntries.current[1], await getRandomAniEntry()]
    }
    init()
  }, [getLastVisiblePage, getRandomAniEntry]);

  function revealEntry(answer) {
    const firstEntry = entries[0]
    const secondEntry = entries[1]

    if(!(firstEntry && secondEntry)) return;

    setReveal(true)

    setTimeout(() => {
      setReveal(false)
      const firstScore = parseFloat(firstEntry["score"])
      const secondScore = parseFloat(secondEntry["score"])
      if(answer === "Higher") {
        if(firstScore <= secondScore) {
          setScore(score + 1);
        } else {
          gameOver();
        }
      } else {
        if(firstScore >= secondScore) {
          setScore(score + 1);
        } else {
          gameOver();
        }
      }
      return setRound(round + 1)
    }, 2000);
  }

  const firstEntry = entries[0]
  const secondEntry = entries[1]

  return (
    (firstEntry && secondEntry)
    ?
    <div className={classes["aniguess"]}>
      <AniEntry entry={firstEntry} className={classes["left-panel"]}>
        <div className={classes["anicontent"]}>
          <div className={classes["anirating"]}>
            <h1>Ranking: {firstEntry.score}</h1>
          </div>
        </div>
      </AniEntry>
      <AniEntry entry={secondEntry} className={classes["right-panel"]}>
        <div className={classes["anicontent"]}>
          {reveal ?
            <div className={classes["anirating"]}>
              <h1>Ranking: {<CountUp start={0} end={secondEntry.score} decimals={2} duration={1.5}/>}</h1>
            </div>
            :
            <div className={classes["aniguess"]}>
              <Button variant="primary" onClick={() => revealEntry("Higher")}>Higher</Button>
              <Button variant="primary" onClick={() => revealEntry("Lower")}>Lower</Button>
            </div>
          }
        </div>
      </AniEntry>
    </div>
    : 
    <div style={{"display": "grid", "placeItems": "center", "height": "100%"}}>
      <RotatingTriangles
        visible={true}
        height="10%"
        width="auto"
        style={{"position": "fixed"}}
        ariaLabel="rotating-triangels-loading"
        wrapperStyle={{"position": "fixed"}}
        wrapperClass="rotating-triangels-wrapper"
      />
    </div>
  );
}


