import { useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import CountUp from "react-countup";
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
              src={trailerEmbedUrl}>
            </iframe> 
          :
            null
        }
      </div>
      {children}
    </div>
  );
}

export default function Aniguess({score, setScore, gameOver}) {
  const [entries, setEntries] = useState([])
  const [reveal, setReveal] = useState(false)
  const [round, setRound] = useState(0)
  const cachedEntries = useRef([])
  const finishedCaching = useRef(false)

  async function getRandomAniEntry() {
    let json = {data: {}}

    while(!json.data["score"]) {
      const res = await fetch("https://api.jikan.moe/v4/random/anime")
      json = await res.json()
    }
    
    return json
  }

  useEffect(() => {
    async function fetchEntries() {
      if(cachedEntries.current.length === 0 && !finishedCaching.current) {
        finishedCaching.current = true;
        cachedEntries.current = [await getRandomAniEntry(), await getRandomAniEntry()]
      }
      setEntries(cachedEntries.current);
      cachedEntries.current = [cachedEntries.current[1], await getRandomAniEntry()]
    }
    fetchEntries()
  }, [round]);

  function revealEntry(answer) {
    const firstEntry = entries[0]?.data
    const secondEntry = entries[1]?.data

    if(!firstEntry || !secondEntry) return;
    if(!firstEntry["score"] || !secondEntry["score"]) return;

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

  const firstEntry = entries[0]?.data
  const secondEntry = entries[1]?.data

  return (
    <div className={classes["aniguess"]}>
      {firstEntry ?
        <AniEntry entry={firstEntry} className={classes["left-panel"]}>
          <div className={classes["anicontent"]}>
            <div className={classes["anirating"]}>
              <h1>Ranking: {firstEntry.score}</h1>
            </div>
          </div>
        </AniEntry>
        : null}
      {secondEntry ?
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
        : null}
    </div>
  );
}


