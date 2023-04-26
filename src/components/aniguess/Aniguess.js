import { useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import classes from "./Aniguess.module.scss"

function AniEntry({ children, className, entry }) {
  return (
    <div className={classes["entry"] + " " + className}>
      <h1 className={classes["anititle"]}>{entry.title}</h1>
      <p className={classes["anisynopsis"]}>{entry.synopsis}</p>
      {children}
    </div>
  );
}

export default function Aniguess() {
  const [entries, setEntries] = useState([])
  const [score, setScore] = useState(0)
  const [round, setRound] = useState(0)
  const [reveal, setReveal] = useState(false)
  const cachedEntries = useRef([])
  const finishedCaching = useRef(false)

  async function getRandomAniEntry() {
    console.log("OK")
    let json = {data: {}}

    while(!json.data["score"]) {
      const res = await fetch("https://api.jikan.moe/v4/random/anime")
      json = await res.json()
    }
    
    return json
  }

  useEffect(() => {
    async function fetchEntries() {
      if(cachedEntries.current.length > 0) {
        setEntries(cachedEntries.current);
      } else if(!finishedCaching.current) {
        finishedCaching.current = true;
        setEntries([await getRandomAniEntry(), await getRandomAniEntry()]);
      }
      cachedEntries.current = [await getRandomAniEntry(), await getRandomAniEntry()]
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
        }
      } else {
        if(firstScore >= secondScore) {
          setScore(score + 1);
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
          <h1>Ranking: {firstEntry.score}</h1>
        </AniEntry>
        : null}
      {secondEntry ?
        <AniEntry entry={secondEntry} className={classes["right-panel"]}>
          {reveal ?
            <h1>Ranking: {secondEntry.score}</h1>
            :
            <>
              <Button variant="primary" onClick={() => revealEntry("Higher")}>Higher</Button>
              <Button variant="primary" onClick={() => revealEntry("Lower")}>Lower</Button>
            </>
          }
        </AniEntry>
        : null}
      
      <div className={classes["statusline"]}>
        <h1>Score: {score}</h1>
      </div>
    </div>
  );
}


